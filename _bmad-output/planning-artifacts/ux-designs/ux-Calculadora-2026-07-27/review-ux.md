# Revisión UX — Calculadora de Tope de Reintegro

**Veredicto: APTO.** Sin bloqueantes.

## Accesibilidad

- Contraste suficiente en todas las combinaciones de color definidas en DESIGN.md.
- Etiquetas asociadas (`label`/`for`), errores vinculados (`aria-describedby`), foco visible, sin dependencia exclusiva del color.
- ink-muted (`#94A3B8`) en surface-base (`#FAFAFA`) es el punto de menor contraste, usado solo en advertencia colapsable y notas secundarias (no información crítica).
- Sin bloqueo de zoom, sin movimiento, sin cambios automáticos.

## Consistencia interna

- DESIGN.md y EXPERIENCE.md son consistentes en nombres de componentes, estados y formato monetario.
- El mock HTML en `mockups/calculator-desktop.html` refleja correctamente ambas spines.
- Los placeholders, etiquetas y microcopy coinciden con la tabla Voice and Tone.

## Cobertura de estados

- Todos los estados de State Patterns (inicial, escribiendo, válido, inválido, limpiado) tienen tratamiento visual en DESIGN.md.
- No hay estado no cubierto.

## Completitud de flujos

- Flow 1, 2 y 3 tienen cobertura completa en Component Patterns y State Patterns.
- El escenario de error en Flow 1 está documentado.
- Los tres flujos se pueden recorrer enteramente con los componentes y estados definidos.

## Observaciones menores

- Ninguna.
