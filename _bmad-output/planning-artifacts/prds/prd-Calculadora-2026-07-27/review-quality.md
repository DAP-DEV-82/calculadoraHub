# Revisión de calidad del PRD: Calculadora de Tope de Reintegro

- **PRD revisado:** `/home/vato/projects/Calculadora/_bmad-output/planning-artifacts/prds/prd-Calculadora-2026-07-27/prd.md`
- **Tipo de gate:** PRD MVP de práctica técnica
- **Fecha de revisión:** 2026-07-27
- **Veredicto:** **APTO CON CAMBIOS**
- **Grado de calidad:** **Fair**

## Veredicto ejecutivo

El PRD define un MVP pequeño, coherente con una práctica técnica y con un alcance explícitamente limitado: dos entradas, cálculo local, presentación diferenciada y pruebas de la lógica. La numeración FR/NFR es continua y no hay señales relevantes de inflación de alcance.

No está listo como contrato de implementación sin aclarar la semántica exacta de redondeo del reintegro y sin convertir varios NFR y criterios de aceptación en condiciones medibles. El mayor riesgo no es la fórmula básica, sino que producto, implementación y pruebas adopten distintas interpretaciones de “máximo seguro”, separadores decimales y precisión monetaria.

## Resumen por dimensión

| Dimensión | Juicio | Comentario |
|---|---|---|
| Decisión | Adecuada | El alcance y las exclusiones están decididos, pero falta cerrar la política de precisión/redondeo. |
| Completitud | Adecuada con huecos | Cubre el flujo principal; faltan límites y comportamientos explícitos para entradas y compatibilidad. |
| Coherencia estratégica | Adecuada | La tesis del MVP es consistente con una herramienta de cálculo local; las métricas son principalmente de entrega y aprendizaje. |
| Done-ness | Delgada | Hay criterios útiles, pero no existe una condición verificable para cada FR/NFR y algunos términos son subjetivos. |
| Honestidad de alcance | Fuerte | Los no objetivos, supuestos y riesgos reducen bien el riesgo de expansión. |
| Usabilidad downstream | Adecuada | Los IDs ayudan a extraer requisitos, pero falta trazabilidad explícita entre FR y aceptación. |
| Ajuste de forma | Adecuada | La forma breve es correcta para una herramienta de una sola tarea; el viaje podría identificar mejor al protagonista. |

## Hallazgos principales

### H-01. Alta: política de redondeo no cerrada

**Ubicación:** secciones 5, FR-009/FR-010; sección 7, supuestos; sección 8, primer criterio de aceptación.

El PRD define el monto teórico como redondeado a dos decimales y el máximo seguro como truncado, pero no define con precisión cómo se calcula el reintegro efectivo al validar que el importe “no supera” el tope. Para `15%` y `$66.666,66`, el descuento exacto es `$9.999,999`; para `$66.666,67`, es `$10.000,0005`. Según se compare el valor exacto, se redondee el reintegro a centavos o se trunque, el importe seguro puede cambiar. La frase “bajo la precisión monetaria definida” no especifica esa operación.

**Impacto:** dos implementaciones conformes con la redacción podrían devolver distintos resultados, y las pruebas no tendrían una oracle inequívoca.

**Corrección requerida:** decidir y documentar una regla completa, por ejemplo: “el importe seguro es el mayor importe con dos decimales cuyo reintegro, redondeado a dos decimales según [regla], sea menor o igual al tope”. Agregar casos frontera donde el valor exacto queda apenas por encima del tope pero su redondeo queda en el tope, y viceversa. Si la intención es una política deliberadamente más conservadora que la promoción real, declararlo como decisión de producto, no solo como supuesto.

### H-02. Alta: formato y parsing de importes argentinos ambiguos

**Ubicación:** FR-004/FR-005, FR-014 y criterios de aceptación de la sección 8.

Se exige formato local, pero no se decide qué entradas acepta el usuario: coma o punto decimal, separador de miles, espacios, signo `+`, notación científica ni cantidad máxima de dígitos. “Entradas no numéricas” no cubre estos casos y un campo HTML numérico no garantiza por sí mismo un comportamiento consistente con formato argentino.

**Impacto:** la misma entrada puede ser válida en un navegador y rechazada en otro; además, el formato mostrado y el formato ingresado pueden no coincidir.

**Corrección requerida:** definir el contrato de entrada y salida. Como mínimo, especificar si se acepta `1000,50`, `1000.50`, ambos o solo uno; si `1.000,50` es válido; cómo se normalizan espacios; y cómo se rechazan más de dos decimales. Incluir esos casos en FR-004/FR-005 y en las pruebas de aceptación.

### H-03. Alta: NFR críticos no son verificables

**Ubicación:** NFR-001 a NFR-007, especialmente NFR-002, NFR-004 y NFR-006.

Expresiones como “usable”, “sin desplazamiento horizontal innecesario”, “perceptiblemente inmediata” y “navegadores modernos” no establecen un umbral de verificación. NFR-005 además dice que los cálculos están “limitados a la sesión”, lo que puede interpretarse como una expectativa de retención en memoria, aunque el resumen afirma que no hay persistencia.

**Impacto:** el equipo puede marcar los NFR como cumplidos sin una prueba reproducible y la implementación puede introducir decisiones incompatibles con la intención del PRD.

**Corrección requerida:** fijar límites mínimos acordes al MVP. Ejemplos: anchos de viewport objetivo, ausencia de scroll horizontal a esos anchos, tiempo máximo de actualización en una prueba local, lista o rango de navegadores/versiones, y confirmación de que “sesión” significa solo el estado visible en memoria y no almacenamiento local, cookies ni red. Para NFR-007, indicar el nivel mínimo de separación testeable, por ejemplo una función pura o módulo de dominio cubierto por pruebas unitarias.

### H-04. Media: criterios de aceptación no trazan todo el contrato

**Ubicación:** sección 8 completa; secciones 5 y 6.

Los criterios cubren el camino feliz y algunas propiedades generales, pero no están identificados ni vinculados a FR/NFR. FR-001/002/006/013/015/016/017, varios requisitos de accesibilidad de NFR-003 y NFR-005/NFR-006 no tienen un criterio individual claramente verificable. “Comprender” y “visualmente” son resultados deseables, pero no definen cómo se comprueban.

**Impacto:** durante la implementación o una revisión posterior se puede cumplir la fórmula y omitir etiquetas, errores, advertencias o explicación.

**Corrección requerida:** convertir los criterios en una lista con IDs, por ejemplo `AC-001`, y relacionar cada FR/NFR relevante con al menos un criterio. Para accesibilidad, especificar comprobaciones mínimas: asociación label-control, foco visible por teclado, anuncio o asociación del error, y resultados identificables por nombre. Para la explicación, exigir la presencia de textos concretos o condiciones observables, no una evaluación subjetiva de comprensión.

### H-05. Media: la métrica de éxito no valida suficientemente la utilidad

**Ubicación:** sección 9.

Las métricas son razonables para una práctica técnica, pero “100% de los casos definidos” es una medida de ejecución del conjunto de pruebas y puede ocultar casos no definidos. “Una persona que revise la página puede identificar...” tampoco define quién revisa, con qué escenario ni cómo se mide. No hay una contramétrica para evitar que la política conservadora produzca un resultado innecesariamente bajo o que la explicación sea demasiado extensa para el flujo.

**Impacto:** se puede declarar éxito por cobertura nominal aunque queden errores de producto en casos frontera.

**Corrección requerida:** mantener las métricas de aprendizaje, pero agregar una suite mínima explícita de clases de equivalencia y fronteras, y definir un criterio de revisión manual reproducible. Como contramétrica opcional y de bajo costo, verificar que la diferencia entre teórico y seguro solo aparece cuando la precisión lo justifica y que el seguro no excede el teórico ni el tope según la regla decidida.

## Evaluación detallada

### 1. Decisión

**Juicio: adecuada.**

El PRD toma decisiones útiles: página estática, sin backend, sin cuentas ni persistencia (sección 1); limita moneda y capacidades (sección 3); y explicita supuestos sobre la promoción (sección 7). También reconoce que las promociones reales pueden tener reglas distintas (sección 10). Esto permite decidir construir el MVP sin confundirlo con un verificador de términos y condiciones.

La decisión incompleta es la precisión del reintegro efectivo. “Truncar” es una política conservadora, pero no se establece si es una simplificación matemática, una garantía contra el tope redondeado o una aproximación independiente de las reglas de cada promoción. El riesgo debe resolverse antes de arquitectura y pruebas.

### 2. Completitud

**Juicio: adecuada con huecos.**

El contenido mínimo está presente: objetivo, no objetivos, viaje, FR, NFR, supuestos, aceptación, métricas y riesgos. Se contemplan invalidación, actualización reactiva, formato monetario, casos de porcentaje extremo y pruebas de precisión.

Faltan decisiones operativas sobre parsing, límites de magnitud, representación de errores, comportamiento al editar parcialmente un campo, y compatibilidad concreta. No son funcionalidades nuevas; son detalles necesarios para que el contrato sea implementable de forma consistente.

### 3. Coherencia estratégica

**Juicio: adecuada.**

La tesis implícita es clara: reducir una cuenta manual y prevenir que el usuario tome como seguro un valor redondeado hacia arriba. Los FR sirven a esa tesis y los no objetivos protegen el alcance. La explicación de la diferencia entre resultados es una parte importante de la propuesta, no simple decoración.

La sección de métricas está más orientada a calidad de implementación y aprendizaje BMAD que a validar el valor para el usuario. Eso es aceptable para el contexto declarado, pero conviene nombrarlo como tal y no presentarlo como evidencia fuerte de utilidad real.

### 4. Done-ness

**Juicio: delgada.**

Los FR tienen IDs y, en general, consecuencias observables. El ejemplo principal y la lista de pruebas propuesta son una buena base. Sin embargo, la aceptación está agrupada sin trazabilidad y deja sin criterios específicos varios FR de presentación, accesibilidad y privacidad.

Los NFR son el punto más débil: casi ninguno tiene umbral, método de prueba o entorno. La lógica independiente de la vista está bien orientada, pero NFR-007 no define qué significa “poder probarse”.

### 5. Honestidad de alcance

**Juicio: fuerte.**

La sección de no objetivos es concreta y evita incorporar integraciones, cuentas, historial o reglas de entidades. Los supuestos están marcados inline y se repiten como índice razonable en la sección 7. Los riesgos principales se reconocen, incluido el de precisión decimal y la divergencia con promociones reales.

La única reserva es que el riesgo conocido de redondeo se reconoce, pero no se convierte todavía en una decisión cerrada ni en una condición de aceptación completa. La nota sobre promociones que redondean por transacción también debería tener una ubicación obligatoria y verificable en la interfaz o documentación si se considera necesaria para evitar malentendidos.

### 6. Usabilidad downstream

**Juicio: adecuada.**

La numeración FR-001 a FR-018 y NFR-001 a NFR-007 es única, continua y estable. Las secciones están separadas de forma útil para extraer implementación y pruebas. El vocabulario principal es bastante consistente: “monto teórico”, “máximo seguro”, “tope” y “porcentaje”.

Para mejorar el consumo por UX, arquitectura y stories, se necesita una tabla o anotación de trazabilidad entre requisitos y criterios `AC`. También conviene introducir un glosario corto de “tope”, “reintegro”, “monto teórico” y “máximo seguro”, porque “descuento” y “reintegro” se usan como equivalentes en el supuesto FR-010/sección 7 aunque una promoción real podría distinguirlos.

### 7. Ajuste de forma

**Juicio: adecuado.**

Para una calculadora de una sola tarea y de práctica técnica, el PRD no está sobredimensionado. El viaje lineal es suficiente para orientar una interfaz sencilla y no justifica una taxonomía extensa de personas o escenarios.

El viaje usa “el usuario” como protagonista genérico. No bloquea este MVP de bajo riesgo, pero un protagonista nombrado o una formulación explícita de “usuario único de una tarea” haría más claro el contexto y cumpliría mejor el estándar de user journey si el documento se usa como entrada para UX.

## Revisión de IDs FR/NFR

**Resultado: correcto en mecánica, incompleto en trazabilidad.**

- FR-001 a FR-018: únicos, consecutivos y sin huecos.
- NFR-001 a NFR-007: únicos, consecutivos y sin huecos.
- No hay IDs duplicados ni referencias a IDs inexistentes.
- Los IDs cubren entradas, cálculo, presentación, usabilidad, responsive, accesibilidad, rendimiento, privacidad, compatibilidad y mantenibilidad.
- No existen IDs para criterios de aceptación, riesgos, métricas o reglas de negocio. Esto no es incorrecto por sí mismo, pero impide demostrar cobertura requisito por requisito.
- FR-010 depende de una precisión definida en supuestos, pero esa dependencia no está expresada como referencia formal y el supuesto no resuelve toda la semántica.
- NFR-003 y NFR-007 deberían desglosarse o recibir criterios verificables para evitar que queden como requisitos paraguas.

## Revisión de criterios de aceptación

**Resultado: base útil, no suficiente como gate de implementación.**

Fortalezas:

- Incluye el caso principal exacto (`15%`, `$10000`).
- Incluye estados inválidos, recalculo sin recarga y formatos monetarios.
- Incluye responsive y la exigencia de pruebas para clases importantes de cálculo.

Gaps que deben cerrarse:

- No hay ID ni referencia FR/NFR por criterio.
- No se define el algoritmo de redondeo del reintegro efectivo.
- No se define qué ocurre con coma decimal, punto decimal y separador de miles.
- No se incluyen casos con `100%`, aunque la sección 8 menciona que deben probarse.
- No se incluyen ejemplos concretos para tope con centavos, porcentajes pequeños, fracciones de centavo y entradas con más de dos decimales.
- No se prueba explícitamente que el mensaje de error esté asociado al campo y sea accesible por teclado o tecnologías asistivas.
- “El usuario puede comprender” no es directamente verificable sin una prueba manual definida.

## Riesgos

### Riesgos bien tratados

- Divergencia con las condiciones reales de bancos, tarjetas y comercios.
- Errores de precisión decimal.
- Confusión entre monto de reintegro y monto de compra.
- Expansión de alcance durante la práctica.

### Riesgos subestimados o sin mitigación concreta

1. **Ambigüedad de redondeo:** la mitigación “definir el comportamiento a dos decimales” es insuficiente hasta definir la operación exacta y la regla de redondeo.
2. **Locale y parsing:** no se identifica el riesgo de que el formato argentino de salida no coincida con la entrada aceptada.
3. **División por valores cercanos a cero:** porcentajes positivos muy pequeños pueden producir montos enormes, pérdida de precisión o problemas de formato; no hay límites de magnitud ni comportamiento definido.
4. **Edición en curso:** el PRD dice que no debe haber resultados desactualizados, pero no define si el error aparece al primer carácter inválido, al blur o al enviar. Esto afecta UX y pruebas.
5. **Divergencia entre política conservadora y promoción real:** truncar siempre puede ser más conservador que el cálculo de la entidad. La interfaz debe explicitar que “seguro” significa seguro según la política del producto, no garantía contractual.

## Recomendación de salida del gate

**No aprobar todavía como PRD bloqueado para implementación.** Aprobar como borrador avanzado y pedir una revisión corta que cierre, en este orden:

1. La definición matemática completa del máximo seguro y del redondeo del reintegro.
2. El contrato de entrada/salida para formato argentino y límites numéricos.
3. Los umbrales verificables de NFR-002, NFR-004, NFR-005, NFR-006 y NFR-007.
4. Criterios `AC` trazables a todos los FR/NFR relevantes, con casos frontera explícitos.

Con esos cambios, el alcance y la estructura actuales son suficientes para un MVP de práctica técnica; no se recomienda agregar funcionalidades antes de cerrar esas definiciones.
