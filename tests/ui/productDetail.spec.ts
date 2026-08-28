import { NavigationComponent } from '../../src/components/NavigationComponent';
import { EnvironmentManager } from '../../src/core/EnvironmentManager';
import { productData } from '../../src/data/static/productData';
import { test, expect } from '../../src/fixtures/testFixtures';
import { CatalogPage } from '../../src/pages/CatalogPage';
import { HomePage } from '../../src/pages/HomePage';
import { ProductDetailsPage } from '../../src/pages/ProductDetailsPage';




test('@smoke @regression Verify Product Details', async ({ browserManager}) =>{

    const page = browserManager.getPage();

    const homePage = new HomePage(page);
    const navigation = new NavigationComponent(page);
    const catalogPage = new CatalogPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    await homePage.navigateToUrl(EnvironmentManager.getBaseURL());

    await navigation.navigateToCatalog();

    await catalogPage.openProduct(productData.availableProduct.name);

    await expect(page).toHaveURL(/products/);

    await productDetailsPage.verifyProductName(
      productData.availableProduct.name
    );

    await productDetailsPage.verifyProductPrice(
    productData.availableProduct.price
    );

    
});