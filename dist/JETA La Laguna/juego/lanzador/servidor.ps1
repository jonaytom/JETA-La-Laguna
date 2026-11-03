# JETA La Laguna: lanzador de la versión en carpeta (v1.0.1)
# Sirve la carpeta del juego en http://localhost:8790/ (Chrome y Edge no dejan abrir con doble clic un juego hecho de
# varios archivos) y lo abre a pantalla completa, como una aplicación: en Edge (viene con Windows) o en Chrome; si no
# están, en el navegador por defecto. El servidor se cierra solo cuando el juego deja de dar señales (se ha cerrado).
# Siempre el mismo puerto: las partidas guardadas van ligadas a él.
$ErrorActionPreference = 'Stop'
$raiz = Split-Path -Parent $PSScriptRoot          # la carpeta «juego» (este archivo está en juego\lanzador)
$puerto = 8790
$url = "http://localhost:$puerto/"
$perfil = Join-Path $env:LOCALAPPDATA 'JETA La Laguna\navegador'   # perfil propio: ventana de aplicación y partidas aparte

function Abrir-Juego {
  $cands = @(
    "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
    "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
    "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
    "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe")
  foreach ($c in $cands) {
    if ($c -and (Test-Path $c)) {
      Start-Process -FilePath $c -ArgumentList @("--app=$url", '--start-fullscreen', "--user-data-dir=`"$perfil`"", '--no-first-run', '--no-default-browser-check', '--disable-extensions', '--disable-sync', '--disable-features=msEdgeSidebarV2,msHubApps,msWelcomePage,msImplicitSignin', '--autoplay-policy=no-user-gesture-required')  # v1.0.2 (Jonay: «se abrió como si se hubieran instalado extensiones por primera vez»): a clean window, no welcome, extensions or sign-in
      return
    }
  }
  Start-Process $url   # otro navegador: se abre normal; el juego pide la pantalla completa al darle a «Jugar»
}

# ¿ya está abierto? (otro lanzamiento): solo abrir la ventana
try { $r = Invoke-WebRequest -UseBasicParsing -TimeoutSec 2 ($url + 'latido'); if ($r.StatusCode -eq 200) { Abrir-Juego; exit } } catch { }

$tipos = @{ '.html' = 'text/html; charset=utf-8'; '.js' = 'text/javascript; charset=utf-8'; '.json' = 'application/json'; '.css' = 'text/css';
  '.png' = 'image/png'; '.jpg' = 'image/jpeg'; '.webp' = 'image/webp'; '.ico' = 'image/x-icon'; '.woff2' = 'font/woff2'; '.mp3' = 'audio/mpeg';
  '.ogg' = 'audio/ogg'; '.wav' = 'audio/wav'; '.map' = 'application/json'; '.glb' = 'model/gltf-binary'; '.txt' = 'text/plain; charset=utf-8' }

$srv = New-Object System.Net.HttpListener
$srv.Prefixes.Add($url)
$srv.Start()
Abrir-Juego
$ultimo = Get-Date
$espera = $srv.BeginGetContext($null, $null)
while ($true) {
  if (-not $espera.AsyncWaitHandle.WaitOne(1000)) {
    # sin noticias del juego en 90 s (y ya cargó alguna vez): se ha cerrado la ventana
    if (((Get-Date) - $ultimo).TotalSeconds -gt 90) { break }
    continue
  }
  $ctx = $srv.EndGetContext($espera); $espera = $srv.BeginGetContext($null, $null)
  $ultimo = Get-Date
  try {
    $ruta = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/'))
    if ($ruta -eq 'latido') { $b = [Text.Encoding]::UTF8.GetBytes('ok'); $ctx.Response.ContentType = 'text/plain'; $ctx.Response.OutputStream.Write($b, 0, $b.Length); $ctx.Response.Close(); continue }
    if ($ruta -eq '') { $ruta = 'index.html' }
    $f = [IO.Path]::GetFullPath((Join-Path $raiz $ruta))
    if (-not $f.StartsWith($raiz, [StringComparison]::OrdinalIgnoreCase) -or -not (Test-Path $f -PathType Leaf)) { $ctx.Response.StatusCode = 404; $ctx.Response.Close(); continue }
    $ext = [IO.Path]::GetExtension($f).ToLower(); $t = $tipos[$ext]; if (-not $t) { $t = 'application/octet-stream' }
    $ctx.Response.ContentType = $t
    $ctx.Response.Headers.Add('Cache-Control', 'no-cache')
    $bytes = [IO.File]::ReadAllBytes($f); $ctx.Response.ContentLength64 = $bytes.Length
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length); $ctx.Response.Close()
  } catch { try { $ctx.Response.StatusCode = 500; $ctx.Response.Close() } catch { } }
}
$srv.Stop()
