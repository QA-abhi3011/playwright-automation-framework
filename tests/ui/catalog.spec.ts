import { test, expect } from "../../src/fixtures/testFixtures";
import { HomePage } from "../../src/pages/HomePage";
import { NavigationComponent } from "../../src/components/NavigationComponent";
import { CatalogPage } from "../../src/pages/CatalogPage";
import { EnvironmentManager } from "../../src/core/EnvironmentManager";
import { productData } from "../../src/data/static/productData";



test("@smoke @regression Verify user can open a product from the catalog",async ({ browserManager }) => {
    const page = browserManager.getPage();

    const homePage = new HomePage(page);
    const navigation = new NavigationComponent(page);
    const catalogPage = new CatalogPage(page);

    await homePage.navigate(EnvironmentManager.getBaseURL());

    await navigation.navigateToCatalog();

    await catalogPage.openProduct(productData.availableProduct.name);

    await expect(page).toHaveURL(/products/);
  }
);

