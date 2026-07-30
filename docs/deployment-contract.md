# Contrato de Despliegue

GitHub Pages publica el contenido de `dist/` por HTTPS tras un push a `main`. El build conserva rutas relativas (`base: './'`), por lo que funciona en la URL de Pages del repositorio y en una subruta estática como `/calculadora/`.

La URL de GitHub Pages para este repositorio es `https://dap-dev-82.github.io/calculadoraHub/`; GitHub Pages fija la subruta al nombre del repositorio, no a `/calculadora/`.

## Headers

| Recurso | Header requerido |
| --- | --- |
| HTTPS | `Strict-Transport-Security: max-age=31536000; includeSubDomains` una vez que el dominio funcione exclusivamente por HTTPS |
| `index.html` | `Cache-Control: no-cache, max-age=0, must-revalidate` |
| `version.json` | `Cache-Control: no-cache, max-age=0, must-revalidate` |
| Assets con hash bajo `assets/` | `Cache-Control: public, max-age=31536000, immutable` |
| Tipos | `X-Content-Type-Options: nosniff` |

GitHub Pages administra TLS y sus propios headers/cache. Si se requiere controlar todos los headers de esta tabla, usar un hosting estático con configuración de CDN o proxy delante de Pages.

## Operación

- No registrar URL, body, query string ni valores de formulario enviados por visitantes.
- El workflow `.github/workflows/deploy-pages.yml` ejecuta `npm ci`, instala Chromium, corre `npm test`, `npm run test:browser`, construye y publica el artefacto de Pages.
- Realizar smoke test de carga y cálculo `15` / `10000` contra la URL HTTPS publicada.
- Confirmar que `dist/version.json` contiene `commit`, `dirty` y `sourceDigest`.

## Rollback

Conservar el `dist/` y `version.json` de cada entrega aprobada. Para revertir, publicar el artefacto anterior identificado por `sourceDigest`, invalidar únicamente HTML/versionado si el proveedor lo requiere y repetir el smoke test.
