@echo off
rem v0.66: solo las pruebas de lo que ha cambiado (git status + scripts\pruebas\categorias.json) + las de esta version
rem (scripts\PRUEBAS_LISTA.txt), con una sola carga del juego. Para todo: PRUEBAS_TODAS.bat; por zonas: PRUEBAS_<ZONA>.bat.
call "%~dp0_motor_pruebas.bat" cambios version
