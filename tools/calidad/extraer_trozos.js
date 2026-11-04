// Herramienta de calidad (v1.1.7): parte una función larga en trozos con nombre comprobando con eslint-scope qué variables
// usa cada trozo (parámetros) y cuáles deja para después (las devuelve); no toca trozos con return, this, await o que
// cambien variables de fuera. Uso (en la nube, donde están acorn y eslint-scope): node extraer_trozos.js archivo.js FUNCION[@línea] [55]
// Extract runs of top-level statements of a long function into sibling helper functions (scope-checked).
// usage: node extract.js file.js FUNCNAME[@line] [maxLines=55] [--dry]
const fs = require('fs');
const NM = process.env.NODE_TOOLS || '/opt/node-tools/node_modules/'; // acorn, eslint-scope, estraverse
const acorn = require(NM + 'acorn'), escope = require(NM + 'eslint-scope'), estraverse = require(NM + 'estraverse');
const [file, target, maxArg, dryArg] = process.argv.slice(2);
const MAXL = +maxArg || 55, DRY = process.argv.includes('--dry');
const [tname, tline] = target.split('@');
function parse(src) {
  const ast = acorn.parse(src, { ecmaVersion: 2022, sourceType: 'module', locations: true, ranges: true });
  return { ast, sm: escope.analyze(ast, { ecmaVersion: 2022, sourceType: 'module' }) };
}
function findFn(ast) {
  let hit = null;
  estraverse.traverse(ast, { enter(node, parent) {
    let fn = null, name = null, stmt = null, holder = null;
    if (node.type === 'FunctionDeclaration' && node.id) { fn = node; name = node.id.name; stmt = node; holder = parent; }
    else if (node.type === 'VariableDeclaration' && node.declarations.length === 1) { const d = node.declarations[0]; if (d.init && /ArrowFunctionExpression|FunctionExpression/.test(d.init.type) && d.id.type === 'Identifier' && d.init.body.type === 'BlockStatement') { fn = d.init; name = d.id.name; stmt = node; holder = parent; } }
    if (!fn || name !== tname) return;
    if (tline && fn.loc.start.line !== +tline) return;
    if (!holder || !(holder.type === 'Program' || holder.type === 'BlockStatement')) return;
    hit = { fn, stmt, holder }; this.break();
  } });
  return hit;
}
let src = fs.readFileSync(file, 'utf8');
let made = 0;
for (let round = 0; round < 40; round++) {
  const { ast, sm } = parse(src);
  const H = findFn(ast);
  if (!H) { console.log('function not found', target); process.exit(1); }
  const { fn, stmt } = H;
  const fsc = sm.acquire(fn);
  const body = fn.body.body;
  const L = (n) => n.loc.end.line - n.loc.start.line + 1;
  const total = fn.loc.end.line - fn.loc.start.line + 1;
  if (total <= MAXL + 5) { console.log(tname, 'now', total, 'lines'); break; }
  // all references in the whole function, with the variable and whether they write
  const refs = [];
  const visit = (sc) => { for (const r of sc.references) if (r.resolved && r.resolved.scope === fsc) refs.push(r); sc.childScopes.forEach(visit); };
  visit(fsc);
  const check = (i0, i1) => {
    const a = body[i0].range[0], b = body[i1].range[1];
    // forbidden: return/this/arguments/yield/await of the parent inside the chunk
    let bad = null;
    for (let k = i0; k <= i1; k++) estraverse.traverse(body[k], { enter(n) {
      if (/^(FunctionDeclaration|FunctionExpression)$/.test(n.type)) return this.skip();
      if (n.type === 'ArrowFunctionExpression') { estraverse.traverse(n.body, { enter(m) { if (/^(FunctionDeclaration|FunctionExpression)$/.test(m.type)) return this.skip(); if (m.type === 'ThisExpression') bad = 'this'; } }); return this.skip(); }
      if (n.type === 'ReturnStatement') bad = 'return'; if (n.type === 'ThisExpression') bad = 'this'; if (n.type === 'Identifier' && n.name === 'arguments') bad = 'arguments';
      if (n.type === 'YieldExpression' || n.type === 'AwaitExpression') bad = 'await';
      if ((n.type === 'BreakStatement' || n.type === 'ContinueStatement') && n.label) bad = 'label';
    } });
    if (bad) return { bad };
    const params = new Set(), outs = new Map(); let why = null;
    for (const r of refs) {
      const p = r.identifier.range[0]; if (p < a || p >= b) continue;
      const v = r.resolved, def = v.defs[0], dpos = def ? def.name.range[0] : -1, inside = dpos >= a && dpos < b;
      if (inside) continue;
      if (r.isWrite()) { why = 'writes ' + v.name; break; }
      if (dpos >= b) { why = 'declared after: ' + v.name; break; }
      if (v.references.some((q) => q.isWrite() && !q.init)) { why = 'param reassigned somewhere: ' + v.name; break; }
      params.add(v.name);
    }
    if (why) return { bad: why };
    // variables declared inside, used after (or before: hoisted functions)
    for (const v of fsc.variables) {
      const def = v.defs[0]; if (!def) continue; const dpos = def.name.range[0]; if (dpos < a || dpos >= b) continue;
      if (def.type === 'Parameter') continue;
      const after = v.references.filter((r) => r.identifier.range[0] >= b || r.identifier.range[0] < a);
      if (!after.length) continue;
      if (after.some((r) => r.identifier.range[0] < a)) return { bad: 'used before: ' + v.name };
      if (after.some((r) => r.isWrite())) return { bad: 'written after: ' + v.name };
      if (v.references.some((q) => q.isWrite() && !q.init && q.from.variableScope !== fsc)) return { bad: 'written by a closure: ' + v.name };
      if (def.type !== 'FunctionName' && v.references.some((q) => q.isWrite() && !q.init) && after.length) {
        // a let changed inside the chunk and read after: fine only if every change is in the chunk's own code (not in a closure: checked above)
      }
      const kind = def.type === 'FunctionName' ? 'function' : def.parent && def.parent.kind;
      outs.set(v.name, kind);
    }
    // only declarations at the chunk's top level can be returned (a block-scoped one inside an if would not exist there)
    for (const [n] of outs) { const v = fsc.variables.find((x) => x.name === n); const dp = v.defs[0].parent || v.defs[0].node; if (!body.slice(i0, i1 + 1).some((s) => s === dp || s === v.defs[0].node)) return { bad: 'nested decl ' + n }; }
    return { params: [...params], outs };
  };
  // pick the next chunk: greedy from the end of the function, as long as possible under MAXL, the largest that passes
  let best = null;
  for (let i0 = 0; i0 < body.length && !best; i0++) {
    for (let i1 = body.length - 1; i1 >= i0; i1--) {
      const lines = body[i1].loc.end.line - body[i0].loc.start.line + 1;
      if (lines > MAXL || lines < 12) continue;
      if (i0 === 0 && i1 === body.length - 1) continue;
      if (src.slice(body[i0].range[0], body[i1].range[1]).includes(tname + 'Part')) continue; // no chains of parts
      const c = check(i0, i1);
      if (c.bad) continue;
      if (c.params.length > 8 || c.outs.size > 6) continue;
      best = { i0, i1, ...c, lines }; break;
    }
  }
  if (!best) {
    // loop mode: the biggest loop (for / for-of / for-in / while / x.forEach(cb)) whose body is long: its body becomes a helper
    const loopBodyOf = (st) => {
      if (/^(ForStatement|ForOfStatement|ForInStatement|WhileStatement)$/.test(st.type) && st.body.type === 'BlockStatement') return { loop: st, blk: st.body, kind: 'loop' };
      if (st.type === 'ExpressionStatement' && st.expression.type === 'CallExpression' && st.expression.callee.type === 'MemberExpression' && st.expression.callee.property.name === 'forEach') {
        const cb = st.expression.arguments[0];
        if (cb && /ArrowFunctionExpression|FunctionExpression/.test(cb.type) && cb.body.type === 'BlockStatement' && cb.type === 'ArrowFunctionExpression') return { loop: cb, blk: cb.body, kind: 'cb', cb };
      }
      return null;
    };
    let cand = null;
    const scan = (list) => { for (const st of list) { const lb = loopBodyOf(st); if (lb && L(lb.blk) > MAXL && (!cand || L(lb.blk) > L(cand.blk))) cand = lb; } };
    scan(body);
    if (!cand) { console.log(tname, 'no more chunks; now', total, 'lines'); break; }
    const blk = cand.blk, a = blk.range[0] + 1, b = blk.range[1] - 1;
    // checks: no return/this/arguments/await belonging to the parent (a return in a forEach callback is fine), no var, no break of this loop
    let bad = null; const conts = [];
    const walk = (n, inner) => {
      estraverse.traverse(n, { enter(m, par) {
        if (m === n) return;
        if (/^(FunctionDeclaration|FunctionExpression)$/.test(m.type)) return this.skip();
        if (m.type === 'ArrowFunctionExpression') { estraverse.traverse(m.body, { enter(q) { if (/^(FunctionDeclaration|FunctionExpression)$/.test(q.type)) return this.skip(); if (q.type === 'ThisExpression') bad = 'this'; } }); return this.skip(); }
        if (m.type === 'ThisExpression') bad = 'this';
        if (m.type === 'Identifier' && m.name === 'arguments') bad = 'arguments';
        if (m.type === 'AwaitExpression' || m.type === 'YieldExpression') bad = 'await';
        if (m.type === 'VariableDeclaration' && m.kind === 'var') bad = 'var';
        if ((m.type === 'BreakStatement' || m.type === 'ContinueStatement') && m.label) bad = 'label';
        if (/^(ForStatement|ForOfStatement|ForInStatement|WhileStatement|DoWhileStatement|SwitchStatement)$/.test(m.type)) { walkInner(m); return this.skip(); }
        if (cand.kind === 'loop') { if (m.type === 'ContinueStatement') conts.push(m); if (m.type === 'BreakStatement') bad = 'break'; if (m.type === 'ReturnStatement') bad = 'return'; }
      } });
    };
    // inside a nested loop/switch: break/continue are theirs; returns are still the parent's
    const walkInner = (lp) => estraverse.traverse(lp, { enter(m) { if (m === lp) return; if (/^(FunctionDeclaration|FunctionExpression|ArrowFunctionExpression)$/.test(m.type)) return this.skip(); if (m.type === 'ReturnStatement' && cand.kind === 'loop') bad = 'return'; if (m.type === 'ThisExpression') bad = 'this'; if (m.type === 'VariableDeclaration' && m.kind === 'var') bad = 'var'; if ((m.type === 'BreakStatement' || m.type === 'ContinueStatement') && m.label) bad = 'label'; } });
    walk(blk);
    // params: everything read inside the body that is declared outside it but within the parent function (block scopes too)
    const params = new Set(); let why = bad;
    const visit2 = (sc) => { for (const r of sc.references) { const v = r.resolved; if (!v) continue; const p = r.identifier.range[0]; if (p < a || p >= b) continue; if (v.scope.variableScope !== fsc && v.scope !== fsc) continue; const d = v.defs[0], dp = d ? d.name.range[0] : -1; if (dp >= a && dp < b) continue; if (r.isWrite()) why = why || 'writes ' + v.name; if (v.references.some((q) => q.isWrite() && !q.init) && !(cand.kind === 'cb' && d && d.type === 'Parameter' && cand.cb.params.some((pp) => pp.range[0] === dp))) { const lh = cand.kind === 'loop' && (cand.loop.init || cand.loop.left); if (!(lh && dp >= lh.range[0] && dp < lh.range[1])) why = why || 'reassigned: ' + v.name; } params.add(v.name); } sc.childScopes.forEach(visit2); };
    visit2(fsc);
    if (why || params.size > 9) { console.log(tname, 'loop body not extractable:', why || 'too many params ' + params.size, '; now', total, 'lines'); break; }
    let text = src.slice(a, b);
    for (const c of conts.sort((x, y) => y.range[0] - x.range[0])) text = text.slice(0, c.range[0] - a) + 'return;' + text.slice(c.range[1] - a);
    let nm = tname + 'Each', k2 = 2; while (src.includes('function ' + nm + '(')) nm = tname + 'Each' + k2++;
    const ps = [...params];
    const helper = `\n/** (v1.1.7, code quality) the body of a loop of ${tname}, split out of it */\nfunction ${nm}(${ps.join(', ')}) {${text}}`;
    const call = `{ ${nm}(${ps.join(', ')}); }`;
    console.log(`${tname}: loop body lines ${blk.loc.start.line}-${blk.loc.end.line} (${L(blk)}) -> ${nm}(${ps.join(', ')})`);
    const se = stmt.range[1];
    src = src.slice(0, blk.range[0]) + call + src.slice(blk.range[1], se) + helper + src.slice(se);
    made++;
    continue;
  }
  const { i0, i1, params, outs } = best;
  const a = body[i0].range[0], b = body[i1].range[1];
  // start of the first statement's line (keep the comments just above it in the chunk)
  let a2 = src.lastIndexOf('\n', a - 1) + 1;
  // include leading comment lines
  for (;;) { const p = src.lastIndexOf('\n', a2 - 2) + 1; const line = src.slice(p, a2 - 1); if (/^\s*\/\//.test(line) && p > fn.body.range[0]) a2 = p; else break; }
  const chunk = src.slice(a2, b);
  const name = tname + 'Part' + (made + 1 + (round > 0 ? 0 : 0));
  let nm = name, k = 1; while (src.includes('function ' + nm + '(')) nm = tname + 'Part' + (made + 1 + k++);
  const outNames = [...outs.keys()];
  const kw = [...outs.values()].some((x) => x === 'let') ? 'let' : 'const';
  const ret = outNames.length ? `\n  return { ${outNames.join(', ')} };` : '';
  const firstC = (chunk.match(/^\s*\/\/\s*(.*)$/m) || [])[1];
  const helper = `\n/** (v1.1.7, code quality) part of ${tname}${firstC ? ': ' + firstC.replace(/\*\//g, '') : ''} */\nfunction ${nm}(${params.join(', ')}) {\n${chunk}${ret}\n}`;
  const indent = (chunk.match(/^\s*/) || [''])[0];
  const call = outNames.length ? `${indent}${kw} { ${outNames.join(', ')} } = ${nm}(${params.join(', ')});` : `${indent}${nm}(${params.join(', ')});`;
  console.log(`${tname}: lines ${body[i0].loc.start.line}-${body[i1].loc.end.line} (${best.lines}) -> ${nm}(${params.join(', ')}) returns [${outNames.join(', ')}]`);
  const se = stmt.range[1];
  src = src.slice(0, a2) + call + src.slice(b, se) + helper + src.slice(se);
  made++;
}
if (!DRY && made) fs.writeFileSync(file, src);
console.log('made', made, DRY ? '(dry run)' : '');
