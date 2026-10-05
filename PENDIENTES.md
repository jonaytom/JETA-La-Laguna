# Pendientes (notas de feedback)

Lista de comentarios de prueba. **No se hacen al momento**: se anotan aquí y se revisan juntos para agruparlos
y no tocar lo mismo dos veces. Al hacer uno, se tacha y se apunta la versión.

## Por revisar con Jonay

- [ ] **Barrio de San Miguel de Chimisay / El Cardonal**: en OSM falta casi todo (de Z≈3350 a 3850 no hay edificios).
      Rellenar las manzanas con bloques de 4–5 plantas salmón/rosa con balcones y casas canarias de colores, avenida
      en cuesta con paso de cebra, bolardos rojos, barandilla y aparcamiento (`docs/referencias/chimisay/`).
      La casa del hermano ya está (v0.39.0); afinarla cuando se rellene el barrio.
- [ ] **Finca España — Complejo Deportivo Islas Canarias** (C. Tacoronte / C. Fasnia / C. Tinguaro / C. Tindaya):
      junto al campo de fútbol falta el pabellón: gran nave de hormigón gris con cubierta blanca a un agua que vuela
      sobre la esquina, franja de cristal verde agua y lamas oscuras arriba, pilares morados en la planta baja,
      entrada con rótulo «COMPLEJO DEPORTIVO ISLAS CANARIAS» y aparcamiento en batería. Además: campo de césped
      oscuro con grada, muro de bloque, valla alta y torres de focos; cancha polideportiva verde con cipreses; bloque
      blanco curvo grande enfrente; solar con coches en C. Fasnia/Tinguaro; bloques de 3–4 plantas arena/salmón con
      balcones de balaustres blancos y garajes en C. Tacoronte. Casa del colega de Jonay: aprox. **X 1997, Z 1268**
      (en la misma zona del complejo): zona para visitar. Fotos en `docs/referencias/finca_espana/`.
- [ ] **Música «real»** para la radio (hip hop / rap de finales de los 90 y principios de los 2000) con alguna
      herramienta externa y las letras del juego. Solo consulta por ahora: ver opciones antes de hacer nada.

- [ ] **Aeropuerto de Los Rodeos (Tenerife Norte)** al noroeste: terminal con cubierta volada, fachada de piedra
      clara y franja verde de Binter, rotonda-cúpula, torre de control, pista y plataforma con aviones, hangares,
      aparcamientos (P), Cam. de San Lázaro con sus rotondas (Rotonda Sempiterno), TF-5 y enlaces hasta el mapa
      actual (San Benito / El Coromoto). Naves (SEUR, ITV, Binter, depósitos de combustible), fincas de cultivo.
      Ampliar el mapa OSM/relieve para incluirlo. Fotos en `docs/referencias/aeropuerto/`.
- [ ] Repasar con las fotos del aeropuerto la zona ya hecha alrededor (San Benito, El Coromoto, autopista TF-5).

- [ ] **Pelea 2D**: atrás debe **andar hacia atrás**; solo cubre si el rival está lanzando un golpe (como Street
      Fighter). Luchadores un 20 % más pequeños y más separados al empezar (para especiales a distancia). Textos del
      tutorial que se cortan: más cortos; los controles completos van a una pantalla de **configuración de controles**
      nueva dentro del menú de ajustes.

## Pendientes anteriores

- [ ] Edificio La Pirámide (campus, hacia (950, 1928)).
- [ ] Algunos túneles se ven raros por dentro; muro en el túnel gemelo de la vía 1009.
- [ ] **Parking bajo la Plaza del Cristo** (≈X 172, Z −591): más profundo para que la rampa de entrada tenga más
      gálibo (los coches chocan con el techo al entrar); la escalera de salida está taponada por arriba
      (`docs/referencias/parking_cristo_escalera.png`); los coches atraviesan las paredes.
- [ ] **Repaso a conciencia de túneles y pasos inferiores**: bajar más la rasante antes de pasar por debajo, bocas y
      huecos más amplios en general, y prueba automática de que ningún coche choca con techos ni atraviesa muros.
- [ ] Auditoría de obstáculos: 122 avisos; prueba de conducción: 10 de 111 túneles/puentes fallan.
- [ ] Fusionar geometría de fuentes para rendimiento.

## Hecho

- [x] v0.41.0 — Límites del mundo y zonas quitadas, ambiente sonoro, pasos suaves, pistola en el puño, entrada
      del Mercadona por Marqués de Celada, casas en Lucas Vega / Montaraz.
- [x] v0.40.0 — Esquina de inicio (El Blanco) y C. Marqués de Celada: manzanas partidas en casas, edificio amarillo,
      isleta con señales, locales en la subida y Mercadona (Merca Mona) en Teobaldo Power.
- [x] v0.39.0 — Casa del hermano (Google 28.452009, −16.298734 → juego X 1591, Z 3924): casa blanca de 2 plantas
      con torreta, puerta gris, ventanas de marco negro y muro blanco (`05p_casas.js`).
- [x] v0.39.0 — La Concepción rehecha (torre en su sitio real del plano OSM, ~(-529, -346)). Fotos en
      `docs/referencias/concepcion/`.
- [x] v0.38.0 — Coche en zonas con peralte, aceleración −15 % y dirección más suave, peleas 2D más fáciles,
      círculo de Boca Papa, coordenadas en el minimapa.
- [x] v0.37.0 — Pasos sincronizados con la animación y sonido nuevo.
