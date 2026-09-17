import { spawnSync } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const result = spawnSync(npmCommand, ['run', 'harness:verify'], {
  cwd: repoRoot,
  encoding: 'utf8',
  env: process.env,
  maxBuffer: 16 * 1024 * 1024,
  timeout: 1_100_000,
})

if (result.status === 0) {
  process.exit(0)
}

const output = [result.stdout, result.stderr].filter(Boolean).join('\n').trim()
const tail = output.slice(-8_000)
const failure = [
  'Harness verification failed.',
  '完了扱いにせず、以下の失敗を修正してから再度停止してください。',
  'npm run harness:verify が PASS するまで作業を継続してください。',
  result.error ? `hook error: ${result.error.message}` : '',
  tail,
]
  .filter(Boolean)
  .join('\n\n')

process.stderr.write(`${failure}\n`)
process.exit(2)
