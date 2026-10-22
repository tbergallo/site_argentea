# QA — 9 de octubre de 2026

## Verificado

- JavaScript de app/config: `node --check`, sin errores de sintaxis.
- HTML: un H1, IDs únicos, destinos de anchors presentes, cuatro controles con labels asociados.
- Once imágenes locales existentes, con alt vacío por carácter conceptual/decorativo, dimensiones y srcset.
- Cuatro archivos de fuente locales descargados; no dependen de peticiones del visitante a Google.
- CSS: delimitadores balanceados; ECO/PCI comparten --feature-height.
- Static payload total aproximado: 1,4 MB, incluidas variantes y fuentes. No es una medición de transferencia inicial ni Lighthouse.

## Diseñado, no verificado en navegador

Viewports previstos: 320, 390, 600, 768, 900, 1024, 1280, 1440 y 1920 px. Breakpoints 359/599/899/1199/1439 y ampliación 1600.

No se realizaron capturas de implementación, comparaciones superpuestas, pruebas reales de teclado, zoom 200 %, medición de overflow ni auditoría WCAG/Lighthouse. El entorno managed-linux no tiene disponible la skill control-browser requerida por Sites; las instrucciones de Sites impiden sustituirla por otra vía de control o instalar un navegador. No se declara QA visual aprobado.

## Revisión pendiente concreta

- Capturar cada sección al ancho de su referencia; ajustar tipo, ancho de copy, foto y diagonal, en ese orden.
- Revisar especialmente las palabras largas y el titular de Comunidad entre 600–1024 px.
- Confirmar que ningún contenido desborde a 320 px y al ampliar texto/zoom.
- Menú: apertura, Escape, foco y navegación; probar con teclado y lector.
- Formulario: errores de cada campo, interés desde PCI/ECO, validación sin envío, fallo, timeout y éxito con backend real.
- Reemplazar fotos provisionales de baja resolución antes de juzgar fidelidad fotográfica final.

No se certifica conformidad WCAG ni funcionamiento de backend.

## Ajuste de escala solicitado

Titulares desktop reducidos aproximadamente 18–20 %, cuerpos 12–18 %, alturas y collages alrededor de 18–20 %. Mobile recibe una reducción menor y conserva controles legibles. ECO y PCI mantienen altura mínima compartida. CSS validado estructuralmente; continúa pendiente verificación visual en navegador.

## Integración de las once imágenes generadas

Se comprobaron los once originales PNG y se reemplazaron todas las imágenes del HTML por variantes WebP locales con srcset, tamaños y dimensiones reales. Se revisaron visualmente los originales durante generación. El Hero usa ahora una fotografía completa como fondo; se ajustaron puntos focales por sección. No se generaron imágenes adicionales en esta integración. Continúa pendiente la comprobación de la página renderizada en navegador.
