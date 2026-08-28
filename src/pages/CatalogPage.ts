import { Locator, Page } from "@playwright/test";
import { BasePage } from "../core/BasePage";

/**
 * Represents the product catalog page.
 */
export class CatalogPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    /**
     * Returns the product link based on the product name.
     */
    private getProductLink(productName: string): Locator {
        return this.page.getByText(productName, {
            exact: true
        });
    }

    /**
     * Opens the details page for the specified product.
     */
    async openProduct(productName: string): Promise<void> {
        await this.getProductLink(productName).click();
    }
}