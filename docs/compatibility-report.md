# Informe de Compatibilidad

Producto: Calculadora de Tope de Reintegro  
Versión del artefacto: consultar `dist/version.json` del build evaluado.  
Fecha: 2026-07-29

## Evidencia automatizada

| Motor | Entorno | Viewports | Resultado | Evidencia |
| --- | --- | --- | --- | --- |
| Chromium bundled 151.0.7922.34 por Playwright 1.62.0 | Linux 6.6.87.2-microsoft-standard-WSL2 | 320x568, 375x667, 568x320, 768x1024, 1280x720 | Aprobado | `npm run test:browser` |

La prueba cubre estados inicial, válido, inválido, advertencia expandida, ejemplo, importe máximo, escala de texto al 200%, privacidad, rendimiento y subruta estática.

Los motores Firefox `153.0` y WebKit `26.5` también lanzaron correctamente en Linux tras la instalación manual de dependencias. No se ejecutó la suite contra ellos ni esta evidencia certifica Firefox, Safari ni sus variantes de dispositivo.

## Certificación pendiente

| Navegador comprometido | Desktop | Mobile | Estado |
| --- | --- | --- | --- |
| Chrome 120+ | Pendiente en navegador real | Pendiente en dispositivo/emulador certificado | No certificado |
| Edge 120+ | Pendiente en navegador real | Pendiente en dispositivo/emulador certificado | No certificado |
| Firefox 120+ | Pendiente en navegador real | Pendiente en dispositivo/emulador certificado | No certificado |
| Safari 17+ | Pendiente en macOS | Pendiente en iOS | No certificado |

No hay dispositivos ni un servicio de navegadores reales disponible en este entorno. WebKit bundled no se presenta como Safari. Vato es responsable de seleccionar el servicio de navegadores reales y de adjuntar evidencia separada con producto, versión, sistema operativo, viewport y resultado antes de certificar NFR-006.
