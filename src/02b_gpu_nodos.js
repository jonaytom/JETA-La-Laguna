// ---------- v1.4.44 (Jonay, 23-nov: «sigamos con webgpu»): the extras that the WebGL materials get with onBeforeCompile,
// written again in TSL (three.js nodes) for the WebGPURenderer (?gpu=webgpu, 01_core.js). WebGPU turns every material
// into its node version copying all its properties (NodeLibrary.fromMaterial), so these functions only add node
// properties (colorNode, maskNode…) or a setupDiffuseColor of its own to the same material: WebGL ignores them and the
// GLSL path stays exactly as it was. Each one mirrors the GLSL next to it (02_textures.js, 04_world.js, 06a_humans.js,
// 06b_vmodels.js, 07_vehicles.js); when one changes, the other must change too.

/** the values that change while playing (night, plaster loaded, texture switch, cuttings) as ONE shared uniform each, in
 *  the render group: three.js refreshes those on every render, also for the objects recorded in a BundleGroup (05w_optimiza.js),
 *  whose own per-object uniforms are not refreshed (the windows did not light up at night inside the bundles) */
const GPU_SHARED = {};
function gpuShared(name, init, get, type) {
  if (!GPU_SHARED[name]) {
    const T = THREE.TSL;
    GPU_SHARED[name] = (type ? T.uniform(init, type) : T.uniform(init)).setGroup(T.renderGroup).onRenderUpdate(get);
  }
  return GPU_SHARED[name];
}
/** fn(nodeMaterial) runs when WebGPU builds the material (not at load: the textures and tables it reads may not exist
 *  yet). Several per material add up (cutAware over stoneWorld). */
function gpuLazy(mat, fn) {
  mat.__gpuInits = (mat.__gpuInits || []).concat(fn);
  mat.setup = function (builder) {
    if (!this.__gpuDone) {
      this.__gpuDone = true;
      for (const f of this.__gpuInits) f(this);
    }
    return Object.getPrototypeOf(this).setup.call(this, builder);
  };
}
/** the base setupDiffuseColor of the node material, then f() (like code after «#include <color_fragment>») */
function gpuAfterDiffuse(mat, f) {
  const prev = mat.setupDiffuseColor;
  mat.setupDiffuseColor = function (builder) {
    prev.call(this, builder);
    f(builder);
  };
}
/** f() first (the discards of the cuttings), then whatever setupDiffuseColor the material had */
function gpuBeforeDiffuse(mat, f) {
  const prev = mat.setupDiffuseColor;
  mat.setupDiffuseColor = function (builder) {
    f(builder);
    prev.call(this, builder);
  };
}
/** world position and normal by axis: the plane a wall «looks at» (stoneWorld, plasterWorld) */
function gpuWorldUV() {
  const { positionWorld, normalWorld, abs, select } = THREE.TSL;
  const an = abs(normalWorld);
  return select(an.y.greaterThan(0.7), positionWorld.xz, select(an.x.greaterThan(an.z), positionWorld.zy, positionWorld.xy));
}
/** stoneWorld (02_textures.js) */
function gpuStoneWorld(mat, darkOnly, amt) {
  const T = THREE.TSL;
  // (per material: read from the material drawn, see gpuSkin; the materials share the cache key 'stoneWorld')
  const uAmt = T.materialReference('jtAmt', 'float'), // (set on the original material: stoneWorld)
    uTexW = gpuShared('texW', 1, () => TEXW.value);
  gpuAfterDiffuse(mat, () => {
    const st = T.texture(TEX.basalt, gpuWorldUV().div(2.0)).rgb.div(0.13);
    const base = T.diffuseColor.rgb.toVar();
    const k = darkOnly ? T.smoothstep(0.42, 0.22, T.dot(base, T.vec3(0.333))) : T.float(1);
    T.diffuseColor.rgb.assign(base.mul(T.mix(T.vec3(1), T.clamp(st, 0.0, 2.6), uAmt.mul(k).mul(uTexW))));
  });
}
/** plasterWorld (02_textures.js) */
function gpuPlasterWorld(mat, kind, amt, tile) {
  const T = THREE.TSL;
  // (kind, strength and tile per material, read from the material drawn: they all share the cache key 'plasterWorld')
  const uPl = T.materialReference('jtPl', 'vec3'),
    uPlA = T.materialReference('jtPlA', 'vec2'),
    plOn = gpuShared('plOn', 0, () => PLASTER.on.value),
    uTexW = gpuShared('texW', 1, () => TEXW.value);
  gpuAfterDiffuse(mat, () => {
    const pd = T.dot(T.texture(PLASTER.det, gpuWorldUV().mul(uPlA.y)).rgb, uPl);
    T.diffuseColor.rgb.mulAssign(T.mix(T.float(1), pd.sub(0.5).mul(uPlA.x).add(1), plOn.mul(uTexW)));
  });
}
/** the façade material with the atlas (04_world.js, makeMaterials) */
function gpuFacade(fm) {
  const T = THREE.TSL;
  const {
    float,
    vec2,
    vec3,
    vec4,
    uv,
    attribute,
    texture,
    fract,
    floor,
    select,
    mix,
    dot,
    sin,
    step,
    dFdx,
    dFdy,
    cross,
    normalize,
    max,
    sqrt,
    inverseSqrt
  } = T;
  const uNight = gpuShared('night', 0, () => U.uNight.value),
    plOn = gpuShared('plOn', 0, () => PLASTER.on.value),
    uSty = T.uniformArray(
      FSTY.map((d) => new THREE.Vector2(d[0], d[1])),
      'vec2'
    );
  const hsh = (p) => fract(sin(dot(p, vec2(12.9898, 78.233))).mul(43758.5453));
  const vF = uv(),
    vCol = attribute('aCol', 'vec3'),
    vEx = attribute('aEx', 'vec2');
  const fl = floor(vF.y),
    cl = fract(vF),
    row = select(fl.lessThan(0.5), float(0), float(1)),
    aid = vEx.x,
    acol = select(aid.lessThan(7.5), aid, aid.sub(8.0)),
    aband = select(aid.lessThan(7.5), float(2), float(0));
  const auv = vec2(acol.add(cl.x).div(8.0), aband.add(row).add(cl.y).mul(0.25));
  const gx = dFdx(vF).mul(vec2(1 / 8, 0.25)),
    gy = dFdy(vF).mul(vec2(1 / 8, 0.25));
  const tc = texture(TEX.facade, auv).grad(gx, gy),
    mk = texture(TEX.facadeMask, auv).grad(gx, gy);
  const puv = vF
    .mul(uSty.element(T.int(T.clamp(aid, 0.0, 15.0))))
    .div(3.2)
    .add(vec2(vEx.y.mul(0.37), vEx.y.mul(0.61)));
  const pk = hsh(vec2(vEx.y.mul(7.3), 2.1)),
    pw = select(pk.lessThan(0.45), vec3(1, 0, 0), select(pk.lessThan(0.86), vec3(0, 1, 0), vec3(0, 0, 1)));
  const pd = dot(texture(PLASTER.det, puv).rgb, pw),
    pa = mk.r.mul(plOn);
  const lit = step(0.55, hsh(floor(vF).add(vec2(vEx.y.mul(13.1), vEx.y))));
  fm.colorNode = vec4(mix(tc.rgb, tc.rgb.mul(vCol), mk.r).mul(mix(float(1), pd.sub(0.5).mul(1.3).add(1), pa)), tc.a);
  fm.roughnessNode = mix(T.materialRoughness, 0.12, mk.g);
  fm.metalnessNode = mix(T.materialMetalness, 0.6, mk.g.mul(0.6));
  // (v1.4.47: each window its own warm tone, brighter at the top, some curtains: as the GLSL in 04_world.js)
  const wf = fract(vF),
    wh = hsh(floor(vF).add(vec2(3.7, vEx.y))),
    wc = select(wh.greaterThan(0.93), vec3(0.55, 0.7, 1.0), mix(vec3(1.0, 0.62, 0.3), vec3(1.0, 0.82, 0.55), wh)),
    wi = wh
      .mul(0.45)
      .add(0.55)
      .mul(mix(float(0.6), float(1.0), wf.y))
      .mul(select(wh.lessThan(0.3).and(wf.x.greaterThan(0.55)), float(0.35), float(1.0)));
  fm.emissiveNode = mk.g.mul(lit).mul(uNight).mul(wc).mul(1.35).mul(wi);
  // plaster normal maps, laid by derivatives (no tangents), like the GLSL
  {
    const pn1 = texture(PLASTER.n1, puv),
      pn2 = texture(PLASTER.n2, puv);
    const nxy = vec2(dot(pw, vec3(pn1.r, pn1.b, pn2.g)), dot(pw, vec3(pn1.g, pn2.r, pn2.b)))
      .mul(2.0)
      .sub(1.0)
      .mul(pa.mul(0.9));
    const N = T.normalView,
      q0 = dFdx(T.positionView),
      q1 = dFdy(T.positionView),
      st0 = dFdx(puv),
      st1 = dFdy(puv);
    const q1p = cross(q1, N),
      q0p = cross(N, q0);
    const Tn = q1p.mul(st0.x).add(q0p.mul(st1.x)),
      Bn = q1p.mul(st0.y).add(q0p.mul(st1.y));
    const sc = inverseSqrt(max(max(dot(Tn, Tn), dot(Bn, Bn)), 1e-20));
    fm.normalNode = normalize(
      Tn.mul(nxy.x.mul(sc))
        .add(Bn.mul(nxy.y.mul(sc)))
        .add(N.mul(sqrt(max(0.0, float(1).sub(dot(nxy, nxy))))))
    );
  }
}
/** the open cuttings and ramps (04_world.js): writes the loops into the shader being built (call it inside a setup
 *  hook) and returns a bool var, true where the fragment must go. p: world xz; y: world height or null (the terrain: no
 *  height test) */
function gpuCutHole(p, y) {
  const T = THREE.TSL;
  const { int, ivec2, vec2, float, bool, If, Loop, Break, Continue, textureLoad, floor, clamp, dot, max, mix } = T;
  const uGrpN = gpuShared('grpN', 0, () => TCUT_U.n.value, 'int');
  {
    const hole = bool(false).toVar();
    const cgc = ivec2(floor(p.sub(vec2(CG.x0, CG.z0)).div(CG.s)));
    const inGrid = cgc.x.greaterThanEqual(0).and(cgc.y.greaterThanEqual(0)).and(cgc.x.lessThan(CG.nx)).and(cgc.y.lessThan(CG.nz));
    If(inGrid, () => {
      If(textureLoad(CG_TEX, cgc, int(0)).r.greaterThan(0.5), () => {
        Loop({ start: int(0), end: uGrpN, type: 'int', condition: '<', name: 'g' }, ({ g }) => {
          const B = textureLoad(TCUT_TEX, ivec2(g, 2), int(0));
          If(p.x.lessThan(B.x).or(p.y.lessThan(B.y)).or(p.x.greaterThan(B.z)).or(p.y.greaterThan(B.w)), () => Continue());
          const rg = textureLoad(TCUT_TEX, ivec2(g, 3), int(0));
          Loop({ start: int(rg.x), end: int(rg.y), type: 'int', condition: '<', name: 'k' }, ({ k }) => {
            const c = textureLoad(TCUT_TEX, ivec2(k, 0), int(0)),
              cw = textureLoad(TCUT_TEX, ivec2(k, 1), int(0));
            if (y) If(cw.w.lessThan(-1e8), () => Continue());
            const ab = c.zw.sub(c.xy),
              t = clamp(dot(p.sub(c.xy), ab).div(max(dot(ab, ab), 1e-3)), 0.0, 1.0),
              q = c.xy.add(ab.mul(t)).sub(p);
            const r = y ? cw.x.sub(0.1) : cw.x;
            let cond = dot(q, q).lessThan(r.mul(r));
            if (y) cond = cond.and(y.greaterThan(mix(cw.y, cw.z, t).add(0.8))).and(y.lessThan(cw.w));
            If(cond, () => {
              hole.assign(true);
              Break();
            });
          });
          If(hole, () => Break());
        });
      });
    });
    return hole;
  }
}
/** cutAware (04_world.js): streets, pavements and lines over an open cutting are not drawn */
function gpuCutAware(mat) {
  gpuBeforeDiffuse(mat, () => {
    const { positionWorld, If, Discard } = THREE.TSL;
    If(gpuCutHole(positionWorld.xz, positionWorld.y), () => Discard());
  });
}
/** the terrain (04_world.js, buildTerrain): cuttings, photo grain, detail, the paved mask; earth colour seen from below */
function gpuTerrain(m, mtex) {
  const T = THREE.TSL;
  const { vec3, float, texture, clamp, mix, dot, max, smoothstep, uv, If, frontFacing, positionGeometry } = T;
  const vW = positionGeometry.xz;
  gpuBeforeDiffuse(m, () => T.If(gpuCutHole(vW, null), () => T.Discard()));
  gpuAfterDiffuse(m, () => {
    const bc = T.diffuseColor.rgb.toVar();
    const gr = clamp(bc.g.sub(max(bc.r, bc.b)).mul(9.0), 0.0, 1.0);
    const tg = texture(TEX.grass, vW.div(4.0)).rgb.div(vec3(0.0966, 0.1814, 0.0409));
    const td = texture(TEX.dirt, vW.div(4.0)).rgb.div(vec3(0.2304, 0.1488, 0.0828));
    let ph = mix(td, tg, gr);
    ph = mix(vec3(dot(ph, vec3(0.3333))), ph, 0.35);
    const d1 = texture(TEX.detail, vW.div(7.0)).r,
      d2 = texture(TEX.detail, vW.div(53.0)).g;
    const c1 = bc.mul(mix(vec3(1), clamp(ph, 0.0, 2.5), 0.85)).mul(d1.mul(0.15).add(d2.mul(0.55)).add(0.62).mul(0.95));
    const pm = texture(mtex, uv()).r;
    const pv = texture(TEX.paving, vW.div(4.0)).rgb.mul(vec3(1.0, 0.98, 0.95));
    T.diffuseColor.rgb.assign(mix(c1, pv.mul(mix(0.8, 1.0, pm)), smoothstep(0.3, 0.8, pm)));
    If(frontFacing.not(), () => T.diffuseColor.rgb.assign(vec3(0.16, 0.12, 0.09)));
  });
}
/** the values each person's clothes read when drawn (materialReference, gpuSkin), on the ORIGINAL material: WebGPU builds
 *  the nodes on a copy but reads the references from the material being drawn */
function gpuSkinProps(m) {
  const u = m.userData.u;
  for (let i = 1; i <= 5; i++) m['jtC' + i] = u.uCloth.value[i];
  m.jtSleeve = u.uSleeve.value;
  m.jtLong = u.uLong.value;
  m.jtJacket = u.uJacket.value;
  m.jtBelt = u.uBelt.value;
  m.jtSole = u.uSole.value;
}
/** the people's clothes (06a_humans.js, skinMaterial) */
function gpuSkin(m) {
  const T = THREE.TSL;
  const { float, int, vec2, vec3, uniform, uniformArray, attribute, uv, positionGeometry, floor, fract, sin, dot, abs, If, select, bool } = T;
  // v1.4.46 (Jonay, con WebGPU: «el muñeco va de blanco… de pronto se puso la ropa de otro color»): every person's material
  // has the same cache key ('jetaSkin', one program for all in WebGL), and WebGPU reused the node graph of the first one built,
  // with ITS colours, for everybody. Now the colours are read from the material being drawn (materialReference): one program,
  // each person with their clothes. The values are the same objects as userData.u (later changes, like the jacket, count).
  const R = T.materialReference; // (the values: gpuSkinProps, on the original material, which is the one read when drawing)
  const uCloth = { element: (i) => R('jtC' + i, 'color') },
    uSleeve = R('jtSleeve', 'float'),
    uLong = R('jtLong', 'float'),
    uJacket = R('jtJacket', 'vec4'),
    uBelt = R('jtBelt', 'vec4'),
    uSole = R('jtSole', 'color');
  gpuAfterDiffuse(m, () => {
    const rg = int(attribute('aReg', 'float').add(0.5)).toVar(),
      vB = positionGeometry;
    const cloth = rg
      .greaterThan(0)
      .and(rg.equal(2).and(uSleeve.lessThan(0.5)).not())
      .and(rg.equal(4).and(uLong.lessThan(0.5)).not())
      .or(uJacket.w.greaterThan(0.5).and(rg.equal(1).or(rg.equal(2))));
    If(cloth, () => {
      const cc = vec3(
        select(
          rg.equal(1),
          uCloth.element(1),
          select(rg.equal(2), uCloth.element(2), select(rg.equal(3), uCloth.element(3), select(rg.equal(4), uCloth.element(4), uCloth.element(5))))
        )
      ).toVar();
      const grain = float(0.9)
        .add(fract(sin(dot(floor(uv().mul(256.0)), vec2(12.99, 78.23))).mul(43758.5)).mul(0.1))
        .toVar();
      If(uJacket.w.greaterThan(0.5).and(rg.equal(2).or(rg.equal(1).and(abs(vB.x).lessThan(0.075).and(vB.z.greaterThan(0.0)).not()))), () => {
        cc.assign(uJacket.xyz);
        If(
          rg
            .equal(1)
            .and(abs(abs(vB.x).sub(0.08)).lessThan(0.008))
            .and(vB.z.greaterThan(0.0)),
          () => cc.mulAssign(0.6)
        );
      });
      If(
        rg
          .equal(3)
          .and(uBelt.w.greaterThan(0.0))
          .and(abs(vB.y.sub(uBelt.w)).lessThan(0.028)),
        () => {
          cc.assign(uBelt.xyz);
          grain.assign(1.0);
        }
      );
      If(rg.equal(3).or(rg.equal(4)), () =>
        grain.mulAssign(
          sin(vB.x.mul(900.0).add(vB.y.mul(40.0)))
            .mul(0.06)
            .add(0.94)
        )
      );
      If(rg.equal(5).and(vB.y.lessThan(0.035)), () => cc.assign(uSole));
      T.diffuseColor.rgb.assign(cc.mul(grain));
    });
  });
}
/** the headlights of the Blender cars glow at night (06b_vmodels.js, litCarBodyMat) */
function gpuCarLamp(mat, level) {
  const T = THREE.TSL;
  const lv = gpuShared('headlights', 0, () => level.value);
  mat.emissiveNode = T.materialEmissive.add(T.vec3(1.0, 0.92, 0.8).mul(T.attribute('lampMask', 'float')).mul(lv));
}
/** parked cars (07_vehicles.js): the instance colour paints only the vertices flagged as paint (aPaint) */
function gpuParkedPaint(mat) {
  const T = THREE.TSL;
  mat.setupDiffuseColor = function (builder) {
    // (v1.4.44: batched parked cars carry their colour in batchColor, the old instanced cells in instanceColor)
    const per = builder.object && builder.object.isBatchedMesh ? T.batchColor.rgb : T.instanceColor;
    const paint = T.mix(T.vec3(1), per, T.attribute('aPaint', 'float'));
    T.diffuseColor.assign(T.vec4(T.materialColor.rgb.mul(T.vertexColor().rgb).mul(paint), 1.0));
  };
  mat.clearcoatNode = T.materialClearcoat.mul(T.attribute('aPaint', 'float')); // v1.4.46: the clear coat only on the paint
}

/** v1.4.46: metallic flakes in the car paint (carFlakeGLSL in 06_actors.js is the same for WebGL): tiny cells of ~3 mm in
 * the car's own space, each one a little rougher or smoother and tilted, under a smooth clear coat; they fade out when
 * a cell gets smaller than a pixel (far away), so they don't shimmer. mask: the name of a 0–1 attribute (parked cars: aPaint, only the paint) */
function gpuCarFlake(mat, mask) {
  const T = THREE.TSL;
  const q = T.positionLocal.mul(300),
    fk = T.fract(T.sin(T.dot(T.floor(q), T.vec3(12.9898, 78.233, 37.719))).mul(43758.5453)),
    amp = T.clamp(T.float(1.6).sub(T.length(T.fwidth(q))), 0, 1).mul(mask ? T.attribute(mask, 'float') : T.float(1));
  mat.roughnessNode = T.clamp(T.materialRoughness.add(fk.sub(0.5).mul(0.12).mul(amp)), 0.04, 1);
  const tilt = T.vec3(T.fract(fk.mul(13.1)), T.fract(fk.mul(7.7)), T.fract(fk.mul(3.3)))
    .sub(0.5)
    .mul(0.05)
    .mul(amp);
  mat.normalNode = T.normalize(T.normalView.add(tilt));
  mat.clearcoatNormalNode = T.normalView; // (the coat stays smooth over the flakes)
}
