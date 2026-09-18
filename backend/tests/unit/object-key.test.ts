import { describe, expect, it } from 'vitest'

import { createObjectKey } from '../../src/features/storage/object-key'

describe('Object storage key', () => {
  it('namespaceとidentifierとfilenameを安全に連結する', () => {
    expect(createObjectKey('avatars', 'user/1', 'profile image.png')).toBe(
      'avatars/user%2F1/profile%20image.png',
    )
  })
})
