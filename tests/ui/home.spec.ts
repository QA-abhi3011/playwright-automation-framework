import { test, expect } from '../../src/fixtures/testFixtures';
import { HomePage } from '../../src/pages/HomePage';
import { EnvironmentManager } from '../../src/core/EnvironmentManager';
import { BrowserManager } from '../../src/core/BrowserManager';


test('@smoke Verify application is accessible', async({ browserManager }) =>{
    const page = browserManager.getPage();
    const homePage = new HomePage(page);

    await homePage.navigateToUrl(
        EnvironmentManager.getBaseURL()
    );

    await expect(page).toHaveURL(
    EnvironmentManager.getBaseURL()
  );
});

