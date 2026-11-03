# Pruebas 0.99.8 — 2026-11-03 13:53 — 2/2 OK

Listas: v1000k. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 70 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 0 s |
| 2 | `herramientas/sonda_dibujadas.py` | **OK** | 46 s |

## Detalle

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 21, 'peor': 79, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. herramientas/sonda_dibujadas.py — OK

```
     11     0  suelta · - · PlaneGeometry · lejos
     10     0  suelta · - · BufferGeometry · lejos
      7     0  suelta · - · BufferGeometry · hecha después · lejos
      7     0  suelta · - · PlaneGeometry · transparente
      5     0  suelta · casas · BufferGeometry
      4     0  suelta · - · PlaneGeometry
      4     0  suelta · aeropuerto · BufferGeometry
      3     0  suelta · - · ExtrudeGeometry
      2     0  suelta · root · BufferGeometry · hecha después
      2     0  suelta · - · BoxGeometry · transparente · lejos
      1     0  suelta · - · ConeGeometry · lejos
      1     0  suelta · - · BoxGeometry
      1     0  suelta · aeropuerto2 · BufferGeometry
      1     0  instanciada
      1     0  suelta · aeropuerto · PlaneGeometry · transparente · lejos
      1     0  suelta · aeropuerto2 · BufferGeometry · transparente
      1     0  suelta · - · BoxGeometry · transparente
      1     0  suelta · - · BufferGeometry · transparente
== autopista: 900 llamadas (791 mallas pintadas)  [normal, sombras]
    143     0  suelta · - · BoxGeometry · lejos
    122     0  suelta · - · BufferGeometry · lejos
     91     0  trozo de ciudad
     68     0  aparcados
     48     0  suelta · - · ExtrudeGeometry · lejos
     40     0  instanciada por celda
     40     0  suelta · - · PlaneGeometry · transparente · lejos
     36     0  suelta · - · BoxGeometry · hecha después · lejos
     29     0  suelta · - · CylinderGeometry · lejos
     27     0  suelta · - · PlaneGeometry · lejos
     17     0  suelta · obispado · PlaneGeometry · transparente · hecha después · lejos
     16     0  suelta · La Concepción · BufferGeometry · lejos
     15     0  suelta · - · SphereGeometry · lejos
     12     0  suelta · - · BufferGeometry · huesos · hecha después
     10     0  suelta · - · ConeGeometry · lejos
     10     0  suelta · inicio · BufferGeometry · lejos
      9     0  suelta · Estadio Francisco Peraza · BufferGeometry · lejos
      8     0  suelta · inicio · PlaneGeometry · lejos
      8     0  suelta · obispado · PlaneGeometry · hecha después · lejos
      4     0  suelta · aeropuerto · BufferGeometry · lejos
      3     0  juntada
      3     0  suelta · inicio · CylinderGeometry · lejos
      3     0  suelta · inicio · BoxGeometry · lejos
      3     0  suelta · Estadio Francisco Peraza · CylinderGeometry · lejos
      3     0  suelta · Pabellón Juan Ríos Tejera · BufferGeometry · lejos
      3     0  suelta · obispado · BufferGeometry · hecha después · lejos
      3     0  suelta · - · BoxGeometry · transparente · lejos
      3     0  suelta · inicio · PlaneGeometry · transparente · lejos
      2     0  instanciada
      2     0  suelta · Pabellón Juan Ríos Tejera · BoxGeometry · lejos
      1     0  suelta · - · CircleGeometry · lejos
      1     0  suelta · aeropuerto2 · BufferGeometry · lejos
      1     0  suelta · - · ShapeGeometry · lejos
      1     0  suelta · - · PlaneGeometry · hecha después · lejos
      1     0  suelta · aeropuerto2 · BufferGeometry · transparente · lejos
      1     0  suelta · - · CircleGeometry · transparente · lejos
      1     0  suelta · - · CylinderGeometry · transparente · lejos
      1     0  suelta · - · RingGeometry · transparente · hecha después · lejos
      1     0  suelta · - · CylinderGeometry · transparente · hecha después · lejos
      1     0  suelta · - · BufferGeometry · transparente · lejos
SONDA DIBUJADAS OK
```

Fotos/archivos nuevos en `tests/shots/`: sonda_dibujadas.txt
