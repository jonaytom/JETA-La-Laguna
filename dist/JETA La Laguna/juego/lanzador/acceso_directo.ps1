# JETA La Laguna (v1.0.1): crea en el Escritorio (y en la carpeta del juego) el acceso directo «JETA La Laguna» con el
# icono del juego. Un acceso directo de Windows guarda rutas completas, por eso se hace en el PC de cada uno la primera vez.
$juego = Split-Path -Parent $PSScriptRoot
$sh = New-Object -ComObject WScript.Shell
foreach ($dir in @([Environment]::GetFolderPath('Desktop'), (Split-Path -Parent $juego))) {
  try {
    $l = $sh.CreateShortcut((Join-Path $dir 'JETA La Laguna.lnk'))
    $l.TargetPath = Join-Path $PSScriptRoot 'lanzar.bat'
    $l.WorkingDirectory = $PSScriptRoot
    $l.IconLocation = (Join-Path $PSScriptRoot 'icono.ico') + ',0'
    $l.WindowStyle = 7   # minimizada: no se ve la ventana negra
    $l.Description = 'JETA La Laguna'
    $l.Save()
  } catch { }
}
