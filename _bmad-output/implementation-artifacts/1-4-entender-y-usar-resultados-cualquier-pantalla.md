---
baseline_commit: 94ab60f1e2e29f44115824f60ba8c1a879f100e1
---

# Historia 1.4: Entender y usar los resultados en cualquier pantalla

Status: review

## Historia

Como persona que evalúa una promoción desde mobile o desktop,
quiero ver resultados, fórmula, advertencia y ejemplo con claridad,
para elegir un importe seguro aun en pantallas pequeñas.

## Criterios de aceptación

1. Con entradas válidas se muestran dos tarjetas igualmente prominentes: teórico primero y seguro después.
2. La tarjeta segura usa fondo/borde azul sutil y texto que recomienda usarla para no superar el tope.
3. Entre `320px` y `639px`, resultados y ejemplo se apilan en orden teórico → seguro sin recortes ni overflow horizontal.
4. Desde `640px`, resultados y ejemplo usan dos columnas iguales sin cambiar el orden DOM.
5. Importes máximos, errores y texto al `200%` se acomodan sin quedar ocultos ni crear overflow horizontal.
6. Fórmula y ejemplo permanecen visibles; la explicación aclara fracciones de centavo, redondeo y truncamiento conservador.
7. La advertencia usa `details#disclaimer > summary` textual, comunica los tres avisos esenciales al cerrarse y se abre por clic o teclado.
8. La interfaz conserva tokens, tipografía, espaciado y microcopy aprobados, sin animaciones, transiciones ni color como única señal.
9. Limpiar conserva ancho total mobile y alineación derecha desde `640px`.

## Tareas / Subtareas

- [x] Tarea 1: Especificar presentación responsive con Playwright (AC: 1-9)
  - [x] Cubrir valores válidos, máximo, explicación, recomendación, advertencia y ausencia de overflow en mobile/desktop y texto ampliado.
- [x] Tarea 2: Completar contenido semántico de resultados y explicación (AC: 1, 2, 6, 7)
  - [x] Añadir texto complementario a ambas tarjetas y recomendación explícita al resultado seguro.
  - [x] Precisar fracciones de centavo, redondeo y truncamiento en la fórmula.
- [x] Tarea 3: Ajustar estilos de texto de resultado sin alterar el contrato responsive (AC: 3-5, 8, 9)
  - [x] Mantener tarjetas equivalentes y permitir wrapping seguro de texto complementario.
- [x] Tarea 4: Ejecutar regresiones (AC: 1-9)
  - [x] Ejecutar Vitest, build y Playwright.

## Dev Notes

- Modificar solo `index.html`, `src/styles.css`, `tests/calculator.browser.spec.js` y esta historia. `app.js` ya actualiza solo valores; no debe mutarse para contenido estático.
- Conservar los IDs, clases, orden DOM y `hidden` existentes. La tarjeta teórica y segura deben conservar la misma secuencia etiqueta, valor y texto complementario; solo el texto seguro expresa la recomendación.
- Mantener `details#disclaimer` nativo y su summary sin icono o marcador. No introducir movimiento, transiciones ni nuevos controles.
- El layout actual ya usa grid mobile-first y breakpoint `640px`; extender, no duplicar, esas reglas.
- La prueba debe fijar la escala de fuente del documento a `200%` y comprobar que `scrollWidth <= clientWidth` con el importe máximo mostrado.

### Referencias

- [Fuente: `_bmad-output/planning-artifacts/epics.md#Historia-1.4-Entender-y-usar-los-resultados-en-cualquier-pantalla`]
- [Fuente: `_bmad-output/planning-artifacts/architecture/architecture-Calculadora-2026-07-28/ARCHITECTURE-SPINE.md#AD-6---Responsive-mobile-first`]
- [Fuente: `_bmad-output/planning-artifacts/architecture/architecture-Calculadora-2026-07-28/ARCHITECTURE-SPINE.md#AD-7---Semántica-accesible-en-todos-los-estados`]
- [Fuente: `_bmad-output/planning-artifacts/ux-designs/ux-Calculadora-2026-07-27/EXPERIENCE.md#Component-Patterns]

## Dev Agent Record

### Agent Model Used

openai/gpt-5.6-terra

### Debug Log References

### Completion Notes List

- Añadido texto complementario a ambas tarjetas de resultado; el máximo seguro comunica explícitamente la recomendación.
- La explicación de fórmula ahora incluye fracciones de centavo, redondeo y truncamiento conservador.
- Añadidos estilos para el texto complementario y wrapping seguro de `#calculator-status`, que evita overflow al ampliar texto al `200%`.
- Las pruebas browser cubren importe máximo, resultados y ejemplo responsive, recomendación, advertencia con teclado, dos columnas desde `640px` y ausencia de overflow en móvil/desktop con escala ampliada.
- Verificado con `npm test` y `npm run test:browser` (incluye build): 6 pruebas unitarias y 9 browser pasan.

### File List

- `index.html`
- `src/styles.css`
- `tests/calculator.browser.spec.js`
- `_bmad-output/implementation-artifacts/1-4-entender-y-usar-resultados-cualquier-pantalla.md`

### Change Log

- 2026-07-29: Creada la Historia 1.4 con contrato visual y responsive.
- 2026-07-29: Completada la presentación de resultados, explicación y cobertura responsive; historia lista para revisión.
