import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../core/BasePage";

export class SearchPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get searchInput(): Locator{
    return this.page.locator("#search-field");
  }

  private get noResultsMessage(): Locator{
    return this.page.getByText(/no results/i);
  }

  async searchForProduct(searchTerm: string): Promise<void> {
    await this.searchInput.fill(searchTerm);
    await this.searchInput.press("Enter");
  }

  async verifyNoResults(): Promise<void> {
    await expect(this.noResultsMessage).toBeVisible();
  }
}