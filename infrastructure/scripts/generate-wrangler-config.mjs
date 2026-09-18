import { mkdir, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'

/** 環境変数からWorker bindingの再現可能なWrangler設定を組み立てる。 */
export function buildWranglerConfig(environment = process.env) {
  return {
    $schema: 'node_modules/wrangler/config-schema.json',
    name: environment.WORKER_NAME ?? 'dev-standard-kit-backend',
    main: 'src/index.ts',
    compatibility_date: environment.WRANGLER_COMPATIBILITY_DATE ?? '2026-08-22',
    d1_databases: [
      {
        binding: 'DB',
        database_name:
          environment.D1_DATABASE_NAME ?? 'dev-standard-kit-tasks',
        database_id: environment.D1_DATABASE_ID ?? 'local',
        migrations_dir: '../infrastructure/d1/migrations',
      },
    ],
    r2_buckets: [
      {
        binding: 'OBJECTS',
        bucket_name: environment.R2_BUCKET_NAME ?? 'dev-standard-kit-assets',
      },
    ],
    assets: {
      directory: '../frontend/dist',
      not_found_handling: 'single-page-application',
      run_worker_first: ['/api/*'],
    },
  }
}

/** 設定をJSONCとして保存し、親ディレクトリも必要なら作成する。 */
export async function writeWranglerConfig(outputPath, environment = process.env) {
  await mkdir(dirname(outputPath), { recursive: true })
  await writeFile(
    outputPath,
    `${JSON.stringify(buildWranglerConfig(environment), null, 2)}\n`,
    'utf8',
  )
}

/** CLI引数を解釈してbackendのWrangler設定を生成する。 */
async function main() {
  const outputIndex = process.argv.indexOf('--output')
  const outputPath =
    outputIndex >= 0
      ? process.argv[outputIndex + 1]
      : 'backend/wrangler.jsonc'

  if (!outputPath || outputPath.startsWith('--')) {
    throw new Error('Usage: node generate-wrangler-config.mjs [--output path]')
  }

  await writeWranglerConfig(outputPath)
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await main()
}
