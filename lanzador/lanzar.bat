@echo off
rem JETA La Laguna: arranca el servidor del juego sin ventana (lanzador\servidor.ps1) y abre el juego a pantalla completa.
rem Normalmente se lanza desde el acceso directo «JETA La Laguna» de la carpeta de arriba.
start "" /min powershell -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "%~dp0servidor.ps1"
