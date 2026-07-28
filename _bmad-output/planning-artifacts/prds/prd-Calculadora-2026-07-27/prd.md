---
title: "PRD - Calculadora de Tope de Reintegro"
status: final
created: 2026-07-27
updated: 2026-07-27
---

# PRD: Calculadora de Tope de Reintegro

## 1. Resumen

La Calculadora de Tope de Reintegro es una página web estática para calcular cuánto conviene gastar en una promoción con descuento porcentual y tope máximo de reintegro.

El usuario ingresará el porcentaje de descuento y el tope en pesos argentinos. La página calculará automáticamente dos importes: el monto teórico de compra, redondeado a dos decimales, y el máximo seguro de compra, truncado a dos decimales para evitar superar el tope por efecto del redondeo.

Este PRD define el MVP de una práctica técnica orientada a aprender el flujo BMAD. No requiere backend, cuentas, persistencia ni integración con entidades externas.

## 2. Objetivos

- Permitir resolver el cálculo de una promoción ingresando solo dos valores.
- Evitar que el usuario confunda el monto matemático redondeado con el importe prudente para no exceder el tope.
- Comunicar la fórmula y la diferencia entre ambos resultados de forma breve y clara.
- Practicar un flujo completo de definición, implementación y validación de un producto web pequeño.

## 3. No objetivos

- Consultar o verificar promociones reales.
- Interpretar términos y condiciones específicos de bancos, tarjetas o comercios.
- Guardar cálculos, crear cuentas o mantener historial.
- Calcular cuotas, costos financieros, límites de tarjeta o descuentos acumulables.
- Soportar monedas distintas del peso argentino en el MVP.

## 4. Usuario y viaje principal

El usuario es una persona que está evaluando una promoción con descuento porcentual y tope de reintegro. Quiere saber el importe máximo conveniente de compra sin realizar la cuenta manualmente.

1. El usuario abre la página.
2. Ingresa el porcentaje de descuento, por ejemplo `15`.
3. Ingresa el tope de reintegro, por ejemplo `1000`.
4. La página valida ambos valores y recalcula los resultados automáticamente.
5. El usuario ve el monto teórico y el máximo seguro con formato de pesos argentinos.
6. El usuario consulta la explicación breve y toma el máximo seguro como referencia prudente.

## 5. Requisitos funcionales

### Entrada de datos

**FR-001.** El sistema debe mostrar un campo identificable para ingresar el porcentaje de descuento.

**FR-002.** El sistema debe mostrar un campo identificable para ingresar el tope máximo de reintegro en pesos argentinos.

**FR-003.** El sistema debe aceptar porcentajes mayores que `0` y menores o iguales que `100`, con hasta dos decimales.

**FR-004.** El sistema debe aceptar topes positivos de hasta `999999999,99` o `999999999.99`, sin separador de miles y con hasta dos decimales; en pantalla debe mostrarlos como `$999.999.999,99` como máximo.

**FR-005.** El sistema debe rechazar campos vacíos, valores negativos, cero, porcentajes mayores que `100`, topes mayores al máximo definido, entradas no numéricas y valores con más de dos decimales.

**FR-006.** El sistema debe validar los campos en cada entrada, mostrar un mensaje claro junto al campo inválido y ocultar los resultados mientras falte un dato o alguna entrada sea inválida.

**FR-006a.** El sistema debe aceptar números sin separador de miles y permitir coma o punto como separador decimal, normalizando ambos formatos al mismo valor. No debe aceptar separadores de miles, notación científica ni signos adicionales.

### Cálculo

**FR-007.** Cuando ambos valores sean válidos, el sistema debe calcular con precisión decimal el monto teórico de compra con la fórmula:

```text
Monto teórico = Tope / (Porcentaje / 100)
```

**FR-008.** El sistema debe mostrar el monto teórico redondeado convencionalmente a dos decimales, redondeando hacia arriba cuando el tercer decimal sea `5` o mayor.

**FR-009.** El sistema debe calcular el máximo seguro truncando hacia abajo el valor teórico exacto a dos decimales, sin calcularlo a partir del valor teórico ya redondeado.

**FR-010.** El máximo seguro debe ser el mayor importe de compra expresable en centavos cuya aplicación exacta del porcentaje no supere el tope. Esta es una política conservadora del producto y no simula reglas específicas de redondeo de cada promoción.

**FR-011.** El sistema debe recalcular ambos resultados cada vez que el usuario modifique cualquiera de los campos válidos.

**FR-012.** El sistema no debe mostrar un resultado parcial o desactualizado cuando una entrada pase a ser inválida o quede vacía.

### Presentación y explicación

**FR-013.** El sistema debe mostrar el monto teórico y el máximo seguro como resultados separados y con el mismo peso visual.

**FR-014.** El sistema debe presentar los importes con formato de pesos argentinos y dos decimales.

**FR-015.** El sistema debe indicar cuál de los resultados es el máximo seguro recomendado para evitar superar el tope.

**FR-016.** El sistema debe mostrar la fórmula utilizada en lenguaje comprensible.

**FR-017.** El sistema debe explicar brevemente que el monto teórico puede contener fracciones de centavo y que el máximo seguro se trunca hacia abajo a dos decimales.

**FR-018.** El sistema debe incluir un ejemplo visible o fácilmente consultable con `15%` de descuento y `$1000` de tope, cuyo resultado esperado sea `$6666,67` teórico y `$6666,66` seguro.

**FR-019.** El sistema debe mostrar una advertencia visible indicando que el resultado es orientativo, que “tope de reintegro” se interpreta como el límite del descuento porcentual ingresado y que deben revisarse los términos y condiciones de la promoción real.

**FR-020.** La interfaz debe usar una jerarquía visual de complejidad media, con color y ambos resultados igualmente prominentes; el color no debe ser el único medio para comunicar el estado o la recomendación.

## 6. Requisitos no funcionales

**NFR-001. Usabilidad.** En una revisión manual, una persona que no haya usado antes la página debe poder ingresar `15` y `1000`, obtener ambos resultados y distinguir el máximo seguro en un máximo de `60 segundos`, sin navegación adicional ni ayuda del evaluador.

**NFR-002. Responsive.** La interfaz debe mostrar toda la información sin desplazamiento horizontal en viewports de `320x568` y `1280x720`, como mínimo.

**NFR-003. Accesibilidad básica.** Cada campo debe tener una etiqueta asociada, foco visible y mensajes de error comprensibles. Los resultados deben poder identificarse mediante texto, no solo por color.

**NFR-004. Rendimiento.** El cálculo debe actualizarse en un máximo de `50 ms` después de un cambio válido en una ejecución local, medido con `performance.now()` en diez cambios consecutivos y tomando el percentil 95, sin llamadas de red.

**NFR-005. Privacidad.** El sistema no debe enviar ni guardar los valores ingresados. Los cálculos vivirán únicamente en el estado en memoria de la página y se perderán al cerrarla o recargarla; no se utilizarán cookies, almacenamiento local ni sesión de servidor.

**NFR-006. Compatibilidad.** La primera versión debe funcionar con JavaScript habilitado en Chrome 120+, Edge 120+, Firefox 120+ y Safari 17+, en sus variantes de escritorio y móvil cuando existan. El informe de pruebas debe registrar las versiones concretas verificadas.

**NFR-007. Mantenibilidad.** La lógica de validación y cálculo debe estar expuesta en una unidad testeable que pueda ejecutarse sin DOM ni eventos de interfaz, con pruebas unitarias para las reglas de cálculo y validación.

## 7. Reglas de negocio y supuestos

- [ASSUMPTION] El porcentaje de descuento se aplica sobre el gasto total de la compra.
- [ASSUMPTION] En este MVP, “tope de reintegro” representa el importe máximo del descuento porcentual que puede reconocerse; el resultado mostrado siempre es un monto de compra, no el importe del reintegro.
- [ASSUMPTION] La promoción no tiene mínimo de compra ni condiciones adicionales.
- [ASSUMPTION] La aritmética se realiza con precisión decimal; los importes de compra se expresan en centavos y el monto teórico se redondea convencionalmente a dos decimales.
- [ASSUMPTION] El máximo seguro se obtiene truncando el valor teórico exacto hacia abajo a centavos. Es la política prudente del producto para evitar exceder el tope y no una garantía sobre las reglas de una entidad.
- El resultado es orientativo y no reemplaza los términos y condiciones de la promoción real.
- Las promociones que redondean el descuento por transacción pueden producir resultados distintos; esa particularidad queda fuera del MVP y se comunicará mediante FR-019.

## 8. Criterios de aceptación del MVP

- **AC-001** valida FR-007, FR-008, FR-009 y FR-010: con `15%` y `$1000`, la página muestra `$6666,67` como monto teórico y `$6666,66` como máximo seguro; el valor seguro se obtiene del valor exacto antes de redondear la presentación.
- **AC-002** valida FR-003, FR-004 y FR-005: se aceptan `15`, `15,50`, `15.50` y `1000,99`; se rechazan `0`, `-1`, `100,01`, `1000,999`, `1.000,50`, `1e3`, `1000000000` y valores mayores al límite.
- **AC-003** valida FR-006 y FR-012: con un campo vacío o inválido, se muestra un error asociado al campo y no se presentan resultados como válidos.
- **AC-004** valida FR-006a: `1000,50` y `1000.50` producen el mismo valor interno y se muestran con formato monetario argentino.
- **AC-005** valida FR-011: al cambiar cualquiera de los campos desde un estado válido, ambos resultados se actualizan sin recargar la página; al pasar a inválido, los resultados se ocultan.
- **AC-006** valida FR-013, FR-014, FR-015, FR-016, FR-017, FR-018 y FR-019: la interfaz presenta ambos resultados con igual prominencia, muestra la fórmula, la explicación de las fracciones de centavo y el truncamiento, el ejemplo normativo y la advertencia orientativa.
- **AC-007** valida FR-020 y NFR-002: en viewports de `320x568` y `1280x720` no hay desplazamiento horizontal, ambos resultados mantienen igual prominencia y ningún estado depende exclusivamente del color.
- **AC-008** valida NFR-003: cada campo tiene una etiqueta asociada, foco visible por teclado, error asociado al campo y resultados identificables mediante texto.
- **AC-009** valida NFR-004: en una ejecución local, el percentil 95 del tiempo entre un cambio válido y la actualización de resultados es inferior o igual a `50 ms` en diez cambios consecutivos medidos con `performance.now()`.
- **AC-010** valida NFR-005: una inspección de red y almacenamiento del navegador confirma que no se envían valores ni se escriben cookies, almacenamiento local o sesión de servidor; al recargar, los datos desaparecen.
- **AC-011** valida NFR-006: la página funciona en Chrome 120+, Edge 120+, Firefox 120+ y Safari 17+; el informe registra las versiones de escritorio y móvil verificadas.
- **AC-012** valida NFR-007: la suite unitaria ejecuta la unidad de validación y cálculo sin DOM y cubre el ejemplo principal, valores decimales, `0,01%`, `100%`, topes con centavos, fracciones de centavo y entradas inválidas.
- **AC-013** valida FR-001 y FR-002: la página muestra etiquetas visibles y asociadas a los campos “Porcentaje de descuento” y “Tope de reintegro”.
- **AC-014** valida NFR-001: en una prueba manual, una persona sin experiencia previa completa el caso `15` y `1000`, identifica el máximo seguro y termina en un máximo de `60 segundos` sin ayuda.

## 9. Métricas de éxito

Para esta práctica técnica, el éxito se medirá principalmente por criterios funcionales y de aprendizaje:

- 100% de los casos enumerados en AC-001, AC-002 y AC-012 pasan.
- El flujo completo puede ejecutarse sin backend, persistencia ni dependencias externas de datos.
- En una revisión manual con una persona y el ejemplo de AC-001, la persona identifica correctamente el monto seguro y señala la explicación del redondeo en menos de un minuto.
- Como contramétrica, la diferencia entre monto teórico y máximo seguro solo aparece cuando el valor exacto contiene una fracción de centavo; el máximo seguro nunca excede el tope bajo la regla definida.
- El PRD, la implementación y las pruebas mantienen trazabilidad mediante los IDs `FR`, `NFR` y `AC`.

## 10. Riesgos y mitigaciones

- **Reglas distintas de promociones reales:** mostrar una advertencia de que el cálculo es orientativo y dejar las condiciones específicas fuera del MVP.
- **Errores de precisión decimal:** definir el comportamiento a dos decimales y cubrirlo con pruebas de cálculo, incluidos casos con fracciones de centavo.
- **Confusión entre reintegro y gasto:** etiquetar ambos resultados explícitamente como importes de compra y acompañarlos con una explicación breve.
- **Alcance excesivo durante la práctica:** mantener fuera del MVP la persistencia, las integraciones y las reglas particulares de entidades.

## 11. Fuera de alcance para iteraciones posteriores

La comparación de múltiples promociones, mínimos de compra, fechas de vigencia, límites mensuales, cuotas y condiciones particulares podrá evaluarse después de validar el cálculo principal. Ninguna de esas capacidades es necesaria para completar el MVP.
