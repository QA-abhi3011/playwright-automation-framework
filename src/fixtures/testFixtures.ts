import {test as base} from '@playwright/test';
import {BrowserManager} from '../core/BrowserManager';

// Extend Playwright test object with framework-specific fixtures
type FrameworkFixtures = {
    browserManager: BrowserManager;
}

export const test = base.extend<FrameworkFixtures>({
    browserManager: async ({browser, context, page}, use) =>{
        const browserManager = new BrowserManager(
            browser,
            context,
            page,
        );
        await use(browserManager)
    }
});

export { expect } from '@playwright/test';