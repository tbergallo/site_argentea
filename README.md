# Argéntea — Home institucional

Implementación buildless en HTML, CSS y JavaScript. Basada en los recortes individuales aprobados y el handoff de 30 páginas. Revisión privada: no lista para lanzamiento institucional público.

## Ejecutar

Desde esta carpeta:

```sh
python3 -m http.server 8000 --directory dist
```

Abrir http://localhost:8000. No requiere npm ni compilación.

## Archivos

- `dist/index.html`: secciones, copy, imágenes y controles semánticos; contenido visible sin JS.
- `dist/styles.css`: tokens, geometrías propias, tipografía, layouts y adaptaciones.
- `dist/app.js`: navegación móvil, expansión, preselección, validación y envío configurable.
- `dist/config.js`: logos, instituciones, contenido ampliado, endpoint y URLs pendientes.
- `dist/fonts.css` y `dist/assets`: fuentes locales e imágenes WebP.
- `assets-manifest.json`: inventario y procedencia de las fotografías provisionales.
- `QA.md`: validaciones efectuadas y límites.

## Implementado

Hero, verbos escalonados, caja editorial sobre fotografía, ECO con dos imágenes, PCI con altura mínima compartida con ECO, Comunidad B con cinco imágenes, espacio de marcas debajo del título, contacto y footer. Menú móvil con Escape y devolución de foco. Campos con labels, errores asociados, foco al primer error y estado anunciado. Preferencia de movimiento reducido. Imágenes con dimensiones, srcset y carga diferida; fuentes Manrope 600/800 e Inter 400/500 locales, con swap.

## Pendientes de assets y decisiones

1. Entregar logos oficiales de Argéntea (oscuro/claro), ECO y PCI. No se reconstruyeron logos desde capturas. Header/footer reservan su geometría sin escribir una marca aproximada; ECO/PCI usan títulos tipográficos provisionales permitidos por el brief.
2. Las once fotografías fueron generadas con imagegen a partir de las escenas aprobadas e integradas como assets independientes, sin texto ni geometrías rasterizadas. Son imágenes conceptuales, no registros de actividades reales. Los originales están en `assets/originals/` y las variantes WebP en `dist/assets/images/`. El Hero ahora utiliza la fotografía completa. Si se desean registros documentales de Argéntea, reemplazar por fotografías autorizadas.
3. Logos y nombres de instituciones con vínculo vigente y permiso de uso. La franja está vacía deliberadamente; no hay marcas inventadas.
4. Confirmar Comunidad B y copy/nombre PCI. Se conserva texto de recortes.
5. Confirmar URL ECO: provisoriamente CTA a contacto, preselecciona ECO. PCI preselecciona Formación para mi institución.
6. Entregar contenido ampliado de liderazgo: expansión implementada; al faltar texto informa disponibilidad pendiente.
7. Confirmar política/URL de privacidad, destinatario y backend.

## Formulario

Sin endpoint, valida y explica que no se envió ningún mensaje. No almacena datos ni los transmite a terceros. Para habilitar, configurar endpoint en `dist/config.js`. Contrato: POST JSON con `name`, `email`, `interest`, `message`; éxito únicamente con HTTP 2xx y JSON `{ "accepted": true }` tras aceptación real por servidor. Timeout 15 s y recuperación de errores conservando datos. El servidor debe validar, limitar abuso y gestionar el destino real. No marcar accepted sin aceptar efectivamente el mensaje. No hay backend implementado.

La privacidad solo aparece con URL configurada. No se agregaron domicilios, teléfonos, redes, copyright, testimonios ni métricas.

## Publicación

Versión owner-private de revisión, con noindex. No cambiar a pública hasta sustituir assets, resolver contenido/destinos y completar QA en navegador. El sitio no contiene integraciones externas ni analítica.
