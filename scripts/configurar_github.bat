@echo off
cd /d "%~dp0.."
echo === JETA La Laguna: conectar con GitHub ===
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0configurar_github.ps1"
echo.
echo (Si algo fallo, el detalle esta en scripts\configurar.log)
pause
