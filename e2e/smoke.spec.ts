import { expect, test } from '@playwright/test'

test('home opens in a mobile viewport', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Salmon Manager' })).toBeVisible()
})
