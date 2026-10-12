@echo off
rem Descarga la zona de La Cuesta (OSM + relieve) para ampliar el mapa del juego.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0descargar_zona.ps1" -Nombre lacuesta -X0 2350 -X1 3450 -Z0 1600 -Z1 2250
pause
