# Publica en GitHub la versión que haya en la carpeta del repositorio.
# Solo sube cuando existe scripts\PUBLICAR.txt (lo escribe Claude como ÚLTIMO archivo al copiar una versión
# completa), así nunca se sube una versión a medio copiar. Lo lanza la tarea programada cada 10 minutos.
param([switch]$Quiet, [switch]$Force)
$ErrorActionPreference = 'Continue'
$repo = Split-Path -Parent $PSScriptRoot
Set-Location $repo
$log = Join-Path $PSScriptRoot 'publicar.log'
function Log($m) { $l = "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')  $m"; Add-Content -Path $log -Value $l -Encoding UTF8; if (-not $Quiet) { Write-Host $m } }
try {
  $git = (Get-Command git.exe -ErrorAction SilentlyContinue).Source
  if (-not $git) { foreach ($c in @("$env:ProgramFiles\Git\cmd\git.exe", "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe")) { if (Test-Path $c) { $git = $c } } }
  if (-not $git) { Log 'No encuentro git.'; exit 1 }
  $env:Path = (Split-Path $git) + ';' + $env:Path
  if (-not (Test-Path (Join-Path $repo '.git'))) { Log 'No hay repositorio git: ejecuta primero scripts\configurar_github.bat'; exit 1 }
  $flag = Join-Path $PSScriptRoot 'PUBLICAR.txt'
  if (-not (Test-Path $flag) -and -not $Force) { if (-not $Quiet) { Write-Host 'Nada pendiente de publicar.' }; exit 0 }
  $changes = git status --porcelain
  if (Test-Path $flag) { Remove-Item $flag -Force }
  if (-not $changes) { Log 'Sin cambios que subir.'; exit 0 }
  $ver = (Get-Content (Join-Path $repo 'VERSION') -Raw -Encoding UTF8).Trim()
  $title = ''
  $first = Select-String -Path (Join-Path $repo 'CHANGELOG.md') -Pattern '^## ' -Encoding UTF8 | Select-Object -First 1
  if ($first) { $title = ($first.Line -replace '^##\s*', '') }
  git add -A
  git commit -q -m "v$ver - $title"
  if ($LASTEXITCODE -ne 0) { Log 'ERROR en git commit'; exit 1 }
  $exists = git tag --list "v$ver"
  if (-not $exists) { git tag "v$ver" }
  git push -q origin HEAD --tags
  if ($LASTEXITCODE -ne 0) { New-Item -ItemType File -Path $flag -Force | Out-Null; Log "ERROR al subir v$ver (se reintentará)"; exit 1 }
  Log "Publicada v$ver ($title)"
} catch { Log "ERROR: $($_.Exception.Message)"; exit 1 }
