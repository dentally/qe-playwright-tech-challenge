import { test, expect } from '@playwright/test';
import { createRetro, ticketTypes } from '../playwright/lib/retro.lib';
import boardItems from '../playwright/fixtures/items.json';
import boardVotes from '../playwright/fixtures/votes.json';

test.describe('Retro', () => {
  test.beforeEach(async ({ page }) => {
    const retro = createRetro(page);
    await retro.visit();

    await page.locator('[href="/new"]').click();
    // wait for page to load
    await expect(page.locator('[class*="Header__HeaderContainer"]')).toBeVisible();
    await page.waitForTimeout(1000);
  });

  test.only('Set a board password', async ({ page }) => {
    const retro = createRetro(page);
    await retro.setPassword('1234');
    await retro.removePassword('1234');
  });

  test('Complete a retro', async ({ page }) => {
    const retro = createRetro(page);

    for (const item of boardItems.good) {
      await retro.addTicket(ticketTypes.GOOD, item);
    }

    for (const item of boardItems.bad) {
      await retro.addTicket(ticketTypes.BAD, item);
    }

    for (const item of boardItems.questions) {
      await retro.addTicket(ticketTypes.QUESTIONS, item);
    }

    await retro.setToVote();
    await retro.setToActions();

    // to do
    // add action items found in boardItems.actions and reuse retro.addTicket
    // assert the action item are listed
    // finish the retro and assert the retro is no longer active
  });
});
