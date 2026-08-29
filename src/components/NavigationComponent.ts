import { expect, Locator, Page} from '@playwright/test';

/*
 * Common Navigation locators to reduce the code duplicacy
 */

export class NavigationComponent{
    private readonly homeLink: Locator;
    private readonly catalogLink: Locator;
    private readonly cartLink: Locator;
    private readonly cartCount: Locator;

    constructor(page: Page){
        this.homeLink = page.locator("ul[id='main-menu'] a[href='/']");
        this.catalogLink = page.getByRole("link", { name: "Catalog"});
        this.cartLink = page.locator("#cart-target-desktop");
        this.cartCount = page.locator("#cart-target-desktop");

    }

    async navigateToHome(): Promise<void>{
        await this.homeLink.click();
    }

    async navigateToCatalog(): Promise<void>{
        await this.catalogLink.click();
    }

    async navigateToCart(): Promise<void>{
        await this.cartLink.click();

    }

    async verifyCartItemCount(epxectedCount: number): Promise<void>{
        await expect(this.cartCount).toContainText(`(${epxectedCount})`);
    }
}