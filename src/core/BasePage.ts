import {Locator, Page, expect} from "@playwright/test";

export class BasePage{
    constructor(protected page: Page){}

    async navigate(url:string): Promise<void>{
        await this.page.goto(url);
    }

    async click(element: Locator): Promise<void>{
        await element.click();
    }

    async fill(element: Locator, value: string): Promise<void>{
        await element.fill(value);
    }

    async getText(element: Locator): Promise<string>{
        return(await element.textContent() || "");
    }

    async verifyVisible(element: Locator): Promise<void>{
        await expect(element).toBeVisible();
    }
}