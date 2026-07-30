# Contrato de Despliegue

El hosting específico queda pendiente de selección. Debe publicar el contenido de `dist/` por HTTPS, tanto en raíz como en una subruta estática.

## Headers

| Recurso | Header requerido |
| --- | --- |
| HTTPS | `Strict-Transport-Security: max-age=31536000; includeSubDomains` una vez que el dominio funcione exclusivamente por HTTPS |
| `index.html` | `Cache-Control: no-cache, max-age=0, must-revalidate` |
| `version.json` | `Cache-Control: no-cache, max-age=0, must-revalidate` |
| Assets con hash bajo `assets/` | `Cache-Control: public, max-age=31536000, immutable` |
| Tipos | `X-Content-Type-Options: nosniff` |

## Operación

- No registrar URL, body, query string ni valores de formulario enviados por visitantes.
- Antes de publicar, ejecutar `npm ci`, `npm test`, `npm run test:browser` y `npm run build`.
- Realizar smoke test de carga y cálculo `15` / `10000` contra la URL HTTPS publicada.
- Confirmar que `dist/version.json` contiene `commit`, `dirty` y `sourceDigest`.

## Rollback

Conservar el `dist/` y `version.json` de cada entrega aprobada. Para revertir, publicar el artefacto anterior identificado por `sourceDigest`, invalidar únicamente HTML/versionado si el proveedor lo requiere y repetir el smoke test.
