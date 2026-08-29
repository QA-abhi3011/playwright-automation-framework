import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../core/BasePage";


export class ProductDetailsPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    /**
     * Returns the locator for the product title displayed
     * on the product details page.
    */

    private get productTitle(): Locator {
        return this.page.locator("h1[itemprop='name']");
    }

    /**
     * Returns the locator for the product price.
    */

    private get productPrice(): Locator {
        return this.page.locator("#product-price .product-price");
    }

    /*
     * Returns the  locator of the add to cart button 
    */
    private get addToCartBtn(): Locator{
        return this.page.locator("#add");
    }


    /*
     * Returns the Product title and price
    */
    async getProductName(): Promise<string> {
        return (await this.productTitle.textContent())?.trim() ?? "";
    }

    async getProductPrice(): Promise<string> {
        return (await this.productPrice.textContent())?.trim() ?? "";
    }

    /*
     * Adds the currently displayed product to the shopping cart. 
    */
    async addProductToCart(){
        await this.addToCartBtn.click();
    }

    /*
     * Assertions for the name and price
    */

    async verifyProductName(expectedProductName: string): Promise<void>{
        await expect(this.productTitle).toHaveText(expectedProductName);
    }

    async verifyProductPrice(expectedProductPrice: string): Promise<void>{
        await expect(this.productPrice).toHaveText(expectedProductPrice);
    }


}