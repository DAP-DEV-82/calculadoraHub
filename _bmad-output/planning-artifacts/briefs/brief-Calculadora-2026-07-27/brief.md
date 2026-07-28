---
title: "Calculadora de Tope de Reintegro"
status: draft
created: 2026-07-27
updated: 2026-07-27
---

# Product Brief: Calculadora de Tope de Reintegro

## Resumen ejecutivo

La Calculadora de Tope de Reintegro es una página web que permite ingresar el porcentaje de descuento de una promoción y su tope máximo de reintegro en pesos argentinos.

Su propósito es responder rápidamente cuánto debe gastar una persona para aprovechar al máximo la promoción sin gastar de más. La herramienta mostrará tanto el monto teórico necesario como el monto máximo seguro, considerando el redondeo a centavos y evitando superar el tope.

Será una aplicación web simple, responsive y sin backend. Los datos serán temporales y los resultados se recalcularán automáticamente cuando cambien los valores ingresados.

## El problema

Las promociones con descuento porcentual y tope de reintegro obligan al usuario a hacer cálculos manuales. Un error frecuente es gastar más de lo necesario, porque el descuento adicional sobre el excedente ya no se reintegra.

Además, el resultado matemático puede incluir fracciones de centavo. Por eso, redondear el monto de compra hacia arriba podría provocar que el descuento calculado supere levemente el tope promocional.

## La solución

La página permitirá ingresar el porcentaje de descuento y el tope máximo de reintegro. Calculará automáticamente el importe de compra necesario y mostrará dos resultados con el mismo peso visual:

- **Monto teórico de compra:** resultado matemático redondeado a dos decimales.
- **Máximo seguro de compra:** resultado truncado a dos decimales para garantizar que el descuento calculado no supere el tope.

Ejemplo con 15% de descuento y tope de `$10000`:

- Monto teórico de compra: `$66.666,67`.
- Máximo seguro de compra: `$66.666,66`.

La interfaz explicará brevemente que la diferencia se debe al redondeo del importe de compra a centavos. El máximo seguro será el resultado recomendado para quien quiera evitar superar el tope.

### Reglas de cálculo

```text
Monto teórico = Tope / (Porcentaje / 100)
Máximo seguro = truncar(Monto teórico a dos decimales)
```

El porcentaje válido será mayor que 0% y menor o igual que 100%. El tope deberá ser un importe positivo expresado en pesos, con hasta dos decimales. La aplicación mostrará errores y no calculará mientras falte un dato o haya un valor inválido.

## Qué diferencia a la solución

La solución se concentra en un caso específico que suele resolverse con cálculos manuales: cuánto conviene gastar antes de que el descuento alcance su límite. Su diferenciación está en mostrar claramente el resultado matemático y el importe prudente, con formato argentino y sin funciones accesorias que distraigan.

## A quién sirve

El usuario principal es una persona que consulta promociones de bancos, tarjetas, billeteras virtuales o comercios, con descuentos porcentuales y límites de reintegro.

Necesita conocer rápidamente el importe máximo conveniente de compra y entender por qué el valor seguro puede diferir del valor teórico por unos centavos. El éxito para este usuario consiste en ingresar dos datos y obtener una respuesta clara sin realizar cálculos adicionales.

## Flujo principal

1. El usuario ingresa el porcentaje de descuento y el tope de reintegro.
2. La página valida que ambos valores sean positivos y estén dentro de los rangos permitidos.
3. Los resultados se recalculan automáticamente al cambiar cualquiera de los campos.
4. El usuario compara el monto teórico con el máximo seguro y utiliza este último como referencia prudente.

## Criterios de éxito

- El usuario puede completar un cálculo sin ayuda adicional después de identificar los dos campos.
- Los resultados se actualizan al modificar cualquiera de los campos.
- El importe de compra seguro debe producir un descuento que no supere el tope al aplicar la precisión monetaria definida.
- Los importes se muestran correctamente en pesos argentinos.
- Los campos inválidos reciben mensajes claros y no generan resultados engañosos.
- La interfaz es usable en dispositivos móviles y escritorio.
- La fórmula y la diferencia entre ambos resultados se comprenden sin instrucciones extensas.
- En pruebas representativas, la lógica produce resultados correctos para valores enteros, decimales, porcentajes pequeños y casos inválidos.
- El cálculo puede completarse en una sola interacción, sin navegación adicional ni registro.

## Alcance inicial

### Incluido

- Página única responsive.
- Campos para porcentaje y tope de reintegro.
- Cálculo automático.
- Monto teórico y máximo seguro.
- Formato monetario argentino.
- Validación de campos vacíos y de valores negativos, iguales a cero o fuera de rango.
- Explicación breve de fórmula y redondeo.
- Diseño visual de complejidad media, con color y jerarquía clara.
- Accesibilidad básica de formularios: etiquetas asociadas, foco visible y mensajes de error comprensibles.
- Pruebas de la lógica matemática y validaciones básicas.

### Restricciones

- Los cálculos no se guardan y desaparecen al cerrar o recargar la página.
- La primera versión será una aplicación estática sin backend ni base de datos.
- El soporte inicial se limitará a pesos argentinos y navegadores modernos con JavaScript habilitado.

### Fuera de alcance

- Inicio de sesión o cuentas de usuario.
- Guardado de cálculos o historial de promociones.
- Consulta automática de promociones bancarias.
- Cálculo de cuotas, costos financieros o límites de tarjetas.
- Aplicación de condiciones especiales de cada comercio o entidad.
- Soporte inicial para monedas distintas del peso argentino.

## Supuestos y riesgos

### Supuestos

- El porcentaje se aplica sobre el total gastado.
- El tope representa el importe máximo que puede reconocerse como descuento o reintegro.
- Se supone que la promoción no tiene un mínimo de compra ni condiciones adicionales.
- El cálculo utiliza dos decimales como precisión monetaria.

### Riesgos y mitigaciones

- Algunas promociones aplican reglas propias de redondeo por transacción. La interfaz indicará que el resultado es orientativo y que deben revisarse los términos y condiciones de la promoción.
- El término “reintegro” puede representar condiciones distintas según la entidad. El MVP documentará que interpreta el valor como el tope del descuento porcentual indicado por el usuario.

## Visión

Si la calculadora demuestra utilidad, podrá evolucionar posteriormente para contemplar mínimos de compra, fechas de vigencia y condiciones específicas, sin ampliar el MVP hasta validar primero su caso de uso principal.
