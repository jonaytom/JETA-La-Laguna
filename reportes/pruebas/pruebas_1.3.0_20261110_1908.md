# Pruebas 1.3.0 — 2026-11-10 19:08 — 1/1 OK

Listas: mdt. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 56 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/mdt_ign.py describir Elevacion4258_5` | **OK** | 0 s |

## Detalle

### 1. herramientas/mdt_ign.py describir Elevacion4258_5 — OK

```
<?xml version="1.0" encoding="UTF-8"?>
<wcs:CoverageDescriptions xmlns:wcs="http://www.opengis.net/wcs/2.0" xmlns:ows="http://www.opengis.net/ows/2.0" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:gml="http://www.opengis.net/gml/3.2" xmlns:gmlcov="http://www.opengis.net/gmlcov/1.0" xmlns:swe="http://www.opengis.net/swe/2.0" xsi:schemaLocation="http://www.opengis.net/wcs/2.0 http://schemas.opengis.net/wcs/2.0/wcsAll.xsd ">
  <wcs:CoverageDescription gml:id="Elevacion4258_5">
    <gml:boundedBy>
      <gml:Envelope srsName="http://www.opengis.net/def/crs/EPSG/0/4326" axisLabels="lat long" uomLabels="deg deg" srsDimension="2">
        <gml:lowerCorner>27.63 -18.21</gml:lowerCorner>
        <gml:upperCorner>43.93 4.94</gml:upperCorner>
      </gml:Envelope>
    </gml:boundedBy>
    <wcs:CoverageId>Elevacion4258_5</wcs:CoverageId>
    <gml:domainSet>
      <gml:RectifiedGrid dimension="2" gml:id="grid_Elevacion4258_5">
        <gml:limits>
          <gml:GridEnvelope>
            <gml:low>0 0</gml:low>
            <gml:high>513872 361818</gml:high>
          </gml:GridEnvelope>
        </gml:limits>
        <gml:axisLabels>long lat</gml:axisLabels>
        <gml:origin>
          <gml:Point gml:id="grid_origin_Elevacion4258_5" srsName="http://www.opengis.net/def/crs/EPSG/0/4326">
            <gml:pos>43.929977 -18.209977</gml:pos>
          </gml:Point>
        </gml:origin>
        <gml:offsetVector srsName="http://www.opengis.net/def/crs/EPSG/0/4326">0 0.000045</gml:offsetVector>
        <gml:offsetVector srsName="http://www.opengis.net/def/crs/EPSG/0/4326">-0.000045 0</gml:offsetVector>
      </gml:RectifiedGrid>
    </gml:domainSet>
    <gmlcov:rangeType>
      <swe:DataRecord>
        <swe:field name="band">
          <swe:Quantity>
            <swe:nilValues/>
            <swe:uom code="W.m-2.Sr-1"/>
            <swe:constraint>
              <swe:AllowedValues>
                <swe:interval>-3.4028e+38 3.4028e+38</swe:interval>
                <swe:significantFigures>12</swe:significantFigures>
              </swe:AllowedValues>
            </swe:constraint>
          </swe:Quantity>
        </swe:field>
      </swe:DataRecord>
    </gmlcov:rangeType>
    <wcs:ServiceParameters>
      <wcs:CoverageSubtype>RectifiedGridCoverage</wcs:CoverageSubtype>
      <wcs:nativeFormat>COG</wcs:nativeFormat>
    </wcs:ServiceParameters>
  </wcs:CoverageDescription>
</wcs:CoverageDescriptions>
MDT OK
```

Fotos/archivos nuevos en `tests/shots/`: mdt_Elevacion4258_5.txt
