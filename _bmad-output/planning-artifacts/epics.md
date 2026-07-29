---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
  - step-04-final-validation
inputDocuments:
  - prds/prd-Calculadora-2026-07-27/prd.md
  - architecture/architecture-Calculadora-2026-07-28/ARCHITECTURE-SPINE.md
  - ux-designs/ux-Calculadora-2026-07-27/DESIGN.md
  - ux-designs/ux-Calculadora-2026-07-27/EXPERIENCE.md
---

# Calculadora - Desglose de épicas

## Descripción general

Este documento proporciona el desglose completo de épicas e historias para Calculadora a partir del PRD, el contrato UX y la arquitectura aprobados.

## Inventario de requisitos

### Requisitos funcionales

- **FR-001:** Mostrar un campo identificable para ingresar el porcentaje de descuento.
- **FR-002:** Mostrar un campo identificable para ingresar el tope máximo de reintegro en pesos argentinos.
- **FR-003:** Aceptar porcentajes mayores que `0` y menores o iguales que `100`, con hasta dos decimales.
- **FR-004:** Aceptar topes positivos de hasta `999999999,99` o `999999999.99`, sin separador de miles y con hasta dos decimales; mostrarlos como máximo como `$999.999.999,99`.
- **FR-005:** Rechazar campos vacíos, negativos, cero, porcentajes mayores que `100`, topes mayores al máximo, entradas no numéricas y más de dos decimales.
- **FR-006:** Validar en cada entrada, mostrar un mensaje junto al campo inválido y ocultar resultados mientras falte un dato o exista una entrada inválida.
- **FR-006a:** Aceptar coma o punto decimal sin separadores de miles; rechazar notación científica y signos adicionales.
- **FR-007:** Calcular con precisión decimal `Monto teórico = Tope / (Porcentaje / 100)` cuando ambas entradas sean válidas.
- **FR-008:** Mostrar el monto teórico redondeado convencionalmente a dos decimales, hacia arriba cuando el tercer decimal sea `5` o mayor.
- **FR-009:** Calcular el máximo seguro truncando el valor exacto hacia abajo a dos decimales, no desde el teórico redondeado.
- **FR-010:** Hacer que el máximo seguro sea el mayor importe en centavos cuyo descuento exacto no supere el tope.
- **FR-011:** Recalcular ambos resultados al modificar cualquiera de los campos válidos.
- **FR-012:** No mostrar resultados parciales ni desactualizados cuando una entrada sea inválida o quede vacía.
- **FR-013:** Mostrar monto teórico y máximo seguro por separado y con igual peso visual.
- **FR-014:** Presentar importes como pesos argentinos con dos decimales.
- **FR-015:** Identificar cuál resultado es el máximo seguro recomendado.
- **FR-016:** Mostrar la fórmula en lenguaje comprensible.
- **FR-017:** Explicar las fracciones de centavo y el truncamiento conservador.
- **FR-018:** Mostrar el ejemplo `15%` y `$10000`, con `$66.666,67` teórico y `$66.666,66` seguro.
- **FR-019:** Mostrar una advertencia visible sobre el carácter orientativo, la interpretación del tope y la revisión de condiciones reales.
- **FR-020:** Usar jerarquía visual media, color y resultados igualmente prominentes sin depender solo del color.

### Requisitos no funcionales

- **NFR-001 (Usabilidad):** Una persona nueva completa el caso `15` y `10000` e identifica el máximo seguro en hasta `60 segundos`, sin ayuda ni navegación adicional.
- **NFR-002 (Responsive):** Implementación mobile-first plenamente funcional desde `320px`, sin desplazamiento horizontal y con equivalencia mobile/desktop; verificar al menos `320x568` y `1280x720`.
- **NFR-003 (Accesibilidad):** Etiquetas asociadas, foco visible, errores comprensibles y resultados identificables mediante texto.
- **NFR-004 (Rendimiento):** Actualización en hasta `50 ms` p95 sobre diez cambios válidos medidos con `performance.now()`, sin llamadas de red.
- **NFR-005 (Privacidad):** Cálculos solo en memoria; sin envío, cookies, almacenamiento local, sesión ni servidor.
- **NFR-006 (Compatibilidad):** Chrome 120+, Edge 120+, Firefox 120+ y Safari 17+, en desktop y mobile cuando existan; registrar versiones verificadas.
- **NFR-007 (Mantenibilidad):** Validación y cálculo en una unidad testeable sin DOM ni eventos, con pruebas unitarias.

### Requisitos adicionales de arquitectura

- **AR-001:** Inicializar con Node.js `24.18.0`, npm `11.16.0`, Vite `8.1.5`, Vitest `4.1.10` y Playwright Test `1.62.0`, sin framework UI ni dependencias runtime.
- **AR-002:** Versionar `package-lock.json`, usar `npm ci` en entrega/CI y proveer scripts `dev`, `test`, `test:browser`, `build` y `preview`.
- **AR-003:** Crear la semilla estructural fijada por la arquitectura, incluidos entradas, núcleo, shell, estilos, pruebas, fuente/licencia, configs y versionado de build.
- **AR-004:** Hacer que `index.html` cargue `/src/app.js`; `app.js` importe `styles.css`; y CSS importe la fuente local.
- **AR-005:** Aplicar núcleo funcional y shell imperativo: `calculator.js` puro; `app.js` como único propietario de eventos y mutaciones DOM.
- **AR-006:** Impedir que el núcleo use APIs de navegador, estado o efectos.
- **AR-007:** Representar porcentajes en centésimas y dinero en centavos con `BigInt`; resolver redondeo/truncamiento por cociente y residuo.
- **AR-008:** Prohibir `Number`, `parseFloat` y coerciones en aritmética de negocio.
- **AR-009:** Exponer `evaluateCalculation({ discountRaw, capRaw })` y `formatArs(cents)` como named exports.
- **AR-010:** Cumplir el contrato cerrado de éxito/error con claves `discount` y `cap`, sentinel `null` y códigos `required`, `incomplete`, `too-many-decimals`, `invalid-format`, `out-of-range`.
- **AR-011:** Implementar la gramática y precedencia exactas de entrada antes de crear `BigInt`, sin recortar whitespace y permitiendo ceros iniciales.
- **AR-012:** Mantener strings en DOM y solo `touched = { discount, cap }` en la shell; evaluar ambos campos en cada evento.
- **AR-013:** Mostrar errores solo tras interacción del campo, suprimir `incomplete` mientras conserva foco y ocultar ambos resultados ante cualquier invalidez.
- **AR-014:** Renderizar sincrónicamente sobre nodos existentes y restablecer flags al limpiar.
- **AR-015:** No usar red de datos, APIs, cookies, Web Storage, IndexedDB, analytics, servidor, variables de ambiente ni telemetría cliente.
- **AR-016:** Formatear ARS de forma pura con `$`, miles con punto y dos decimales con coma.
- **AR-017:** Publicar los IDs DOM y clases CSS definidos por la arquitectura.
- **AR-018:** Declarar viewport, `box-sizing: border-box`, custom properties y CSS mobile-first sin estilos inline ni dimensiones rígidas.
- **AR-019:** Desde `320px`, usar padding lateral `16px`, ancho fluido máximo `640px`, controles `44px+`, `min-width: 0`, tipografía de resultados fluida y wrapping seguro.
- **AR-020:** Apilar resultados por defecto y usar dos columnas iguales solo desde `640px`; prohibir `overflow-x: hidden` para enmascarar defectos.
- **AR-021:** Asociar labels/errores, usar foco visible y `hidden`, y expresar resultados/recomendación mediante texto.
- **AR-022:** Mantener `#calculator-status` persistente con `role=status`, `aria-live=polite` y `aria-atomic=true`, siguiendo el protocolo de anuncios acordado.
- **AR-023:** Conservar el orden DOM porcentaje, tope, Limpiar, teórico y seguro, sin reordenamiento CSS.
- **AR-024:** Implementar la advertencia con `details/summary` y los tres avisos de FR-019 visibles en el summary.
- **AR-025:** Configurar Vite con `base: './'` y targets Chrome/Edge/Firefox 120, Safari/iOS 17; emitir rutas relativas y runtime autocontenido.
- **AR-026:** Generar `dist/` desplegable en raíz o subruta sobre hosting estático HTTPS, sin CDN ni recursos remotos.
- **AR-027:** Preparar Playwright tras `npm ci` con los motores requeridos y hacer fallar puertas sin pruebas descubiertas.
- **AR-028:** Cubrir núcleo con Vitest e interacción/responsive con Playwright usando `calculator.browser.spec.js`.
- **AR-029:** Configurar Playwright para construir y servir preview en `127.0.0.1:4173` con puerto estricto.
- **AR-030:** Medir p95 desde entrada al listener hasta completar mutaciones DOM síncronas con nearest-rank.
- **AR-031:** Registrar evidencia separada de navegadores reales; no presentar WebKit como Safari.
- **AR-032:** Generar `dist/version.json` con `commit`, `dirty` y `sourceDigest` SHA-256 sobre los inputs fijados.
- **AR-033:** Hacer que el adaptador de hosting cubra headers, HTTPS, disponibilidad, logs sin valores y smoke de carga/cálculo.
- **AR-034:** Aplicar convenciones de nombres y sufijos `Cents`/`Hundredths`.
- **AR-035:** Incluir Nunito WOFF2 variable `400..800`, licencia OFL y `system-ui` fallback.
- **AR-036:** Resolver tokens contradictorios: `result-label` sin letter-spacing y botón Limpiar con radio `8px`.

### Requisitos de diseño UX

- **UX-DR-001:** Implementar una única página responsive sin navegación ni rutas, con flujo vertical centrado.
- **UX-DR-002:** Ordenar hero, tarjeta principal, explicación/advertencia y ejemplo normativo.
- **UX-DR-003:** Aplicar una identidad clara, moderna y cotidiana, sin tono bancario, gradientes ni decoración superflua.
- **UX-DR-004:** Implementar todos los tokens cromáticos aprobados de `DESIGN.md` como custom properties.
- **UX-DR-005:** Respetar el uso semántico de primary, surfaces, inks, success, error y borders.
- **UX-DR-006:** No depender solo de color ni usar azul decorativo, rojo aislado o grises saturados.
- **UX-DR-007:** Usar Nunito local con `system-ui` fallback y pesos `400..800`.
- **UX-DR-008:** Implementar la escala tipográfica aprobada para display, heading, body, meta, input, resultados, labels y botones.
- **UX-DR-009:** No usar cursiva ni mayúsculas sostenidas; letter-spacing solo en meta, no en result-label.
- **UX-DR-010:** Usar la escala de espaciado `4, 8, 12, 16, 24, 32, 48, 64px`.
- **UX-DR-011:** Aplicar radios `16px`, `12px` y `8px` según el contrato, sin píldoras ni contenedores circulares.
- **UX-DR-012:** Implementar tarjeta principal blanca, sombra única, padding `24px` mobile y `32px` desktop.
- **UX-DR-013:** Limitar sombras a la tarjeta principal; usar bordes/fondos para el resto.
- **UX-DR-014:** Implementar inputs full-width, `56px+`, padding `16px`, borde `2px`, radio `12px` y foco primary.
- **UX-DR-015:** Mostrar error mediante borde y texto asociado, nunca solo color.
- **UX-DR-016:** Campo porcentaje con etiqueta, placeholder, teclado decimal, validación y gramática aprobados.
- **UX-DR-017:** Campo tope con etiqueta, placeholder `Ej: 10000`, teclado decimal, validación y límite aprobados.
- **UX-DR-018:** Botón Limpiar textual, sin ícono, secundario, `44px+`, radio `8px` y sin sombra.
- **UX-DR-019:** Hover de Limpiar sutil, sin convertirlo en acción primaria.
- **UX-DR-020:** Limpiar vuelve exactamente al estado inicial sin recarga ni historial.
- **UX-DR-021:** Tarjeta teórica blanca, borde, radio `12px`, padding `24px`, sin sombra.
- **UX-DR-022:** Tarjeta segura con fondo/borde azul sutil y misma estructura, tamaño y peso visual que la teórica.
- **UX-DR-023:** Expresar la recomendación segura mediante etiqueta y texto, no solo color.
- **UX-DR-024:** Mostrar resultados solo cuando ambos campos sean válidos y ocultar ambos ante invalidez.
- **UX-DR-025:** Mantener siempre visible el bloque de fórmula con estilo aprobado.
- **UX-DR-026:** Explicar fracciones de centavo, redondeo y truncamiento conservador.
- **UX-DR-027:** Implementar `details#disclaimer > summary` textual, colapsado por defecto, sin marcador o ícono.
- **UX-DR-028:** Mantener en el summary los tres conceptos esenciales de la advertencia.
- **UX-DR-029:** Ampliar la advertencia al abrir, con español claro y texto legal breve.
- **UX-DR-030:** Mostrar permanentemente el ejemplo normativo completo como contenido estático.
- **UX-DR-031:** Estado inicial: campos vacíos, placeholders, resultados ocultos, fórmula/ejemplo visibles y advertencia cerrada.
- **UX-DR-032:** Estado escribiendo: validación en tiempo real sin error prematuro para entrada parcial.
- **UX-DR-033:** Estado válido: resultados visibles y sin errores.
- **UX-DR-034:** Estado inválido: error en campo afectado, ambos resultados ocultos y otro campo preservado.
- **UX-DR-035:** Estado inválido ambos: errores independientes y resultados ocultos.
- **UX-DR-036:** Estado limpiado idéntico al inicial.
- **UX-DR-037:** Recalcular en cada cambio, sin botón Calcular.
- **UX-DR-038:** Orden de tabulación porcentaje, tope, Limpiar y advertencia.
- **UX-DR-039:** No usar gestos, arrastre, clic secundario, animaciones ni transiciones.
- **UX-DR-040:** Abrir/cerrar advertencia por clic o teclado sobre summary textual.
- **UX-DR-041:** Asociar labels y mensajes mediante `for`/`id` y `aria-describedby`.
- **UX-DR-042:** Foco visible `2px` primary en todos los controles.
- **UX-DR-043:** Identificar resultados y recomendación mediante texto.
- **UX-DR-044:** No usar movimiento/parpadeo ni bloquear zoom.
- **UX-DR-045:** Microcopy en español neutro, claro, cotidiano y explícito.
- **UX-DR-046:** Base mobile `320..639px` con viewport real, padding `16px`, ancho fluido y cero overflow horizontal.
- **UX-DR-047:** Hero, tarjeta, fórmula, advertencia y ejemplo full-width con separación `32px` en mobile.
- **UX-DR-048:** Apilar resultados teórico y seguro, preservando igualdad de jerarquía.
- **UX-DR-049:** Apilar las tarjetas del ejemplo en el mismo orden.
- **UX-DR-050:** Hacer que Limpiar ocupe todo el ancho en mobile.
- **UX-DR-051:** Acomodar importes, errores y textos largos sin recorte, reduciendo hasta `20px` o envolviendo.
- **UX-DR-052:** Desde `640px`, columna centrada máxima `640px`, separación `48px` y padding `32px`.
- **UX-DR-053:** En desktop, resultados y ejemplo en dos columnas iguales sin cambiar el orden DOM.
- **UX-DR-054:** Alinear Limpiar a la derecha en desktop.
- **UX-DR-055:** Mantener equivalencia funcional entre mobile/desktop y touch/mouse/teclado.
- **UX-DR-056:** Garantizar objetivos táctiles de al menos `44px`.
- **UX-DR-057:** Usar mock mobile como referencia base y mock desktop como mejora; los spines prevalecen.
- **UX-DR-058:** Verificar estados relevantes en `320x568`, `375x667`, `568x320`, `768x1024` y `1280x720`.
- **UX-DR-059:** Verificar zoom/texto al `200%`, sin overflow ni pérdida funcional.
- **UX-DR-060:** Mantener compatibilidad visual/funcional en la matriz de navegadores acordada.

### Mapa de cobertura FR

| Requisito | Épica | Resultado |
| --- | --- | --- |
| FR-001..FR-006a | Épica 1 | Entradas y validación |
| FR-007..FR-012 | Épica 1 | Cálculo exacto y actualización |
| FR-013..FR-015 | Épica 1 | Presentación y recomendación |
| FR-016..FR-019 | Épica 1 | Fórmula, explicación, ejemplo y advertencia |
| FR-020 | Épica 1 | Jerarquía visual accesible |

## Lista de épicas

### Épica 1: Calcular el máximo de compra con seguridad

La persona puede ingresar una promoción, recibir resultados exactos y comprensibles, corregir errores y usar la calculadora con accesibilidad equivalente en mobile y desktop.

**FR cubiertos:** FR-001..FR-020, incluido FR-006a.

**Notas de implementación:** Dependencias en orden: 1.1 prepara la superficie y toolchain; 1.2 entrega el núcleo; 1.3 lo conecta al DOM; 1.4 completa la experiencia; 1.5 valida y entrega el MVP. Ninguna historia depende de una historia posterior.

## Épica 1: Calcular el máximo de compra con seguridad

La persona puede ingresar una promoción, recibir resultados exactos y comprensibles, corregir errores y usar la calculadora con accesibilidad equivalente en mobile y desktop.

### Historia 1.1: Base accesible de la calculadora

Como persona que evalúa una promoción,
quiero abrir una calculadora clara y accesible desde mi teléfono o escritorio,
para poder identificar los datos que debo ingresar sin depender de una interfaz rota o confusa.

**Criterios de aceptación:**

1. **Dado** un checkout limpio con Node `24.18.0` y npm `11.16.0`, **cuando** se ejecuta `npm ci` desde un `package-lock.json` versionado y `npm run dev`, **entonces** Vite `8.1.5` sirve una aplicación Vanilla sin framework UI ni dependencias runtime, con scripts `dev`, `test`, `test:browser`, `build` y `preview` definidos.
2. **Dado** la carga inicial, **cuando** la persona abre la única página, **entonces** ve hero, campos `type="text"` con `inputmode="decimal"` para “Porcentaje de descuento” y “Tope de reintegro”, botón “Limpiar”, fórmula, advertencia y ejemplo normativo de `15%` / `$10.000`.
3. **Dado** el estado inicial, **cuando** no se ingresó ningún dato, **entonces** los campos están vacíos con placeholders `Ej: 15` y `Ej: 10000`, y los resultados están ocultos.
4. **Dado** un viewport desde `320px`, **cuando** la página se renderiza, **entonces** usa viewport del dispositivo, padding lateral de `16px`, contenido fluido sin overflow horizontal y controles de al menos `44px`.
5. **Dado** navegación por teclado, **cuando** se recorren porcentaje, tope, Limpiar y advertencia, **entonces** cada control tiene foco visible, cada campo posee `label` asociada y no se bloquea el zoom.
6. **Dado** la implementación base, **cuando** se inspeccionan sus activos, **entonces** carga Nunito WOFF2 variable `400..800` local con licencia OFL y fallback `system-ui`, no hace llamadas de red de datos ni usa cookies, Web Storage, IndexedDB, analytics, telemetría o variables de ambiente; tras recargar, los campos vuelven vacíos.
7. **Dado** la estructura del proyecto, **cuando** se inspeccionan las entradas, **entonces** existen los archivos, configs, pruebas y script de versionado definidos en la semilla arquitectónica; `index.html` carga solo `src/app.js`, `app.js` importa `styles.css`, y los hooks DOM y clases CSS definidos por arquitectura existen.
8. **Dado** los estilos base, **cuando** se inspeccionan, **entonces** usan custom properties para tokens, `box-sizing: border-box` global, sin estilos inline ni dimensiones rígidas de viewport; el contenedor usa `width: 100%`, `max-width: 640px` y los elementos flex/grid admiten `min-width: 0`.

### Historia 1.2: Validar y calcular con precisión exacta

Como persona que evalúa una promoción,
quiero que la calculadora interprete mis valores y calcule ambos importes sin errores de redondeo,
para confiar en que el máximo seguro no supera el tope de reintegro.

**Criterios de aceptación:**

1. **Dado** `src/calculator.js`, **cuando** se importa desde una prueba, **entonces** expone `evaluateCalculation({ discountRaw, capRaw })` y `formatArs(cents)` como funciones puras sin DOM ni APIs de navegador.
2. **Dado** una entrada, **cuando** se evalúa, **entonces** el contrato devuelve éxito con `theoreticalCents` y `safeCents`, o error con las claves `discount` y `cap` siempre presentes y `null` como único valor sin error.
3. **Dado** entradas inválidas, **cuando** se clasifican, **entonces** solo se usan los códigos `required`, `incomplete`, `too-many-decimals`, `invalid-format` y `out-of-range`, con la precedencia acordada.
4. **Dado** valores válidos como `15,50` y `1000.50`, **cuando** se calculan, **entonces** coma y punto son equivalentes, se permiten ceros iniciales, no se recorta whitespace y se rechazan miles, signos, espacios, notación científica y valores fuera de límites del PRD.
5. **Dado** `15` y `10000`, **cuando** se evalúan, **entonces** el resultado teórico formateado es `$66.666,67` y el máximo seguro es `$66.666,66`.
6. **Dado** porcentajes mínimos, máximos, topes con centavos y fracciones de centavo, **cuando** se calculan, **entonces** usan exclusivamente `BigInt`, centésimas para porcentaje y centavos para dinero; no usan `Number`, `parseFloat` ni coerciones numéricas.
7. **Dado** la suite Vitest, **cuando** se ejecuta, **entonces** cubre ejemplo normativo, límites, decimales, entradas inválidas, redondeo y truncamiento sin importar DOM.
8. **Dado** resultados expresados en centavos, **cuando** se formatean con `formatArs`, **entonces** se muestran con `$`, miles separados por punto y exactamente dos decimales separados por coma; las variables monetarias usan el sufijo `Cents` y porcentajes el sufijo `Hundredths`.

### Historia 1.3: Actualizar la calculadora en tiempo real

Como persona que ingresa una promoción,
quiero recibir validación clara y resultados actuales al modificar los campos,
para corregir errores rápidamente y no basarme en información desactualizada.

**Criterios de aceptación:**

1. **Dado** la calculadora cargada, **cuando** escribo o modifico porcentaje o tope, **entonces** `app.js` conserva los strings solo en el DOM, mantiene únicamente `touched = { discount, cap }` como estado efímero, evalúa ambos valores con `evaluateCalculation` y actualiza el DOM sin recargar.
2. **Dado** un campo aún no interactuado, **cuando** modifico el otro, **entonces** el campo no interactuado no muestra un error prematuro.
3. **Dado** un campo tocado con valor inválido, **cuando** pierde el foco o contiene un error definitivo, **entonces** muestra un mensaje claro en español neutro, borde de error y vínculo `aria-describedby`.
4. **Dado** un valor parcial como `15,`, **cuando** el campo conserva foco, **entonces** los resultados se ocultan pero el mensaje `incomplete` no se muestra hasta perder foco.
5. **Dado** ambos valores válidos, **cuando** cambia cualquiera, **entonces** se actualizan juntos monto teórico y máximo seguro en el mismo render síncrono.
6. **Dado** cualquier campo vacío o inválido, **cuando** se renderiza el estado, **entonces** ambos resultados se ocultan mediante `hidden`; no queda ningún valor parcial o previo visible.
7. **Dado** la acción “Limpiar”, **cuando** se activa por mouse, touch o teclado, **entonces** vacía ambos campos, restablece `touched`, errores, resultados y región de estado sin recargar.
8. **Dado** un cambio de estado, **cuando** se muestran errores o resultados válidos, **entonces** `#calculator-status` anuncia solo el estado actual según el contrato accesible, sin reemplazar el subárbol ni perder foco, selección o apertura de la advertencia.

### Historia 1.4: Entender y usar los resultados en cualquier pantalla

Como persona que evalúa una promoción desde mobile o desktop,
quiero ver resultados, fórmula, advertencia y ejemplo con claridad,
para elegir un importe seguro aun en pantallas pequeñas.

**Criterios de aceptación:**

1. **Dado** ambos campos válidos, **cuando** aparecen los resultados, **entonces** se muestran dos tarjetas con la misma estructura, tipografía, tamaño numérico y prominencia: teórico primero y seguro después.
2. **Dado** el máximo seguro, **cuando** se presenta, **entonces** su tarjeta usa fondo y borde azul sutiles, además de etiqueta y texto que recomiendan usarlo para evitar superar el tope.
3. **Dado** un viewport de `320px` a `639px`, **cuando** se muestran resultados o ejemplo, **entonces** sus tarjetas se apilan en orden teórico → seguro, con contenido sin recortes ni overflow horizontal.
4. **Dado** un viewport desde `640px`, **cuando** se muestran resultados o ejemplo, **entonces** sus tarjetas pasan a dos columnas iguales, manteniendo el mismo orden DOM y visual.
5. **Dado** importes máximos, mensajes de error o escala de texto al `200%`, **cuando** se muestran, **entonces** se envuelven o reducen de manera fluida sin quedar ocultos ni introducir scroll horizontal.
6. **Dado** la página en cualquier estado, **cuando** la persona recorre el contenido, **entonces** fórmula y ejemplo normativo permanecen visibles; la explicación aclara las fracciones de centavo, el redondeo y el truncamiento conservador, y el ejemplo muestra `15%`, `$10.000`, `$66.666,67` teórico y `$66.666,66` seguro.
7. **Dado** la advertencia, **cuando** está cerrada, **entonces** usa `details#disclaimer > summary` textual sin marcador ni ícono, comunica que el resultado es orientativo, que el tope limita el descuento porcentual y que se deben revisar condiciones reales; clic o teclado la abre para mostrar la explicación ampliada.
8. **Dado** la interfaz final, **cuando** se inspeccionan estilos y contenido, **entonces** aplica tokens, tipografía, espaciado, radios y microcopy en español neutro del contrato UX, sin animaciones, transiciones, gestos, arrastre, clic secundario ni color como única señal.
9. **Dado** el layout responsive, **cuando** el viewport es mobile, **entonces** Limpiar ocupa todo el ancho; desde `640px` se alinea a la derecha, y los mockups mobile/desktop se usan como referencia subordinada a los spines UX.

### Historia 1.5: Verificar y publicar una calculadora confiable

Como persona que confía en la calculadora para decidir una compra,
quiero que funcione de forma consistente, rápida y privada en los navegadores comprometidos,
para usarla con seguridad desde cualquier dispositivo compatible.

**Criterios de aceptación:**

1. **Dado** una máquina limpia, **cuando** se prepara el proyecto, **entonces** `npm ci` y `npx playwright install --with-deps chromium firefox webkit` completan antes de ejecutar las puertas de calidad, usando las versiones fijadas de Vitest `4.1.10` y Playwright `1.62.0`.
2. **Dado** las pruebas unitarias y browser, **cuando** se ejecutan `npm test` y `npm run test:browser`, **entonces** ambas suites descubren al menos una prueba y cubren cálculo, interacción, foco, Limpiar, advertencia, estados inicial/válido/inválido y layouts responsive.
3. **Dado** los viewports `320x568`, `375x667`, `568x320`, `768x1024` y `1280x720`, **cuando** corren las pruebas browser sobre estados inicial, válido, inválido, advertencia expandida y ejemplo, **entonces** se verifica `scrollWidth <= clientWidth`, operabilidad de controles, orden y visibilidad de resultados, incluyendo valores máximos y escala de texto al `200%`.
4. **Dado** un cambio válido, **cuando** se mide desde la entrada al listener hasta completar las mutaciones DOM síncronas, **entonces** el p95 nearest-rank de diez muestras es menor o igual a `50 ms`.
5. **Dado** `npm run build`, **cuando** genera `dist/`, **entonces** Vite aplica `base: './'` y targets `chrome120`, `edge120`, `firefox120`, `safari17` e `ios17`; produce un sitio autocontenido con fuentes locales, sin recursos remotos y `version.json` con `commit`, `dirty` y `sourceDigest` SHA-256 de los inputs definidos.
6. **Dado** el artefacto `dist/`, **cuando** `test:browser` lo sirve, **entonces** usa `npm run preview -- --host 127.0.0.1 --port 4173 --strictPort` y Playwright apunta a `http://127.0.0.1:4173`; una fixture de servidor estático monta el mismo `dist/` en `/calculadora/` y verifica carga y cálculo también en esa subruta.
7. **Dado** valores ingresados durante pruebas browser, **cuando** se inspeccionan red y almacenamiento antes y después de recargar, **entonces** no se envían valores ni se escriben cookies, Web Storage o IndexedDB, y la recarga elimina los datos.
8. **Dado** la certificación de compatibilidad, **cuando** se complete el informe, **entonces** registra producto, versión, sistema operativo, viewport y resultado para Chrome, Edge, Firefox y Safari comprometidos, con evidencia separada de sus variantes desktop y mobile cuando existan; si no hay dispositivos o servicio de navegadores reales disponible, el informe identifica esa limitación y el responsable de seleccionar el servicio antes de certificar NFR-006. WebKit no se presenta como Safari.
9. **Dado** el contrato de despliegue, **cuando** se prepara `dist/` para un hosting aún no elegido, **entonces** documenta los headers requeridos para HTTPS, `index.html` sin cache durable, assets hashados inmutables, logs sin valores de formulario y rollback por `sourceDigest`; el adaptador específico queda pendiente de la selección del proveedor.
10. **Dado** una persona que no utilizó la página antes, **cuando** recibe el caso `15` y `10000` sin ayuda ni navegación adicional, **entonces** completa el cálculo e identifica el máximo seguro en un máximo de `60 segundos`; el resultado de la prueba manual queda registrado.
