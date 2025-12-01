import { test, expect } from '@playwright/test';
import { createApi } from '../playwright/lib/api.lib';
import { createRetro } from '../playwright/lib/retro.lib';

test.describe('API Testing', () => {
  test.beforeEach(async ({ page }) => {
    const retro = createRetro(page);
    await retro.visit();

    await page.locator('[href="/new"]').click();
    // wait for page to load
    await expect(page.locator('[class*="Header__HeaderContainer"]')).toBeVisible();
    await page.waitForTimeout(1000);
  });

  test('Create an board item using the API', async ({ page }) => {
    const api = createApi(page);
    await api.createItem();

    // assert item has been added
    // await expect(page.locator('div', { hasText: 'hey I sent this via a POST request!' })).toBeVisible();
  });
});
