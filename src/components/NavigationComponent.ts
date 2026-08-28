import { Locator, Page} from '@playwright/test';

/*
 * Common Navigation locators to reduce the code duplicacy
 */

export class NavigationComponent{
    private readonly homeLink: Locator;
    private readonly catalogLink: Locator;
    private readonly cartLink: Locator;

    constructor(page: Page){
        this.homeLink = page.locator("ul[id='main-menu'] a[href='/']");
        this.catalogLink = page.getByRole("link", { name: "Catalog"});
        this.cartLink = page.getByRole("link", { name: "/cart/i"});
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
}