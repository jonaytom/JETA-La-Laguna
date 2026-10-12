@echo off
rem Descarga las zonas nuevas del mapa (OSM + relieve): La Cuesta y Taco. Luego avisa a Claude.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0descargar_zona.ps1" -Nombre lacuesta -X0 2350 -X1 3450 -Z0 1600 -Z1 2250
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0descargar_zona.ps1" -Nombre taco -X0 1450 -X1 1850 -Z0 3900 -Z1 4430
pause
