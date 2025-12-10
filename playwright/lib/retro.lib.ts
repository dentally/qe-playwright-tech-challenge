import { Page, expect } from '@playwright/test';

class _Retro {
  constructor(private page: Page) {}

  async visit() {
    await this.page.goto("https://www.retrotool.app");
    const h1 = this.page.locator("h1");
    await expect(h1).toContainText("Retro tool");
  }

  async addTicket(ticketType: string, content: string) {
    await this.page.locator(`[placeholder="${ticketType}"]`).fill(content);
    await this.page.locator(`[placeholder="${ticketType}"]`).press('Enter');
  }

  async setToVote() {
    await this.page.getByRole('button', { name: 'Group & vote comments' }).click();
    await this.page.locator('reach-portal').getByText('Group & vote comments').click()
    await expect(this.page.getByRole('button', { name: 'Discuss and add action items' })).toBeVisible();
  }

  async assertVotes(item: string, count: number) {
    const itemContainer = this.page.locator('div', { hasText: item })
      .locator('[class*="BaseItem__BaseItemContainer"]')
      .first();

    const voteElement = itemContainer.locator('[color="grey"]', { hasText: count.toString() });
    await expect(voteElement).toBeVisible();
  }

  async setToActions() {
    await this.page.getByRole('button', { name: 'Discuss and add action items' }).click();
  }

  async setPassword(password: string) {
    await this.page.locator('svg', { hasText: 'Retro not protected by password' }).click();
    await this.page.locator('[type="password"]').fill(password);
    await this.page.locator('#password').click();
  }

  async removePassword(password: string) {
    await this.page.locator('svg', { hasText: 'Retro protected by password' }).click();
    await this.page.locator('[type="password"]').fill(password);
    await this.page.getByText('Remove Password').clear();
    await expect(this.page.locator('svg', { hasText: 'Retro not protected by password' })).toBeVisible();
  }
}

export const ticketTypes = {
  GOOD: "It worked well that...",
  BAD: "We could improve...",
  QUESTIONS: "I want to ask about...",
  ACTIONS: "We need to do...",
} as const;

export const createRetro = (page: Page) => new _Retro(page);
