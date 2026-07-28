# Reconciliación Brief-PRD

## Resumen

El PRD cubre casi todo el alcance funcional del brief y conserva la decisión central de mostrar un monto teórico y un máximo seguro. No hay una contradicción frontal en la fórmula principal, pero quedan decisiones de precisión, alcance y comunicación que deberían cerrarse antes de implementar. La omisión más concreta es que el PRD no exige rechazar topes con más de dos decimales, aunque el brief sí los declara inválidos.

## Decisiones del brief correctamente trasladadas

- Aplicación estática, sin backend, cuentas, persistencia ni integraciones externas.
- Entrada de porcentaje y tope en pesos argentinos.
- Porcentaje mayor que `0` y menor o igual que `100`.
- Cálculo automático sin navegación ni recarga.
- Monto teórico redondeado a dos decimales.
- Máximo seguro truncado a dos decimales.
- Resultados separados, con el máximo seguro identificado como recomendado.
- Formato monetario argentino, diseño responsive y accesibilidad básica.
- Explicación de la fórmula y del efecto del redondeo.
- Advertencia de que el resultado es orientativo y no reemplaza los términos de la promoción.
- Pruebas para valores enteros, decimales, porcentajes pequeños y entradas inválidas.

## Gaps y acciones

### Alta prioridad

1. **Validación incompleta del tope.**
   - Brief: el tope debe ser positivo y tener hasta dos decimales.
   - PRD: `FR-004` dice que debe aceptar hasta dos decimales, pero `FR-005` no exige rechazar más de dos.
   - Acción: añadir a `FR-005` el rechazo de importes con más de dos decimales y un caso de aceptación para esa validación.

2. **Precisión monetaria insuficientemente definida.**
   - Ambos documentos mencionan centavos y truncamiento, pero no fijan si el descuento se compara con el tope antes o después de redondear a centavos, ni cómo evitar errores de punto flotante.
   - Acción: especificar una política única: representar importes en centavos o decimal exacto, definir el redondeo del descuento y probar que el máximo seguro no excede el tope bajo esa política. Mantener el ejemplo `15%`/`$10000` como prueba normativa.

3. **Advertencia sobre promociones reales no es verificable.**
   - El brief pide que la interfaz indique que el resultado es orientativo y que se revisen los términos y condiciones. El PRD lo deja como supuesto/riesgo, con “interfaz o documentación”, sin requisito funcional ni criterio de aceptación.
   - Acción: convertirlo en requisito explícito de presentación y añadirlo a los criterios de aceptación, incluyendo la aclaración de que “reintegro” se interpreta como el tope del descuento porcentual ingresado.

### Media prioridad

4. **Criterio visual del brief parcialmente perdido.**
   - El brief solicita complejidad visual media, color y jerarquía clara. El PRD solo exige distinguir los resultados y darles el mismo peso visual.
   - Acción: trasladar la intención como requisito de diseño verificable, sin imponer una paleta concreta: jerarquía clara, uso de color no exclusivo para comunicar estados y ambos resultados igualmente prominentes.

5. **Persistencia temporal con lenguaje ambiguo.**
   - El brief establece que los datos desaparecen al cerrar o recargar. `NFR-005` dice que están limitados a “la sesión de la página”, lo que puede interpretarse como persistencia durante una sesión más amplia.
   - Acción: reemplazar esa expresión por “solo viven en el estado de la página y se pierden al cerrar o recargar”, y mantener explícitamente que no se envían ni guardan.

6. **Objetivo adicional no presente en el brief.**
   - `Objetivo 4`, las métricas de aprendizaje y la trazabilidad `FR`/`NFR` describen la práctica BMAD, no una necesidad del usuario ni del producto.
   - Acción: marcar esos puntos como objetivos internos del proyecto o moverlos a documentación de proceso; no usarlos como criterios de éxito del producto.

## Posibles contradicciones o decisiones a confirmar

- **“Monto teórico” frente a “máximo seguro”.** El PRD exige que el máximo seguro no sea mayor que el monto teórico mostrado. Esto es correcto para el ejemplo, pero debe definirse sobre el valor matemático completo y no sobre el valor ya redondeado en pantalla. Acción: declarar que el truncamiento se aplica al valor exacto y que la comparación visual es solo una propiedad esperada del formato.
- **Redondeo de promociones reales.** El brief habla de evitar superar el tope por el redondeo del importe de compra; el PRD también menciona promociones que redondean el descuento por transacción, pero no decide qué modelo simula el MVP. Acción: fijar que el MVP calcula el porcentaje sobre el importe de compra con precisión monetaria de dos decimales y no simula reglas por transacción; documentarlo junto a la advertencia.
- **Ejemplo visible.** `FR-018` convierte el ejemplo del brief en contenido obligatorio. No contradice el brief, pero amplía el alcance de presentación. Acción: conservarlo solo si se considera útil para comprensión; de lo contrario, dejarlo como caso de prueba y no como elemento visible obligatorio.

## Orden recomendado de resolución

1. Definir la aritmética exacta y sus casos límite.
2. Completar la validación de máximo dos decimales.
3. Hacer obligatorias la advertencia y la interpretación de “reintegro”.
4. Aclarar la pérdida de datos al recargar/cerrar.
5. Decidir si los objetivos de aprendizaje y el ejemplo visible pertenecen al PRD del producto o a la documentación del proceso.
