# Calculadora de Tope de Reintegro

Calcula el importe de compra óptimo para aprovechar promociones con descuento porcentual y tope de reintegro.

## Problema

Negocios de todo tipo —bancos, billeteras digitales, gasolineras, restaurantes, comercios— ofrecen promociones como *"15% de descuento con tope de $10.000"*. Para maximizar el beneficio sin exceder el tope, el usuario necesita saber cuánto gastar exactamente. Este cálculo manual es propenso a errores y confuso.

## Solución

Una aplicación web estática, responsive y sin backend que calcula al instante:

- **Monto teórico de compra** – el punto exacto donde el reintegro iguala el tope.
- **Máximo seguro de compra** – el mismo valor truncado, garantizando que el reintegro no supere el tope.

## Demo

Al publicar la rama `main` en GitHub, la demo queda disponible en:

<https://dap-dev-82.github.io/calculadoraHub/>

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
| Tipografía | Nunito local (WOFF2) |
| Backend    | Ninguno (100% estático) |

## Uso

1. Cloná el repositorio.
2. Ejecutá `npm install`.
3. Ejecutá `npm run dev`.
4. Abrí la URL local que muestra Vite.

La aplicación usa Nunito local y no carga fuentes desde Google Fonts ni otros servicios externos.

## Estado del proyecto

La calculadora está implementada. GitHub Actions valida el build, las pruebas unitarias y las pruebas browser antes de desplegar `dist/` en GitHub Pages al actualizar `main`.

## Despliegue

1. En GitHub, abrí **Settings → Pages** del repositorio.
2. En **Build and deployment**, seleccioná **GitHub Actions** como fuente.
3. Hacé push o merge a `main`, o ejecutá manualmente el workflow **Deploy GitHub Pages** desde la pestaña Actions.

El build conserva `base: './'` en Vite. Así los recursos se resuelven de forma relativa y funcionan en la URL de Pages del repositorio y en la subruta estática `/calculadora/` usada por las pruebas.

## Licencia

MIT
