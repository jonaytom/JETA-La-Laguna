@echo off
rem Busca Python (lo instala con winget si falta) e instala lo necesario la primera vez. Deja la ruta en %PY%.
rem Lo usan _motor_pruebas.bat y TRABAJADOR.bat (con "call").
chcp 65001 >nul
cd /d "%~dp0.."
set PIP_DISABLE_PIP_VERSION_CHECK=1
set "PY="
py -3 --version >nul 2>nul && set "PY=py -3"
if not defined PY python --version >nul 2>nul && set "PY=python"
if defined PY goto :tengo
echo.
echo No hay Python instalado en este PC.
set /p R=Lo instalo ahora (Python 3.12, gratis, con winget de Windows)? [S/N] 
if /i not "%R%"=="S" (
  echo Instalalo desde https://www.python.org/downloads/ marcando "Add python.exe to PATH".
  pause
  exit /b 1
)
winget install -e --id Python.Python.3.12 --accept-package-agreements --accept-source-agreements
echo.
echo Python instalado. CIERRA esta ventana y vuelve a abrir el .bat para que Windows lo encuentre.
pause
exit /b 1
:tengo
echo Usando %PY%
%PY% -c "import markdown" 2>nul || %PY% -m pip install --user --quiet markdown
%PY% -c "import playwright" 2>nul || (
  echo Instalando Playwright la primera vez...
  %PY% -m pip install --user --quiet playwright || (pause & exit /b 1)
)
%PY% -c "from playwright.sync_api import sync_playwright as s; p=s().start(); b=p.chromium.launch(); b.close(); p.stop()" 2>nul || (
  echo Descargando el navegador de pruebas la primera vez...
  %PY% -m playwright install chromium || (pause & exit /b 1)
)
exit /b 0
