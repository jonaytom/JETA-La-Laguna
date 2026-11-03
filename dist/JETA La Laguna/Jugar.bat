@echo off
rem JETA La Laguna: la primera vez crea el acceso directo con el icono (Escritorio) y abre el juego.
powershell -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "%~dp0juego\lanzador\acceso_directo.ps1"
call "%~dp0juego\lanzador\lanzar.bat"
