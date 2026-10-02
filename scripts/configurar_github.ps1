# Configuración inicial (una sola vez): crea el repositorio git en esta carpeta, lo conecta con GitHub,
# hace la primera subida y programa la publicación automática cada 10 minutos.
# Todo lo que pasa queda apuntado en scripts\configurar.log.
param([string]$Url)
$ErrorActionPreference = 'Continue'
$repo = Split-Path -Parent $PSScriptRoot
Set-Location $repo
$log = Join-Path $PSScriptRoot 'configurar.log'
try { Start-Transcript -Path $log -Force | Out-Null } catch {}
function Fail($m) { Write-Host ''; Write-Host "ERROR: $m" -ForegroundColor Red; try { Stop-Transcript | Out-Null } catch {}; exit 1 }

if (-not $Url) { $u = Join-Path $PSScriptRoot 'github_url.txt'; if (Test-Path $u) { $Url = (Get-Content $u -Raw -Encoding UTF8) } }
$Url = ("$Url" -replace '^﻿', '').Trim()
if (-not $Url) { $Url = (Read-Host 'Dirección del repositorio de GitHub (https://github.com/usuario/repo.git)').Trim() }
Write-Host "Carpeta: $repo"
Write-Host "Repositorio: $Url"

# --- buscar git (aunque el PATH aún no se haya actualizado tras instalarlo) ---
function Find-Git {
  $c = Get-Command git.exe -ErrorAction SilentlyContinue
  if ($c) { return $c.Source }
  foreach ($p in @("$env:ProgramFiles\Git\cmd\git.exe", "${env:ProgramFiles(x86)}\Git\cmd\git.exe", "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe")) {
    if ($p -and (Test-Path $p)) { return $p }
  }
  return $null
}
$git = Find-Git
if (-not $git) {
  Write-Host 'No encuentro Git en este PC.' -ForegroundColor Yellow
  if (Get-Command winget.exe -ErrorAction SilentlyContinue) {
    $r = Read-Host '¿Lo instalo ahora con winget (Git for Windows)? [S/N]'
    if ($r -match '^[sSyY]') {
      winget install --id Git.Git -e --source winget --accept-package-agreements --accept-source-agreements
      $git = Find-Git
    }
  }
  if (-not $git) { Fail 'Instala "Git for Windows" desde https://git-scm.com/download/win (opciones por defecto) y vuelve a ejecutar configurar_github.bat.' }
}
$env:Path = (Split-Path $git) + ';' + $env:Path
Write-Host "Git: $git ($(& $git --version))"

function G { & $git @args; if ($LASTEXITCODE -ne 0) { Fail "falló: git $($args -join ' ')" } }

# --- repositorio local ---
if (-not (Test-Path '.git')) { G init -q; G symbolic-ref HEAD refs/heads/main }
& $git config core.autocrlf false
& $git config core.longpaths true
$n = & $git config user.name
if (-not $n) { $n = Read-Host 'Tu nombre para los commits (p. ej. Jonay)'; G config user.name "$n" }
$e = & $git config user.email
if (-not $e) { $e = Read-Host 'Tu email de GitHub'; G config user.email "$e" }
$remotes = & $git remote
if ($remotes -contains 'origin') { G remote set-url origin $Url } else { G remote add origin $Url }
& $git config credential.helper manager 2>$null

G add -A
$pend = & $git status --porcelain
if ($pend) {
  $ver = (Get-Content VERSION -Raw -Encoding UTF8).Trim()
  G commit -q -m "v$ver - Primera subida del proyecto"
  & $git tag -f "v$ver" | Out-Null
}
& $git branch -M main

Write-Host ''
Write-Host 'Subiendo a GitHub... Se abrirá una ventana o el navegador para que inicies sesión en GitHub:' -ForegroundColor Yellow
Write-Host 'elige "Sign in with your browser" y autoriza "Git Credential Manager".' -ForegroundColor Yellow
& $git push -u origin main --tags
if ($LASTEXITCODE -ne 0) {
  Fail 'No se pudo subir. Si GitHub dice "rejected" es que el repositorio ya tiene archivos (p. ej. un README): bórralos o crea el repositorio vacío. Si dice "Authentication failed", vuelve a ejecutar y entra con tu cuenta. Mira scripts\configurar.log.'
}

# --- tarea programada: cada 10 minutos publica si Claude ha dejado una versión nueva completa ---
try {
  $ps = (Get-Command powershell.exe).Source
  $script = Join-Path $PSScriptRoot 'publicar.ps1'
  $action = New-ScheduledTaskAction -Execute $ps -Argument "-NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$script`" -Quiet"
  $trigger = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(1) -RepetitionInterval (New-TimeSpan -Minutes 10) -RepetitionDuration (New-TimeSpan -Days 3650)
  $settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -DontStopIfGoingOnBatteries -AllowStartIfOnBatteries
  Register-ScheduledTask -TaskName 'JETA La Laguna - publicar en GitHub' -Action $action -Trigger $trigger -Settings $settings -Description 'Sube a GitHub cada versión nueva del juego JETA La Laguna' -Force -ErrorAction Stop | Out-Null
  Write-Host 'Tarea programada creada: publica automáticamente cada 10 minutos si hay versión nueva.' -ForegroundColor Green
} catch {
  Write-Host "No pude crear la tarea programada ($($_.Exception.Message)). Puedes publicar a mano con publicar_ahora.bat." -ForegroundColor Yellow
}
Write-Host ''
Write-Host "Listo. Código subido a $Url" -ForegroundColor Green
try { Stop-Transcript | Out-Null } catch {}
