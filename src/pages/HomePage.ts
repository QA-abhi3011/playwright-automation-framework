import { Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';

export class HomePage extends BasePage{
    constructor(page: Page){
        super(page);
    }

    async navigateToUrl(url: string): Promise<void> {
        await super.navigate(url);
    }
}