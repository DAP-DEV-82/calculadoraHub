import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDirectory = path.join(rootDirectory, 'dist')
const mountPath = '/calculadora/'
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
}

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url, 'http://127.0.0.1')
  if (!requestUrl.pathname.startsWith(mountPath)) {
    response.writeHead(404).end()
    return
  }

  const relativePath = requestUrl.pathname.slice(mountPath.length) || 'index.html'
  const filePath = path.resolve(distDirectory, relativePath)
  if (!filePath.startsWith(`${distDirectory}${path.sep}`)) {
    response.writeHead(403).end()
    return
  }

  try {
    const content = await readFile(filePath)
    response.writeHead(200, {
      'content-type': contentTypes[path.extname(filePath)] ?? 'application/octet-stream',
    }).end(content)
  } catch {
    response.writeHead(404).end()
  }
})

server.listen(4174, '127.0.0.1')
process.on('SIGTERM', () => server.close())
process.on('SIGINT', () => server.close())
