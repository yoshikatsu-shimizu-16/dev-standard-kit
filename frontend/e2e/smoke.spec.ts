import { expect, test } from '@playwright/test'

test('frontend starter renders', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: 'Frontend starter' }),
  ).toBeVisible()
})
