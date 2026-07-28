# Calculadora de Tope de Reintegro

Calcula el importe de compra óptimo para aprovechar promociones con descuento porcentual y tope de reintegro.

## Problema

Negocios de todo tipo —bancos, billeteras digitales, gasolineras, restaurantes, comercios— ofrecen promociones como *"15% de descuento con tope de $10.000"*. Para maximizar el beneficio sin exceder el tope, el usuario necesita saber cuánto gastar exactamente. Este cálculo manual es propenso a errores y confuso.

## Solución

Una aplicación web estática, responsive y sin backend que calcula al instante:

- **Monto teórico de compra** – el punto exacto donde el reintegro iguala el tope.
- **Máximo seguro de compra** – el mismo valor truncado, garantizando que el reintegro no supere el tope.

## Demo

(por implementar)

Ingresá el porcentaje de descuento y el tope de reintegro. Los resultados se actualizan en tiempo real, sin botones ni recargas.

## Características

- Cálculo en tiempo real
- Formato de pesos argentinos ($10.000,00)
- Acepta coma y punto como separador decimal
- Validación completa de entrada
- Diseño responsive (320 px en adelante)
- Sin backend, sin cookies, sin registro
- Accesible (ARIA, teclado, foco visible)

## Stack técnico

| Capa       | Tecnología            |
|------------|-----------------------|
| Lenguaje   | JavaScript (ES6+)     |
| Maquetado  | HTML5                 |
| Estilos    | CSS3                  |
| Tipografía | Nunito (Google Fonts) |
| Backend    | Ninguno (100% estático) |

## Uso

1. Cloná el repositorio.
2. Abrí `index.html` en tu navegador.
3. Ingresá porcentaje y tope.
4. Leé los resultados al instante.

No requiere instalación de dependencias ni servidor.

## Estado del proyecto

**Planificación completa.** PRD y diseño UX finalizados. Pendiente de implementación.

## Licencia

MIT
