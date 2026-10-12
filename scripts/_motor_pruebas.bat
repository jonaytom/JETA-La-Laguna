@echo off
rem Motor de las pruebas en este PC (v0.64.2). Lo llaman PRUEBAS.bat y PRUEBAS_*.bat con el nombre de la lista
rem (scripts\pruebas\<nombre>.txt, "version" = PRUEBAS_LISTA.txt, "todas").
call "%~dp0_python.bat" || exit /b 1
%PY% tools\pruebas_locales.py %*
echo.
echo Informe: reportes\pruebas\ULTIMO.md  -  dile a Claude que ya estan.
pause
