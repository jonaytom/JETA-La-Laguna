@echo off
rem Trabajador local (v0.64.2): deja esta ventana abierta mientras trabajas con Claude. Hace en este PC lo que Claude
rem encarga en la carpeta cola\ (compilar, pruebas, mapa, copiar los HTML, publicar) y deja el resultado en cola\hecho\.
title JETA La Laguna - trabajador
call "%~dp0_python.bat" || exit /b 1
%PY% tools\trabajador.py
pause
