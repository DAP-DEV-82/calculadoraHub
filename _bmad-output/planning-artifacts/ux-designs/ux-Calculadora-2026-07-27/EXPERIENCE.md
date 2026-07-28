---
title: "EXPERIENCE - Calculadora de Tope de Reintegro"
status: final
created: 2026-07-27
updated: 2026-07-27
sources:
  - ../prds/prd-Calculadora-2026-07-27/prd.md
---

# Calculadora de Tope de Reintegro — Experience Spine

## Foundation

Single-surface responsive web. Sin sistema UI externo — la identidad visual se define en `DESIGN.md`, que es la referencia de apariencia. Este spine describe el comportamiento, la arquitectura de información y la experiencia.

Desktop-first con adaptación mobile (viewport < 640px). Una sola tarea por página: calcular el importe de compra máximo conveniente para una promoción con descuento porcentual y tope de reintegro. Sin persistencia, backend, cuentas ni integraciones.

## Information Architecture

| Superficie | Cómo se llega | Propósito |
|---|---|---|
| Calculadora | Carga inicial | Ingresar porcentaje y tope, ver resultados, consultar fórmula |

No hay navegación, rutas ni vistas secundarias. La página es un flujo vertical único sobre una columna centrada.

Orden vertical (de arriba hacia abajo):
1. Hero: título + subtítulo breve.
2. Tarjeta principal: campos de entrada + botón Limpiar + resultados lado a lado.
3. Bloque de explicación: fórmula visible + advertencia colapsable.
4. Ejemplo normativo: `15%` descuento, `$1000` tope → `$6666,67` teórico / `$6666,66` seguro.

→ Composition reference: `mockups/calculator-desktop.html`. Spine wins on conflict.

## Voice and Tone

Microcopy en español neutro, claro y cotidiano. Sin voseo, sin tecnicismos innecesarios, sin tono bancario.

| Hacer | No hacer |
|---|---|
| "Calcula cuánto gastar para aprovechar el descuento" | "Optimice su beneficio promocional" |
| "Porcentaje de descuento" | "% Dto." |
| "Tope de reintegro" | "Límite máximo de reembolso" |
| "Monto teórico de compra" | "Resultado matemático estimado" |
| "Máximo seguro de compra" | "Cota prudencial" |
| "Usa este valor si querés evitar pasarte del tope" (neutro) | Indicación sin contexto |
| "El resultado es orientativo. Revisa siempre las condiciones de la promoción." | Términos legales extensos |
| "La diferencia se debe a que el monto teórico puede contener fracciones de centavo, mientras que el máximo seguro se trunca a dos decimales." | Explicación técnica sin contexto |

Los placeholders de los campos:
- Porcentaje: `Ej: 15`
- Tope: `Ej: 1000`

El botón "Limpiar" solo muestra esa palabra. Sin ícono.

## Component Patterns

Comportamiento. Las especificaciones visuales están en `DESIGN.md.Components`.

| Componente | Uso | Reglas de comportamiento |
|---|---|---|
| Campo de porcentaje | Tarjeta principal | Input numérico. Acepta coma o punto como separador decimal (`15,50` y `15.50` son equivalentes). No acepta separadores de miles, notación científica ni signos. Validación en cada cambio. Placeholder visible. |
| Campo de tope | Tarjeta principal | Input numérico. Acepta coma o punto como separador decimal. No acepta separadores de miles, notación científica ni signos. Límite superior: `999999999,99` (o `999999999.99`). Validación en cada cambio. Placeholder visible. |
| Botón Limpiar | Tarjeta principal, debajo de campos | Borra ambos campos, oculta resultados, resetea placeholders. No recarga la página. |
| Resultado teórico | Tarjeta principal, lado izquierdo | Visible solo cuando ambos campos son válidos. Muestra etiqueta + valor numérico con redondeo convencional a dos decimales (hacia arriba si el tercer decimal ≥ 5). Formato: pesos argentinos con separador de miles (punto) y decimal (coma), ej: `$6.666,67`. |
| Resultado seguro | Tarjeta principal, lado derecho | Misma condición. Misma estructura. Se calcula truncando hacia abajo el valor exacto a dos decimales, no a partir del valor ya redondeado del monto teórico. Es la política prudente del producto y no simula reglas de cada promoción. Formato monetario idéntico. |
| Bloque de fórmula | Debajo de tarjeta principal | Siempre visible. Formato código. Sin interacción. |
| Advertencia colapsable | Debajo de la fórmula | Colapsada por defecto. Toggle de texto. Al expandir, muestra el texto de advertencia. Cumple FR-019: la advertencia está presente y accesible sin navegación adicional. |
| Ejemplo normativo | Debajo de advertencia | Texto estático. Sin interacción. |

## State Patterns

| Estado | Superficie | Comportamiento |
|---|---|---|
| Inicial (carga) | Página completa | Campos vacíos. Placeholders visibles. Sin resultados. Bloque de fórmula visible. Advertencia colapsada. Ejemplo visible. |
| Escribiendo | Campo activo | Validación en tiempo real. Sin mensaje de error mientras el valor es parcial pero no inválido definitivo. |
| Válido | Campos + resultados | Ambos campos tienen valores válidos. Resultados visibles. Sin mensajes de error. |
| Inválido | Campo afectado | Borde de error. Mensaje debajo del campo. Resultados ocultos. El otro campo conserva su valor y no muestra error. |
| Inválido ambos | Ambos campos | Cada campo muestra su propio error. Resultados ocultos. |
| Limpiado | Página completa | Vuelve al estado inicial exacto. Sin historial de valores previos. |
| Error de redondeo extremo | Resultados | No aplica: el cálculo es local y no produce errores de redondeo que impidan mostrar un valor. |

## Interaction Primitives

- Escritura en campo → validación y recálculo en cada cambio (tiempo real).
- Sin botón "Calcular". Los resultados existen o no según validez.
- Focus: siguiente campo con Tab. El botón Limpiar está en el orden de tabulación después del campo de tope.
- Sin gestos táctiles, sin arrastre, sin clic secundario.
- Sin animaciones. Los resultados aparecen y desaparecen sin transición.
- La advertencia colapsable se abre/cierra con clic en el texto toggle. Sin ícono.

## Accessibility Floor

Comportamiento. El contraste visual está definido en `DESIGN.md`.

- Cada campo tiene una etiqueta visible (`<label>`) asociada mediante `for`/`id`.
- Los mensajes de error están vinculados al campo mediante `aria-describedby`.
- El foco de teclado es visible en todos los elementos interactivos (borde `primary` de 2px).
- Los dos resultados se identifican por texto (etiqueta), no solo por color de fondo o borde.
- El botón Limpiar tiene texto descriptivo (`Limpiar`).
- La advertencia colapsable es un `<button>` o `<summary>` navegable por teclado.
- Sin movimiento, sin parpadeo, sin contenido que cambie sin interacción del usuario.
- Sin bloqueo de zoom (`user-scalable=no` no debe usarse).

## Key Flows

### Flow 1 — Cálculo básico exitoso (Lucía, después del almuerzo, revisando promociones de su tarjeta)

1. Lucía abre la página desde el celular.
2. Ve el título, los campos vacíos y el ejemplo abajo.
3. Escribe `15` en "Porcentaje de descuento".
4. Escribe `1000` en "Tope de reintegro".
5. **Clímax:** Al terminar de escribir el segundo valor, aparecen las dos tarjetas de resultado lado a lado (en desktop) o apiladas (en mobile): `$6666,67` (teórico) y `$6666,66` (seguro). La tarjeta segura tiene un borde azul y fondo sutil.
6. Lucía lee la etiqueta del resultado seguro: "Máximo seguro de compra — usa este valor para no pasarte del tope."
7. Confirma con el ejemplo visible abajo.

Escenario de error: Lucía escribe `-5` como porcentaje → aparece "El porcentaje debe ser mayor que 0" debajo del campo. Los resultados se ocultan. Corrige a `15` y los resultados vuelven.

### Flow 2 — Consulta de referencia (Lucía, después de obtener resultados, quiere entender la fórmula)

1. Lucía tiene los resultados visibles.
2. Desplaza hacia abajo y ve el bloque de fórmula.
3. Lee: `Monto teórico = Tope / (Porcentaje / 100)`.
4. Ve la explicación: "El monto teórico puede contener fracciones de centavo. El máximo seguro se trunca a dos decimales para que el descuento calculado no supere el tope."
5. Abre la advertencia colapsable y lee que el resultado es orientativo.
6. **Clímax:** Comprende que el máximo seguro es el valor prudente y cierra la página con la información que necesitaba.

### Flow 3 — Limpiar y empezar de nuevo

1. Lucía tiene resultados de `15%` y `1000`.
2. Quiere probar con otro descuento. Hace clic en "Limpiar".
3. Ambos campos se vacían, los resultados desaparecen.
4. Los placeholders vuelven a verse.
5. **Clímax:** La página está exactamente como al inicio, sin rastro del cálculo anterior.

## Responsive & Platform

Desktop-first. La referencia de composición es `mockups/calculator-desktop.html`.

**Desktop (≥ 640px):**
- Ancho máximo de `640px`, centrado.
- Resultados lado a lado (dos tarjetas del mismo ancho).
- Botón Limpiar a la derecha debajo de los campos.

**Mobile (< 640px):**
- Márgenes laterales mínimos de `16px`.
- Resultados apilados verticalmente (el seguro debajo del teórico).
- Botón Limpiar a ancho completo o alineado a la derecha según espacio disponible.
- El bloque de fórmula y advertencia ocupan todo el ancho disponible.
- Sin desplazamiento horizontal en `320x568`.

Viewports verificados: `320x568` y `1280x720`. En ambos, sin desplazamiento horizontal y sin pérdida de información.

No hay variantes por plataforma (iOS/Android/Web). El comportamiento es idéntico en todos los navegadores compatibles (Chrome 120+, Edge 120+, Firefox 120+, Safari 17+).

## Inspiration & Anti-patterns

- **Lifted from calculadoras simples:** campos visibles, sin botón de calcular, actualización inmediata. La calculadora de propinas de una app de restaurante fue la inspiración funcional: dos inputs, dos resultados, sin fricción.
- **Lifted from páginas de producto:** tarjetas lado a lado para comparar opciones. No una tabla ni un solo número.
- **Rechazado — Diseño bancario:** columnas estrechas, azul oscuro corporativo, etiquetas genéricas como "Resultado". Se reemplazó por azul suave, tipografía redondeada y etiquetas explicativas.
- **Rechazado — Formulario con botón "Calcular":** agregar un botón de acción principal interrumpe el flujo de escritura y sugiere que el cálculo requiere envío. Se eliminó completamente.
- **Rechazado — Animaciones de transición:** para una herramienta de una tarea, los resultados deben aparecer sin demora ni distracción.
- **Rechazado — Íconos en tarjetas de resultado:** un ícono de moneda o check compite con el número grande y no agrega información.
