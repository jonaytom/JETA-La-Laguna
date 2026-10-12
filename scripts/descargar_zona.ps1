# Descarga una zona nueva del mapa (OpenStreetMap por Overpass + relieve de Open-Meteo) para ampliar el juego.
# La lanza Jonay desde su PC (doble clic en descargar_la_cuesta.bat); luego Claude la integra con tools/merge_zona.py.
# Uso: powershell -ExecutionPolicy Bypass -File descargar_zona.ps1 -Nombre lacuesta -X0 2350 -X1 3450 -Z0 1600 -Z1 2250
# Coordenadas en metros del juego (las del minimapa). Salida: data\<Nombre>_osm_raw.json y data\<Nombre>_elev.json
param([string]$Nombre = 'lacuesta', [double]$X0 = 2350, [double]$X1 = 3450, [double]$Z0 = 1600, [double]$Z1 = 2250)
$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot
$data = Join-Path $repo 'data'
$K = [Math]::Cos(28.4875 * [Math]::PI / 180) * 111320
function Lon($x) { return $x / $K - 16.315 }
function Lat($z) { return 28.4875 - $z / 110574 }
$s = [Math]::Round((Lat $Z1), 6); $n = [Math]::Round((Lat $Z0), 6); $w = [Math]::Round((Lon $X0), 6); $e = [Math]::Round((Lon $X1), 6)
$inv = [Globalization.CultureInfo]::InvariantCulture
$bb = [string]::Format($inv, '{0},{1},{2},{3}', $s, $w, $n, $e)
Write-Host "Zona $Nombre : sur $s, oeste $w, norte $n, este $e"

# 1) OpenStreetMap
$q = "[out:json][timeout:90];(way[highway]($bb);way[building]($bb);relation[building]($bb);way[landuse]($bb);way[leisure]($bb);way[natural]($bb);way[amenity]($bb);way[railway]($bb);way[barrier]($bb);node[amenity]($bb);node[shop]($bb);node[healthcare]($bb);node[highway=bus_stop]($bb);node[natural=tree]($bb););out geom($bb);" # geometry clipped to the zone: big land-use/natural polygons around it made the query too heavy
$out1 = Join-Path $data "$($Nombre)_osm_raw.json"
if ((Test-Path $out1) -and (Get-Item $out1).Length -gt 2000) { Write-Host '  OSM ya descargado antes: se reutiliza' } else {
$ok = $false
# the public Overpass servers are often busy (502/504): several rounds over the three, waiting a bit longer each time
for ($ronda = 1; $ronda -le 6 -and -not $ok; $ronda++) {
  foreach ($srv in @('https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter', 'https://maps.mail.ru/osm/tools/overpass/api/interpreter')) {
    try { Write-Host "Descargando OSM de $srv (intento $ronda) ..."; Invoke-WebRequest -Uri $srv -Method Post -Body @{ data = $q } -OutFile $out1 -UseBasicParsing -TimeoutSec 240 -UserAgent 'JETA-La-Laguna/1.0 (juego de Jonay)' -Headers @{ Accept = '*/*' }
      if ((Get-Item $out1).Length -gt 2000) { $ok = $true; break } else { Write-Host '  respuesta vacía'; Remove-Item $out1 } }
    catch { Write-Host "  falló: $($_.Exception.Message)"; if (Test-Path $out1) { Remove-Item $out1 } }
  }
  if (-not $ok) { $espera = 20 * $ronda; Write-Host "  Servidores ocupados: espero $espera s y lo intento otra vez"; Start-Sleep -Seconds $espera }
}
}
if (!(Test-Path $out1)) { throw 'No se pudo descargar OpenStreetMap' }
Write-Host ("  OSM guardado: {0:N0} bytes" -f (Get-Item $out1).Length)

$out2 = Join-Path $data "$($Nombre)_elev.json"
if (Test-Path $out2) { Write-Host '  relieve ya descargado antes: se reutiliza'; Write-Host "Listo: $Nombre"; return }
# 2) Relieve: rejilla de 32 m (Open-Meteo, modelo Copernicus DEM 90 m), de 100 en 100 puntos
$d = 32; $gx0 = [Math]::Floor($X0 / $d) * $d - 64; $gz0 = [Math]::Floor($Z0 / $d) * $d - 64
$nx = [int][Math]::Ceiling(($X1 - $gx0 + 64) / $d) + 1; $nz = [int][Math]::Ceiling(($Z1 - $gz0 + 64) / $d) + 1
$pts = @(); for ($j = 0; $j -lt $nz; $j++) { for ($i = 0; $i -lt $nx; $i++) { $pts += , @((Lat ($gz0 + $j * $d)), (Lon ($gx0 + $i * $d))) } }
$elev = @()
for ($k = 0; $k -lt $pts.Count; $k += 100) {
  $chunk = $pts[$k..([Math]::Min($k + 99, $pts.Count - 1))]
  $la = ($chunk | ForEach-Object { $_[0].ToString('F6', $inv) }) -join ','; $lo = ($chunk | ForEach-Object { $_[1].ToString('F6', $inv) }) -join ','
  # Open-Meteo allows ~600 points a minute: one block of 100 every 11 s, and if the limit still trips, wait a minute and retry
  $r = $null; for ($t = 1; $t -le 5 -and -not $r; $t++) {
    try { $r = Invoke-RestMethod -Uri "https://api.open-meteo.com/v1/elevation?latitude=$la&longitude=$lo" -TimeoutSec 60 -UserAgent 'JETA-La-Laguna/1.0' }
    catch { Write-Host "  límite del servicio de relieve: espero 65 s ($t/5)"; Start-Sleep -Seconds 65 } }
  if (-not $r) { throw 'No se pudo descargar el relieve' }
  $elev += $r.elevation; Write-Host ("  relieve {0}/{1}" -f [Math]::Min($k + 100, $pts.Count), $pts.Count); Start-Sleep -Seconds 11
}
(@{ x0 = $gx0; z0 = $gz0; d = $d; nx = $nx; nz = $nz; e = $elev } | ConvertTo-Json -Compress) | Set-Content -Path $out2 -Encoding UTF8
Write-Host "Listo. Archivos en data\: $($Nombre)_osm_raw.json y $($Nombre)_elev.json. Avisa a Claude."
