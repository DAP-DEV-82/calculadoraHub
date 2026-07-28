---
title: "DESIGN - Calculadora de Tope de Reintegro"
status: final
created: 2026-07-27
updated: 2026-07-27
sources:
  - ../prds/prd-Calculadora-2026-07-27/prd.md
colors:
  primary: '#3B82F6'
  primary-light: '#93C5FD'
  primary-subtle: '#EFF6FF'
  surface-base: '#FAFAFA'
  surface-raised: '#FFFFFF'
  ink-primary: '#1E293B'
  ink-secondary: '#64748B'
  ink-muted: '#94A3B8'
  success: '#10B981'
  success-subtle: '#D1FAE5'
  error: '#EF4444'
  error-subtle: '#FEE2E2'
  border: '#E2E8F0'
  border-raised: '#CBD5E1'
typography:
  display:
    fontFamily: 'Nunito, system-ui, sans-serif'
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.25'
  heading:
    fontFamily: 'Nunito, system-ui, sans-serif'
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.3'
  body:
    fontFamily: 'Nunito, system-ui, sans-serif'
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: 'Nunito, system-ui, sans-serif'
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.4'
  meta:
    fontFamily: 'Nunito, system-ui, sans-serif'
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: '0.01em'
  input:
    fontFamily: 'Nunito, system-ui, sans-serif'
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.3'
  result:
    fontFamily: 'Nunito, system-ui, sans-serif'
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.15'
  result-label:
    fontFamily: 'Nunito, system-ui, sans-serif'
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: '0.02em'
  button:
    fontFamily: 'Nunito, system-ui, sans-serif'
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.3'
rounded:
  full: 16px
  md: 12px
  sm: 8px
spacing:
  '1': 4px
  '2': 8px
  '3': 12px
  '4': 16px
  '5': 24px
  '6': 32px
  '7': 48px
  '8': 64px
components:
  card-main:
    background: '{colors.surface-raised}'
    radius: '{rounded.full}'
    shadow: '0 4px 24px rgba(0, 0, 0, 0.06)'
    padding: '{spacing.6}'
  card-result:
    background: '{colors.surface-raised}'
    radius: '{rounded.md}'
    border: 1px solid '{colors.border}'
    padding: '{spacing.5}'
  card-result-safe:
    background: '{colors.primary-subtle}'
    radius: '{rounded.md}'
    border: 2px solid '{colors.primary-light}'
    padding: '{spacing.5}'
  input-field:
    background: '{colors.surface-base}'
    radius: '{rounded.md}'
    border: 2px solid '{colors.border}'
    border-focus: 2px solid '{colors.primary}'
    padding: '{spacing.4}'
  button-secondary:
    background: '{colors.surface-base}'
    radius: '{rounded.md}'
    border: 1px solid '{colors.border}'
    foreground: '{colors.ink-secondary}'
    padding: '{spacing.3} {spacing.5}'
---

## Brand & Style

La Calculadora de Tope de Reintegro es una herramienta digital liviana para una sola tarea: calcular el importe de compra que maximiza un descuento con tope. Su identidad visual rechaza el tono bancario y el exceso técnico. Se presenta como una herramienta clara, moderna y cotidiana — una página que inspira confianza sin sentirse institucional.

La paleta es simple: azul suave como color de confianza, fondos limpios y tipografía redondeada. No hay gradientes, decoración ni elementos superfluos. Cada componente existe porque cumple una función.

## Colors

El azul suave (`#3B82F6`) es el color principal de la marca. Se usa en el borde de foco de los campos, en la tarjeta del resultado recomendado y en elementos interactivos. No debe usarse como fondo general ni para decoración.

- **Primary (`#3B82F6`):** bordes de foco, tarjeta del máximo seguro, hover del botón secundario.
- **Primary light (`#93C5FD`):** borde de la tarjeta del resultado seguro.
- **Primary subtle (`#EFF6FF`):** fondo de la tarjeta del resultado seguro.
- **Surface base (`#FAFAFA`):** fondo general de página.
- **Surface raised (`#FFFFFF`):** tarjeta principal, tarjetas de resultado.
- **Ink primary (`#1E293B`):** títulos, etiquetas, valores de resultado.
- **Ink secondary (`#64748B`):** explicaciones, pies de resultado, placeholders.
- **Ink muted (`#94A3B8`):** texto colapsable, notas secundarias.
- **Success (`#10B981`):** indicadores de estado válido.
- **Error (`#EF4444`):** mensajes de validación y bordes de error.
- **Border (`#E2E8F0`):** divisor de tarjetas, borde por defecto de campos.
- **Border raised (`#CBD5E1`):** borde sutil de tarjeta principal.

Evitar: rojo como único indicador de error (debe acompañarse de texto), fondos azules sólidos, grises saturados y cualquier uso decorativo del color principal.

## Typography

Nunito es la familia tipográfica única: sans redondeada que aporta calidez sin perder legibilidad. Se usa en todos los pesos y tamaños del sistema.

- **Display (28px bold):** título principal del hero.
- **Heading (20px semibold):** encabezados de sección y etiquetas de resultados.
- **Body (16px regular):** texto general, explicaciones y cuerpo de advertencia.
- **Body sm (14px regular):** notas secundarias, ejemplo, pie de resultados.
- **Meta (12px medium):** texto de advertencia colapsable, información auxiliar.
- **Input (20px semibold):** texto dentro de los campos de entrada.
- **Result (32px extrabold):** valor numérico de cada resultado.
- **Result label (14px semibold):** etiqueta sobre cada resultado.
- **Button (14px semibold):** texto de botones.

No usar cursiva, mayúsculas sostenidas ni pesos por debajo de 400. El espaciado entre letras solo se permite en `meta` con `0.01em`.

## Layout & Spacing

Escala: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 px.

Desktop: una columna centrada con ancho máximo de `640px`. La tarjeta principal ocupa ese ancho. Los resultados van lado a lado dentro de la tarjeta. El hero, la tarjeta y el bloque de explicación se espacian con `spacing.7` (48px) entre sí.

Mobile (viewport < 640px): sin márgenes laterales menores a `16px`. Resultados se apilan verticalmente. El espaciado entre bloques se reduce a `spacing.6` (32px).

Los campos de entrada tienen un ancho completo dentro de su contenedor. El botón "Limpiar" se alinea a la derecha debajo de los campos.

## Elevation & Depth

Profundidad mixta. La tarjeta principal (`card-main`) tiene una sombra suave (`0 4px 24px rgba(0, 0, 0, 0.06)`) que la separa del fondo general. Las tarjetas de resultado y los campos de entrada usan borde y fondo, no sombra. Esta jerarquía de dos niveles señala qué contiene la herramienta (tarjeta principal) y qué contiene los datos (tarjetas internas) sin apilar sombras.

Ningún otro elemento recibe sombra. Los estados de hover y focus usan cambio de borde, no elevación.

## Shapes

Todas las superficies usan bordes redondeados. La tarjeta principal usa `rounded.full` (16px) como radio máximo. Las tarjetas de resultado y los campos usan `rounded.md` (12px). El botón secundario usa `rounded.sm` (8px).

No hay bordes completamente cuadrados, formas de píldora ni círculos como contenedores funcionales. La esquina redondeada es una señal visual de que la interfaz es amable y digital, no un formulario financiero.

## Components

- **Tarjeta principal** — `card-main`. Contiene campos, resultados, botón Limpiar. Sombra suave, fondo blanco, padding generoso.
- **Campo de entrada** — `input-field`. Fondo `surface-base`, borde de 2px, cambia a `primary` en focus. Placeholder en `ink-secondary`. Error: borde `error` + mensaje debajo en `body-sm` con color `error`.
- **Tarjeta de resultado teórico** — `card-result`. Fondo blanco con borde `border`. Muestra etiqueta y valor grande. Sin sombra.
- **Tarjeta de resultado seguro** — `card-result-safe`. Fondo `primary-subtle` con borde `primary-light` de 2px. Misma estructura que la teórica. Es visualmente distinguible pero no dominante.
- **Botón Limpiar** — `button-secondary`. Fondo `surface-base` con borde `border`. Sin sombra. En hover, fondo ligeramente más oscuro o borde `primary`.
- **Bloque de fórmula** — Texto en `body` con fondo `surface-base` y `rounded.md`. Muestra la fórmula en formato código.
- **Advertencia colapsable** — Texto en `meta` dentro de un contenedor con `rounded.sm`. Colapsable mediante un toggle de texto (no ícono). Expandido por defecto no; el usuario abre si quiere.

## Do's and Don'ts

| Hacer | No hacer |
|---|---|
| Usar azul suave solo en bordes de foco, tarjeta segura e interactivos | Usar azul como fondo general o decorativo |
| Ambos resultados con el mismo peso visual y tamaño de número | Que un resultado se vea secundario o más pequeño |
| El máximo seguro distinguible por borde y fondo, no solo por color | Que el color sea el único diferenciador entre resultados |
| Los campos con fondo sutil y borde visible | Inputs sin borde o sin indicación de foco |
| Botón Limpiar discreto, secundario | Botón grande o llamativo que compita con los resultados |
| Advertencia colapsable para mantener limpieza visual | Advertencia oculta sin indicación de que existe |
| Una columna centrada, ancho máximo fijo | Diseño que se estire a full-width en desktop |
