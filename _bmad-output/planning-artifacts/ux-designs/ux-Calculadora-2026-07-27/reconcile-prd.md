---
title: "Reconciliación PRD ↔ UX — Calculadora de Tope de Reintegro"
status: draft
created: 2026-07-27
sources:
  - ../prds/prd-Calculadora-2026-07-27/prd.md
  - DESIGN.md
  - EXPERIENCE.md
---

# Reconciliación PRD ↔ UX

## 1. FR/NFR sin cobertura en UX

| ID | Requisito | Estado UX | Impacto |
|---|---|---|---|
| **FR-006a** | Aceptar coma o punto como separador decimal, normalizar ambos formatos. No aceptar separadores de miles, notación científica ni signos. | **No cubierto.** EXPERIENCE.md no menciona normalización de separadores decimales. Los placeholders (`Ej: 15`, `Ej: 1000`) no comunican que se aceptan ambos formatos ni las reglas de sanitización. | Alto. El usuario no sabrá que `15,50` y `15.50` son equivalentes, ni que `1.000,50` es rechazado. |
| **FR-004** (tope máximo) | Aceptar topes hasta `999999999,99`. En pantalla mostrar con separador de miles `$999.999.999,99`. | **No cubierto.** UX no define límite superior del tope ni especifica formato de salida con separadores de miles. Los ejemplos muestran `$6666,67` sin separador de miles. | Medio. Sin límite explícito, el input podría aceptar valores arbitrarios. El formato de visualización puede omitir separadores de miles. |
| **FR-008** | Redondeo convencional a 2 decimales (hacia arriba si 3er decimal ≥ 5). | **No cubierto.** UX muestra el resultado `$6666,67` pero no especifica la regla de redondeo. | Bajo. El valor de ejemplo es correcto, pero la regla solo está en PRD. |
| **FR-010** | El máximo seguro se trunca desde el valor exacto, no desde el redondeado. Política: mayor importe en centavos sin superar el tope. | **No cubierto.** UX menciona truncamiento en Flow 2 pero no aclara que se calcula desde el valor exacto, lo que implica un orden de operaciones específico. | Medio. Sin especificar, implementación podría calcular desde valor redondeado y producir error. |
| **NFR-001** | Usabilidad: persona sin experiencia ≤ 60 s para caso básico. | **No cubierto.** UX no define criterio de tiempo ni método de verificación. | Bajo. Es criterio de aceptación, no de diseño. |
| **NFR-004** | Rendimiento: percentil 95 ≤ 50 ms (`performance.now()`). | **No cubierto.** (Esperado — es requisito de implementación.) | — |
| **NFR-005** | Privacidad: sin envío ni persistencia de datos. | **No cubierto.** UX no menciona privacidad. (Esperado — es requisito técnico.) | — |
| **NFR-006** | Compatibilidad: Chrome/Edge 120+, Firefox 120+, Safari 17+. | **Cubierto parcialmente.** EXPERIENCE.md línea 151 lista los navegadores pero omite las versiones mínimas. | Bajo. Debe agregar las versiones. |
| **NFR-007** | Mantenibilidad: lógica testeable sin DOM. | **No cubierto.** (Esperado — es requisito de implementación.) | — |

## 2. Decisiones UX que contradicen el PRD

| # | Decisión UX | PRD | Contradicción |
|---|---|---|---|
| **C-01** | **Advertencia colapsable:** "Expandido por defecto no; el usuario abre si quiere" (EXPERIENCE.md, Component Patterns). | **FR-019:** "mostrar una advertencia visible indicando que el resultado es orientativo". | **Alta.** Una advertencia colapsada por defecto no es "visible" en el sentido de FR-019. El usuario debe interactuar para verla, lo que contradice el requisito de que esté visible. La advertencia debe estar expandida por defecto o el PRD debe relajar FR-019. |
| **C-02** | **Viewport 1280×720 no mencionado.** EXPERIENCE.md solo cubre `320×568` y desktop ≥ 640px. | **NFR-002:** "sin desplazamiento horizontal en viewports de 320×568 y 1280×720, como mínimo". | **Media.** UX no verifica el punto de quiebre 1280×720. Aunque el diseño centrado de 640px probablemente no tenga scroll horizontal, no está especificado ni verificado explícitamente. |
| **C-03** | **Formato de resultados sin separador de miles.** UX muestra `$6666,67`. | **FR-004** especifica formato `$999.999.999,99` con punto separador de miles y coma decimal. **FR-014** exige "formato de pesos argentinos". | **Media.** El formato de pesos argentinos estándar usa punto para miles. UX no especifica esta regla de formateo. Para montos pequeños (6666) es aceptable, pero la especificación falta. |

## 3. Observaciones adicionales

- **FR-018** (ejemplo normativo): Cubierto correctamente en IA: "Ejemplo normativo: 15%, $1000 → $6666,67 / $6666,66."
- **State Patterns** en EXPERIENCE.md: Cobertura sólida de estados válido, inválido, inicial y limpiado. Se alinea con FR-006, FR-011, FR-012.
- **Accessibility Floor**: Cubre NFR-003 y FR-020 (color no único medio). Buen nivel de detalle.
- **FR-013 / FR-020**: "Ambos resultados con el mismo peso visual" está correctamente especificado en DESIGN.md Do's and Don'ts.
- **FR-016 / FR-017**: Fórmula y explicación de fracciones de centavo están cubiertas en EXPERIENCE.md (Flow 2 y Voice and Tone).
- **Botón Limpiar**: Adición UX sin FR correspondiente. No contradice el PRD pero debe registrarse como decisión de diseño no requerida.

## 4. Recomendaciones

1. **C-01 (Alta):** Decidir si la advertencia debe estar expandida por defecto (alineado con FR-019) o si se relaja FR-019 para aceptar contenido colapsable. En cualquier caso, PRD y UX deben coincidir.
2. **FR-006a:** Agregar a EXPERIENCE.md en Component Patterns o State Patterns la regla de normalización coma/punto y el rechazo de separadores de miles.
3. **FR-004 / FR-014:** Agregar en EXPERIENCE.md o DESIGN.md la especificación de formato de salida (separador de miles con punto, decimal con coma, símbolo `$`) y el límite máximo del campo tope.
4. **FR-010:** Documentar en EXPERIENCE.md que el máximo seguro se trunca desde el valor exacto (no desde el redondeado) como regla de comportamiento.
5. **C-02:** Agregar explícitamente `1280×720` en la sección Responsive de EXPERIENCE.md.
6. **NFR-006:** Agregar versiones mínimas de navegadores en EXPERIENCE.md.
