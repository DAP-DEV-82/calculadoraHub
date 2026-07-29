import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourcePaths = ['index.html', 'package.json', 'package-lock.json', 'vite.config.js', 'scripts/write-version.js']

async function collectSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) return collectSourceFiles(entryPath)
    return [entryPath]
  }))

  return files.flat()
}

const sourceFiles = [
  ...sourcePaths.map((sourcePath) => path.join(rootDirectory, sourcePath)),
  ...(await collectSourceFiles(path.join(rootDirectory, 'src'))),
].sort()

const hash = createHash('sha256')
for (const sourceFile of sourceFiles) {
  hash.update(path.relative(rootDirectory, sourceFile))
  hash.update(await readFile(sourceFile))
}

function git(command) {
  try {
    return execFileSync('git', command, { cwd: rootDirectory, encoding: 'utf8' }).trim()
  } catch {
    return 'NO_VCS'
  }
}

await mkdir(path.join(rootDirectory, 'dist'), { recursive: true })
await writeFile(
  path.join(rootDirectory, 'dist', 'version.json'),
  `${JSON.stringify({
    commit: git(['rev-parse', 'HEAD']),
    dirty: git(['status', '--porcelain']) !== '',
    sourceDigest: hash.digest('hex'),
  }, null, 2)}\n`,
)
