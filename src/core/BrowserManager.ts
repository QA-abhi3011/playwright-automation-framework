import { Browser, BrowserContext, Page } from "@playwright/test";

export class BrowserManager {
    constructor(
        private browser: Browser,
        private context: BrowserContext,
        private page: Page,
    ) { }

    getBrowser(): Browser {
        return this.browser;
    }

    getContext(): BrowserContext {
        return this.context;
    }

    getPage(): Page {
        return this.page;
    }
}