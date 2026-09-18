import assert from 'node:assert/strict'
import { test } from 'node:test'

import { findDestructiveChanges } from '../scripts/assert-safe-terraform-plan.mjs'

test('deleteとreplacementを破壊的変更として列挙する', () => {
  const changes = findDestructiveChanges({
    resource_changes: [
      { address: 'safe.example', change: { actions: ['update'] } },
      { address: 'delete.example', change: { actions: ['delete'] } },
      {
        address: 'replace.example',
        change: { actions: ['delete', 'create'] },
      },
    ],
  })

  assert.deepEqual(changes, ['delete.example', 'replace.example'])
})
