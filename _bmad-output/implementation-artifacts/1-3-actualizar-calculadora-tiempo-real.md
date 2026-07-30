---
baseline_commit: 0ab377c5498630c0b4a60fa3d9f3d26def9df5f4
---

# Historia 1.3: Actualizar la calculadora en tiempo real

Status: review

## Historia

Como persona que ingresa una promoción,
quiero recibir validación clara y resultados actuales al modificar los campos,
para corregir errores rápidamente y no basarme en información desactualizada.

## Criterios de aceptación

1. `app.js` conserva strings solo en el DOM, mantiene únicamente `touched = { discount, cap }`, evalúa ambos valores y actualiza sin recarga.
2. Un campo no interactuado no muestra error al modificar el otro.
3. Un campo tocado con error definitivo muestra mensaje claro, borde de error y enlace accesible.
4. Un valor incompleto como `15,` conserva resultados ocultos y no muestra su mensaje mientras tiene foco; lo muestra al perderlo.
5. Dos valores válidos actualizan ambos resultados en el mismo render síncrono.
6. Cualquier entrada inválida o vacía oculta ambos resultados mediante `hidden`.
7. Limpiar vacía campos, restablece `touched`, errores, resultados y estado, sin recarga.
8. `#calculator-status` anuncia solo errores visibles o ambos resultados válidos, sin reemplazar nodos ni perder foco, selección o apertura de la advertencia.

## Tareas / Subtareas

- [x] Tarea 1: Especificar interacción de la shell con Playwright (AC: 1-8)
  - [x] Cubrir estado válido, error progresivo, entrada incompleta, ocultación y Limpiar.
- [x] Tarea 2: Conectar el núcleo y renderizar estados accesibles (AC: 1-6, 8)
  - [x] Mantener el estado mínimo `touched` y leer valores únicamente desde los inputs.
  - [x] Traducir errores del dominio a español neutro y actualizar nodos existentes.
  - [x] Mostrar resultados y región de estado solo para estados visibles.
- [x] Tarea 3: Completar Limpiar y estilo de error (AC: 3, 7)
  - [x] Restablecer campos y render sin recargar ni mover el foco.
  - [x] Aplicar borde de error mediante atributo accesible, además del texto asociado.
- [x] Tarea 4: Ejecutar regresiones (AC: 1-8)
  - [x] Ejecutar Vitest, build y Playwright.

## Dev Notes

- Solo `src/app.js`, `src/styles.css` y `tests/calculator.browser.spec.js` pertenecen a esta historia. No modificar `src/calculator.js` ni el HTML existente.
- Importar los named exports de `calculator.js`. La shell no duplica validación, cálculo ni formateo.
- En `input`, marcar solo su campo como tocado y evaluar ambos strings. En `blur`, marcar ese campo y volver a renderizar.
- Mostrar un error si el campo fue tocado, salvo `incomplete` mientras ese input conserva foco. Todo error oculto también se omite de `#calculator-status`.
- Usar `hidden` para resultados y mensajes. Mantener `#calculator-status` y los resultados existentes, actualizando texto/atributos sin sustituir subárboles.
- Microcopy visible en español neutro; `aria-invalid` y texto asociado complementan el borde rojo.
- Limpiar no llama `focus`, no altera `#disclaimer` y conserva el orden DOM.

### Referencias

- [Fuente: `_bmad-output/planning-artifacts/epics.md#Historia-1.3-Actualizar-la-calculadora-en-tiempo-real`]
- [Fuente: `_bmad-output/planning-artifacts/architecture/architecture-Calculadora-2026-07-28/ARCHITECTURE-SPINE.md#AD-5---Estado-efímero-y-render-atómico`]
- [Fuente: `_bmad-output/planning-artifacts/architecture/architecture-Calculadora-2026-07-28/ARCHITECTURE-SPINE.md#AD-7---Semántica-accesible-en-todos-los-estados`]
- [Fuente: `_bmad-output/planning-artifacts/ux-designs/ux-Calculadora-2026-07-27/EXPERIENCE.md#State-Patterns]

## Dev Agent Record

### Agent Model Used

openai/gpt-5.6-terra

### Debug Log References

### Completion Notes List

- Implementada la shell imperativa en `app.js`: los inputs mantienen sus strings y el único estado propio es `touched`.
- Cada cambio y pérdida de foco evalúa ambos valores, muestra solo errores visibles y actualiza resultados o los oculta atómicamente.
- La región `#calculator-status` anuncia errores visibles o ambos importes válidos; los nodos interactivos y la advertencia se preservan.
- Limpiar restablece valores, flags, mensajes, resultados y estado sin recargar ni mover foco.
- Añadidas pruebas Playwright para cálculo actualizado, errores progresivos, entrada incompleta, resultados obsoletos, advertencia abierta y Limpiar.
- Verificado con `npm test` y `npm run test:browser` (incluye build): 6 pruebas unitarias y 6 browser pasan.

### File List

- `src/app.js`
- `src/styles.css`
- `tests/calculator.browser.spec.js`
- `_bmad-output/implementation-artifacts/1-3-actualizar-calculadora-tiempo-real.md`

### Change Log

- 2026-07-29: Creada la Historia 1.3 con contrato de integración de la shell.
- 2026-07-29: Implementada actualización en tiempo real, validación accesible y Limpiar; historia lista para revisión.
