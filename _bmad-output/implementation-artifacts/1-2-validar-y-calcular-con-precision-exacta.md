---
baseline_commit: fa5ee307b1f180f8ede03ec54a751553d08ab92b
---

# Historia 1.2: Validar y calcular con precisión exacta

Status: review

## Historia

Como persona que evalúa una promoción,
quiero que la calculadora interprete mis valores y calcule ambos importes sin errores de redondeo,
para confiar en que el máximo seguro no supera el tope de reintegro.

## Criterios de aceptación

1. `src/calculator.js` exporta `evaluateCalculation({ discountRaw, capRaw })` y `formatArs(cents)` como funciones puras sin DOM ni APIs de navegador.
2. La evaluación devuelve `{ ok: true, result: { theoreticalCents, safeCents } }` o `{ ok: false, errors: { discount, cap } }`; ambas claves de error siempre existen y `null` es el único sentinel sin error.
3. Los únicos errores son `required`, `incomplete`, `too-many-decimals`, `invalid-format` y `out-of-range`, en la precedencia acordada.
4. Coma y punto decimal son equivalentes; se aceptan ceros iniciales y se rechazan whitespace, miles, signos, notación científica y valores fuera de rango.
5. `15` y `10000` producen `$66.666,67` teórico y `$66.666,66` seguro.
6. Porcentajes, topes y resultados usan exclusivamente `BigInt`: porcentaje en centésimas y dinero en centavos; no se usa `Number`, `parseFloat` ni coerción numérica de negocio.
7. Vitest cubre ejemplo normativo, límites, decimales, entradas inválidas, redondeo y truncamiento sin DOM.
8. `formatArs` devuelve `$`, miles separados por punto y exactamente dos decimales separados por coma; dinero usa sufijo `Cents` y porcentaje `Hundredths`.

## Tareas / Subtareas

- [x] Tarea 1: Especificar el contrato del núcleo con Vitest (AC: 1-8)
  - [x] Reemplazar la prueba provisional por casos del contrato, gramática, rangos, redondeo, truncamiento y formateo.
- [x] Tarea 2: Implementar validación y cálculo puro (AC: 1-6)
  - [x] Clasificar la entrada por la gramática y precedencia acordadas antes de crear `BigInt`.
  - [x] Convertir a centésimas/centavos y calcular teórico y seguro con cociente y residuo.
  - [x] Implementar el formateador ARS sin APIs de navegador.
- [x] Tarea 3: Verificar el núcleo y las regresiones (AC: 1-8)
  - [x] Ejecutar Vitest, build y pruebas browser existentes.

## Dev Notes

- Modificar exclusivamente `src/calculator.js` y `tests/calculator.test.js`; no conectar eventos ni mutar el DOM, que pertenece a Historia 1.3.
- Clasificar sin `trim`: `''` → `required`; `^\d+[.,]$` → `incomplete`; `^\d+[.,]\d{3,}$` → `too-many-decimals`; `^\d+(?:[.,]\d{1,2})?$` → candidato válido; el resto → `invalid-format`.
- Después de la gramática, porcentaje debe estar entre `1n` y `10000n` centésimas; tope entre `1n` y `99999999999n` centavos.
- Para valores válidos, `numeratorCents = capCents * 10000n` y `discountHundredths` es el denominador. `safeCents` es el cociente; `theoreticalCents` incrementa el cociente si el doble del residuo es al menos el denominador.
- La Historia 1.1 dejó el shell, las dependencias y una prueba temporal que exige exports vacíos; esta historia debe sustituirla, manteniendo la prueba libre de DOM.
- La prueba browser no debe cambiar: aún valida solamente el shell inicial.

### Referencias

- [Fuente: `_bmad-output/planning-artifacts/epics.md#Historia-1.2-Validar-y-calcular-con-precisión-exacta`]
- [Fuente: `_bmad-output/planning-artifacts/architecture/architecture-Calculadora-2026-07-28/ARCHITECTURE-SPINE.md#AD-2---Aritmética-decimal-exacta`]
- [Fuente: `_bmad-output/planning-artifacts/architecture/architecture-Calculadora-2026-07-28/ARCHITECTURE-SPINE.md#AD-3---Contrato-único-de-evaluación`]
- [Fuente: `_bmad-output/planning-artifacts/architecture/architecture-Calculadora-2026-07-28/ARCHITECTURE-SPINE.md#AD-4---Gramática-de-entrada-antes-de-conversión`]

## Dev Agent Record

### Agent Model Used

openai/gpt-5.6-terra

### Debug Log References

- `npm test` pasó antes de reemplazar la prueba provisional.

### Completion Notes List

- Implementados `evaluateCalculation` y `formatArs` como exports puros, con validación de gramática previa a `BigInt` y contrato de errores completo.
- El cálculo usa centésimas/centavos `BigInt`; el teórico redondea por residuo y el seguro trunca desde el valor exacto.
- Reemplazada la prueba temporal por seis casos Vitest que cubren contrato, entrada, límites, redondeo, truncamiento y formato.
- Verificado con `npm test` y `npm run test:browser`; este último incluye el build de producción y tres pruebas Playwright.

### File List

- `src/calculator.js`
- `tests/calculator.test.js`
- `_bmad-output/implementation-artifacts/1-2-validar-y-calcular-con-precision-exacta.md`

### Change Log

- 2026-07-29: Creada la Historia 1.2 con contexto de implementación y pruebas.
- 2026-07-29: Implementada la validación, cálculo exacto y formateo ARS; historia lista para revisión.
