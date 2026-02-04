import { Page, Locator } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async getPageUrl(): Promise<string> {
    return this.page.url();
  }
  
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async waitForElement(locator: Locator, timeout = 5000): Promise<void> {
    await locator.waitFor({ timeout });
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }
}