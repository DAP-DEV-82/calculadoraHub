# Revisión editorial del PRD

## Alcance y diagnóstico

- **Documento revisado:** `prd.md` (147 líneas, aproximadamente 1320 palabras).
- **Dimensiones:** estructura y redacción española.
- **Conclusión:** el documento es comprensible y la numeración de requisitos es continua, pero necesita una pasada editorial antes de implementarse. Los principales riesgos son la repetición entre requisitos y aceptación, la falta de una definición única para los importes y el redondeo, y varios criterios no verificables de forma objetiva.
- **Prioridad:** `P0` bloquea una interpretación única; `P1` dificulta implementación o pruebas; `P2` mejora consistencia y lectura.

## Hallazgos estructurales

### P0. Definir una única semántica para “reintegro”, “descuento” y “tope”

- **Ubicación:** título y resumen (líneas 8-16), objetivos (20-22), supuestos (110-116), FR-010 (72) y riesgo de la línea 142.
- **Problema:** el producto se llama “Tope de Reintegro”, pero alterna “descuento”, “reintegro”, “importe reconocido” y “gasto”. No queda establecido si el tope limita el descuento calculado, el reintegro acreditado o ambos.
- **Acción:** elegir un término canónico, por ejemplo **tope de reintegro** para la promoción y **porcentaje de reintegro** para la tasa. Definir explícitamente que el resultado es un **monto de compra**, no el importe del reintegro. Usar esos términos en todo el documento.
- **Por qué importa:** sin esta decisión, puede implementarse una fórmula correcta para una interpretación distinta de la promoción.

### P0. Especificar la política exacta de precisión y redondeo

- **Ubicación:** líneas 14, 65-72, 88-90, 113-116 y 141; aceptación de línea 127.
- **Problema:** “redondeado”, “truncado”, “por efecto del redondeo” y “bajo la precisión monetaria definida” no precisan en qué momento se redondea: resultado teórico, importe de compra, reintegro o comparación contra el tope. Tampoco se especifica el modo de redondeo cuando el tercer decimal es 5.
- **Acción:** añadir una regla operativa. Ejemplo: “Calcular con precisión decimal; mostrar el teórico con redondeo convencional a dos decimales; calcular el seguro como truncamiento hacia abajo del valor teórico a dos decimales; para validar el límite, calcular el reintegro sobre el monto seguro y redondearlo a dos decimales según [modo], sin superar el tope”.
- **Por qué importa:** FR-010 no es reproducible mientras “precisión monetaria definida” no defina el algoritmo completo.

### P1. Separar requisitos de comportamiento de criterios de aceptación

- **Ubicación:** FR-003 a FR-006 frente a la aceptación de línea 121; FR-007 a FR-012 frente a las líneas 120-123; FR-014 frente a la línea 124; FR-013 y FR-015 frente a la línea 125; NFR-002 frente a la línea 126.
- **Problema:** la sección 8 repite requisitos ya expresados, pero con menos precisión. Esto crea dos fuentes de verdad y permite que una futura modificación actualice una sección y omita la otra.
- **Acción:** conservar en aceptación solo escenarios verificables con entradas, salida esperada y condición observable, referenciando los IDs correspondientes. Por ejemplo, “AC-001 valida FR-007, FR-008 y FR-009: con ...”. Eliminar las formulaciones generales duplicadas.
- **Por qué importa:** reduce mantenimiento y hace trazable qué prueba valida cada requisito.

### P1. Convertir aceptación y métricas en casos medibles

- **Ubicación:** líneas 120-127 y 131-136.
- **Problema:** “comprender”, “identificar”, “sin pérdida de información”, “perceptiblemente inmediata”, “navegadores modernos” y “menos de un minuto” no tienen método, población, umbral ni entorno de prueba. “100% de los casos definidos” tampoco enumera el conjunto completo.
- **Acción:** reemplazar cada criterio subjetivo por una observación concreta. Ejemplos: lista de viewports, ausencia de overflow horizontal medido, tiempo máximo de actualización, matriz de navegadores/versiones y prueba de usabilidad con número de participantes y tarea. Enumerar los casos de cálculo y validación o enlazar una suite de pruebas.
- **Por qué importa:** un equipo distinto podría declarar el mismo criterio aprobado o rechazado usando interpretaciones incompatibles.

### P1. Completar las reglas de validación de entrada

- **Ubicación:** FR-003 a FR-006 y NFR-006.
- **Problema:** “entradas no numéricas” y “hasta dos decimales” no indican si se aceptan coma o punto decimal, separadores de miles, espacios, signo `+`, notación científica ni valores con más de dos decimales. Tampoco se define el comportamiento ante `NaN`, infinito o valores fuera del rango numérico del entorno.
- **Acción:** documentar el formato admitido y rechazar explícitamente el resto. Para español argentino, decidir si se acepta `1000,50`, `1000.50` o ambos; definir normalización, límites máximos y mensaje por regla.
- **Por qué importa:** la validación es una parte central del MVP y actualmente no puede probarse de manera exhaustiva.

### P1. Resolver la relación entre actualización automática y mensajes de validación

- **Ubicación:** líneas 40, 58, 74 y 76.
- **Problema:** se exige recalcular “cada vez” que se modifique un campo válido, pero también ocultar resultados cuando una entrada queda inválida. No se define si la validación ocurre al escribir, al perder foco o al enviar, ni qué ocurre mientras el usuario escribe un valor temporalmente incompleto.
- **Acción:** fijar el evento y el estado: validar en cada entrada, mostrar resultados solo cuando ambos campos cumplen el esquema, y limpiar resultados inmediatamente al pasar a estado inválido. Definir si los errores aparecen inmediatamente o al perder foco.
- **Por qué importa:** evita parpadeos, resultados obsoletos y pruebas de interfaz ambiguas.

### P2. Reordenar y agrupar el contexto para priorizar decisiones implementables

- **Ubicación:** secciones 1-11.
- **Problema:** el flujo general es correcto, pero las reglas críticas de precisión aparecen después de todos los requisitos funcionales. La advertencia de que el resultado es orientativo también aparece tarde, pese a afectar la interpretación de toda la página.
- **Acción:** mantener el resumen y objetivos, pero mover una definición breve del modelo de cálculo y sus límites antes de los requisitos funcionales. Dejar supuestos detallados y riesgos después. En un PRD de este tamaño no hace falta una nueva sección extensa: bastan 3-5 definiciones explícitas.
- **Por qué importa:** el lector debe conocer la semántica antes de evaluar entradas, cálculo y resultados.

### P2. Normalizar la jerarquía y el estilo de títulos

- **Ubicación:** líneas 33, 46, 60, 78, 108, 118, 129, 138 y 145.
- **Problema:** se usa mayúscula inicial en cada palabra (“Usuario Y Viaje Principal”, “Entrada De Datos”, “Reglas De Negocio Y Supuestos”), mientras que el español recomienda mayúscula solo en la primera palabra y nombres propios. Además, “Requisitos Funcionales” mezcla una sección principal con subsecciones en una jerarquía razonable, pero los títulos no siguen un criterio visible único.
- **Acción:** usar, por ejemplo, `## 4. Usuario y viaje principal`, `### Entrada de datos`, `### Cálculo`, `### Presentación y explicación`, y aplicar la misma convención a todos los títulos.
- **Por qué importa:** mejora el escaneo y evita que los títulos parezcan nombres propios o etiquetas de interfaz.

## Repeticiones y consolidaciones recomendadas

1. **Fórmula y diferencia entre resultados:** el resumen (líneas 14-15), objetivos (21-22), FR-008 a FR-010, FR-016 y FR-017, y el riesgo de línea 141 expresan parcialmente la misma idea. Mantener la explicación de producto en objetivos y la regla exacta en cálculo; reducir el resumen a una frase y dejar el riesgo solo para la mitigación.
2. **Resultado seguro:** FR-009, FR-010, FR-015, la aceptación de líneas 120 y 123, y el riesgo de línea 142 repiten que el importe seguro evita superar el tope. Mantener la definición en FR-009/FR-010, la etiqueta visible en FR-015 y una prueba numérica en aceptación; eliminar las formulaciones restantes.
3. **Alcance técnico:** líneas 16, 102, 104, 134 y 143 repiten ausencia de backend, persistencia e integraciones. Declararlo una vez en alcance/no objetivos y referenciarlo desde métricas y riesgos.
4. **Promoción real y resultado orientativo:** líneas 27-28, 115-116 y 140 repiten que no se interpretan condiciones reales. Mantenerlo como limitación de producto en no objetivos y una advertencia de interfaz derivada de esa limitación.

## Revisión de redacción española

| Ubicación / texto original | Redacción sugerida | Motivo |
|---|---|---|
| Línea 12: “calcular cuánto conviene gastar” | “calcular el monto máximo conveniente de compra” | “Cuánto conviene gastar” es coloquial y puede sugerir una recomendación financiera; la propuesta coincide con el concepto definido después. |
| Línea 14: “El usuario ingresará...” | “El usuario ingresará el porcentaje de descuento y el tope de reintegro en pesos argentinos.” | Evita repetir “El usuario” como sujeto de una oración larga y fija el término canónico si se adopta la decisión terminológica. |
| Línea 14: “monto teórico de compra, redondeado a dos decimales, y el máximo seguro de compra, truncado...” | “monto teórico de compra, redondeado a dos decimales, y monto máximo seguro de compra, truncado...” | Mantiene la misma estructura nominal y evita que “el máximo seguro” quede sin sustantivo explícito. |
| Línea 23: “definición, implementación y validación de un producto web pequeño” | “definición, implementación y validación de una aplicación web pequeña” | “Aplicación web” es más preciso que “producto web” en este contexto. |
| Línea 35: “importe máximo conveniente de compra” | “monto máximo conveniente de compra” | Uniforma “monto” con el resto del documento; elegir una sola forma entre “importe” y “monto”. |
| Línea 41: “con formato de pesos argentinos” | “con formato monetario argentino” | La formulación actual puede confundirse con el nombre de una moneda; el formato incluye símbolo, separador y decimales. |
| Línea 58: “no debe mostrar resultados calculados con entradas inválidas” | “no debe mostrar resultados como válidos cuando alguna entrada es inválida” | Expresa la condición observable sin sugerir que el sistema nunca pueda conservar contenido previo en la interfaz. |
| Línea 72: “cuya aplicación del porcentaje” | “al que, al aplicar el porcentaje de reintegro, no se le asigna un reintegro superior al tope” | Corrige la construcción nominal ambigua y explicita qué operación se compara con el tope. |
| Línea 88: “la diferencia entre ambos resultados se debe al redondeo del importe de compra a centavos” | “la diferencia entre ambos resultados se debe a que el monto teórico puede contener fracciones de centavo y el monto seguro se trunca a dos decimales” | “Redondeo del importe de compra” no describe con precisión la causa ni distingue redondeo de truncamiento. |
| Línea 94: “Un usuario que entienda los nombres de los dos datos” | “Una persona que reconozca los dos datos solicitados” | “Entender los nombres” es impreciso y suena antinatural; la propuesta describe la capacidad que se quiere asumir. |
| Línea 100: “de forma perceptiblemente inmediata” | “en un máximo de [X] ms tras un cambio válido” | Sustituye una expresión subjetiva por una condición medible. |
| Línea 102: “estarán limitados a la sesión de la página” | “permanecerán únicamente en memoria durante la sesión actual de la página y se eliminarán al abandonarla” | “Sesión de la página” es ambiguo: puede referirse a memoria, almacenamiento del navegador o sesión del servidor. |
| Línea 104: “navegadores modernos” | “los navegadores y versiones definidos en la matriz de compatibilidad” | Evita una categoría cambiante y no verificable. |
| Línea 116: “esa particularidad queda fuera del MVP y debe mencionarse...” | “esa particularidad queda fuera del MVP y debe mencionarse...” | Mantener la frase, pero indicar dónde se muestra la advertencia: interfaz, ayuda contextual o documentación. Sin ubicación, “debe mencionarse” no es accionable. |
| Línea 127: “porcentajes pequeños” | “porcentajes dentro de un conjunto definido, por ejemplo `0,01%` y `0,1%`” | Convierte una categoría abierta en casos de prueba reproducibles. |
| Línea 135: “puede identificar el monto seguro y la razón de la diferencia” | “identifica correctamente el monto seguro y explica correctamente la diferencia en una tarea definida” | “Puede” y “comprender” no fijan una prueba ni un criterio de éxito observable. |

## Numeración y consistencia técnica

- Los IDs `FR-001` a `FR-018` y `NFR-001` a `NFR-007` son continuos y no presentan saltos. No es necesario renumerarlos.
- Conviene numerar los criterios de aceptación (`AC-001`, etc.) y los supuestos (`ASM-001`, etc.) si se exige trazabilidad. Actualmente los criterios y supuestos son viñetas sin identificador.
- “Entrada De Datos”, “Presentación Y Explicación” y otros títulos deben corregirse a minúsculas ortográficas; no es un problema de numeración, pero sí de consistencia editorial.
- Elegir una sola pareja: **monto** o **importe**; **tope de reintegro** o **tope máximo de reintegro**; **descuento** o **porcentaje de reintegro**. No alternarlas salvo que representen conceptos distintos y estén definidos.
- Mantener un único formato para decimales en texto y ejemplos. Si la interfaz acepta coma decimal, indicar también cómo se representa el valor en los casos de prueba y si `$1000` se mostrará como `$1.000,00`.

## Orden de corrección recomendado

1. Resolver la semántica de reintegro/descuento y documentar el algoritmo de precisión.
2. Definir el contrato de entrada: formatos, rango, separadores y momento de validación.
3. Convertir los criterios de aceptación y métricas en casos observables con IDs.
4. Consolidar repeticiones entre objetivos, requisitos, aceptación, riesgos y alcance.
5. Aplicar la normalización terminológica y la corrección de títulos y frases señaladas.
