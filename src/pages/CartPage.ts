import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../core/BasePage";

export class CartPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    /*
     * Returns the cart item using the product name 
    */

    private getCartItem(productName: string): Locator {
        return this.page
            .locator(".row")
            .filter({
                has: this.page.getByRole("link", {
                    name: new RegExp(productName, "i")
                })
            });

    }

    /*
     * Returns the locator for the empty cart 
    */
    private get emptyCartMessage(): Locator {
        return this.page.getByText(/your cart is empty/i);
    }

    /*
     * Returns the locator for cart drawer 
    */
    private get cartDrawer(): Locator {
        return this.page.locator("#drawer");
    }

    /*
     * Returns the locator of the loader 
    */
    private get cartLoader(): Locator {
        return this.page.locator("#drawer .spinner");
    }

    /*
     * Verifies that the specified product is present in the cart.
    */
    async verifyProductInCart(productName: string): Promise<void> {
        await expect(this.getCartItem(productName)).toBeVisible();
    }


    /*
     * Removes the specified product from the cart.
    */
    async removeProduct(productName: string): Promise<void> {
        await this.getCartItem(productName)
            .getByRole("link", { name: "Remove" })
            .click();
    }

    /*
     * Verifies that the shopping cart is empty.
    */
    async verifyCartIsEmpty(): Promise<void> {
        await expect(this.emptyCartMessage).toBeVisible();
    }

    /*
     * Waits until the shopping cart content has finished loading.
    */
    async waitForCartToLoad(): Promise<void> {
        await expect(this.cartDrawer).toBeVisible();
        await expect(this.cartLoader).toBeHidden();
    }
}