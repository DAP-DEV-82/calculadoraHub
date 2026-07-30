---
baseline_commit: c8fce1a00c85cde8d821f4f228e49d8021eec07d
---

# Historia 1.5: Verificar y publicar una calculadora confiable

Status: in-progress

## Historia

Como persona que confía en la calculadora para decidir una compra,
quiero que funcione de forma consistente, rápida y privada en los navegadores comprometidos,
para usarla con seguridad desde cualquier dispositivo compatible.

## Criterios de aceptación

1. Una preparación limpia usa `npm ci` y Playwright `1.62.0` con motores Chromium, Firefox y WebKit antes de las puertas.
2. `npm test` y `npm run test:browser` descubren pruebas y cubren cálculo, interacción, foco, Limpiar, advertencia, estados y responsive.
3. Los viewports `320x568`, `375x667`, `568x320`, `768x1024` y `1280x720` cubren estados inicial, válido, inválido, advertencia y ejemplo sin overflow, incluso al `200%`.
4. El p95 nearest-rank de diez cambios válidos desde el listener hasta el DOM es `<= 50 ms`.
5. El build es autocontenido, usa rutas relativas y produce `version.json` con `commit`, `dirty` y digest SHA-256.
6. Playwright sirve preview en `127.0.0.1:4173` y un servidor estático monta el mismo `dist/` en `/calculadora/`.
7. Las pruebas verifican ausencia de envío de valores, cookies, Web Storage e IndexedDB antes/después de recargar.
8. Existe informe de compatibilidad; sin navegadores/dispositivos reales, declara limitación, responsable y no presenta WebKit como Safari.
9. Existe contrato de despliegue con HTTPS, cache, headers, logs sin valores y rollback por digest.
10. Existe protocolo y registro de la prueba manual de 60 segundos; su resultado requiere una persona nueva.

## Tareas / Subtareas

- [x] Tarea 1: Extender las puertas browser y de artefacto (AC: 2-7)
  - [x] Cubrir matriz responsive, estados, p95, privacidad, `version.json` y subruta estática.
  - [x] Montar `dist/` en `/calculadora/` durante Playwright.
- [x] Tarea 2: Documentar compatibilidad y despliegue (AC: 8-9)
  - [x] Registrar evidencia disponible, limitaciones y responsable de certificación.
  - [x] Documentar requisitos de hosting, cache, headers y rollback.
- [ ] Tarea 3: Preparar la prueba manual de usabilidad (AC: 10)
  - [x] Registrar protocolo, criterio de éxito y resultado pendiente de una persona nueva.
  - [ ] Ejecutar el protocolo con una persona nueva y registrar duración y resultado.
- [x] Tarea 4: Ejecutar puertas automatizables y registrar resultados (AC: 1-7)
  - [x] Ejecutar `npm ci`, instalar los motores disponibles, Vitest, build y Playwright.
  - [x] Ejecutar `npx playwright install --with-deps chromium firefox webkit` en un entorno con privilegios para instalar dependencias de sistema.

## Dev Notes

- Mantener `npm run test:browser` como `build` seguido de Playwright y preview en `127.0.0.1:4173` con puerto estricto.
- El servidor de subruta solo sirve el `dist/` existente bajo `/calculadora/`; no recibe ni registra valores de formulario.
- El p95 debe usar `ceil(0.95 * n) - 1` sobre diez muestras tomadas alrededor del `input` dispatch síncrono.
- Privacidad se prueba sobre el navegador: valores no aparecen en requests y cookies, `localStorage`, `sessionStorage` e IndexedDB quedan vacíos tras recarga.
- No afirmar compatibilidad real de Chrome, Edge, Firefox o Safari sin evidencia separada. WebKit no equivale a Safari.
- No marcar la tarea manual completa hasta que una persona nueva ejecute el caso sin ayuda.

### Referencias

- [Fuente: `_bmad-output/planning-artifacts/epics.md#Historia-1.5-Verificar-y-publicar-una-calculadora-confiable`]
- [Fuente: `_bmad-output/planning-artifacts/architecture/architecture-Calculadora-2026-07-28/ARCHITECTURE-SPINE.md#AD-8---Runtime-autocontenido-y-despliegue-estático`]
- [Fuente: `_bmad-output/planning-artifacts/architecture/architecture-Calculadora-2026-07-28/ARCHITECTURE-SPINE.md#AD-9---Puertas-de-compatibilidad-y-calidad`]

## Dev Agent Record

### Agent Model Used

openai/gpt-5.6-terra

### Debug Log References

- `npm ci`: completó sin vulnerabilidades (2026-07-29).
- `npx playwright install --with-deps chromium firefox webkit`: bloqueado porque el entorno requiere contraseña `sudo` no interactiva.
- Reintento de `npx playwright install --with-deps chromium firefox webkit` tras confirmación de instalación manual: el wrapper sigue solicitando una terminal para `sudo`; no puede validar dependencias desde esta sesión.
- Vato confirmó la ejecución con `sudo`; el lanzamiento posterior desde esta sesión confirmó Chromium `151.0.7922.34`, Firefox `153.0` y WebKit `26.5`.
- `npx playwright install chromium firefox webkit`: completó; Chromium bundled `151.0.7922.34`, Firefox `153.0` y WebKit `26.5` descargados.
### Completion Notes List

- Añadidas 8 pruebas Playwright de calidad: cinco viewports, estados, texto al 200%, p95 nearest-rank, privacidad, `version.json` y subruta `/calculadora/`.
- Añadido servidor estático de prueba que monta exclusivamente `dist/` bajo `/calculadora/`, sin registrar solicitudes ni valores.
- Documentados el contrato de despliegue, informe de compatibilidad y protocolo de usabilidad.
- `npm test` pasa con 6 pruebas; `npm run test:browser` construye y pasa 17 pruebas Chromium.
- Tras la instalación manual con `sudo`, Chromium, Firefox y WebKit lanzan correctamente; `npm test` pasa con 6 pruebas y `npm run test:browser` construye y pasa 17 pruebas Chromium.
- Pendiente: certificación en navegadores/dispositivos reales y ejecución de la prueba manual con persona nueva.

### File List

- `playwright.config.js`
- `tests/quality.browser.spec.js`
- `tests/static-server.js`
- `docs/compatibility-report.md`
- `docs/deployment-contract.md`
- `docs/manual-usability-test.md`
- `_bmad-output/implementation-artifacts/1-5-verificar-y-publicar-calculadora-confiable.md`

### Change Log

- 2026-07-29: Creada la Historia 1.5 con puertas de calidad, entrega y evidencia.
- 2026-07-29: Implementadas puertas y documentación automatizables; pendientes evidencias de sistema, navegadores reales y prueba manual.
