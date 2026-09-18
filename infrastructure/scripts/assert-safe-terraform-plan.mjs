import { readFile } from 'node:fs/promises'

/** Terraform plan JSONからdeleteを含むresource addressを抽出する。 */
export function findDestructiveChanges(plan) {
  return (plan.resource_changes ?? [])
    .filter((change) => change.change?.actions?.includes('delete'))
    .map((change) => change.address)
}

/** 通常applyでresource削除や置換が紛れ込むことを防ぐ。 */
async function main() {
  const planPath = process.argv[2]
  if (!planPath) {
    throw new Error('Usage: node assert-safe-terraform-plan.mjs <plan.json>')
  }

  const plan = JSON.parse(await readFile(planPath, 'utf8'))
  const destructiveChanges = findDestructiveChanges(plan)
  if (destructiveChanges.length === 0) return

  if (process.env.ALLOW_DESTROY !== 'true') {
    throw new Error(
      `Destructive Terraform changes require explicit approval: ${destructiveChanges.join(', ')}`,
    )
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await main()
}
