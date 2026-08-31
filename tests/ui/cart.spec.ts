import { NavigationComponent } from "../../src/components/NavigationComponent";
import { EnvironmentManager } from "../../src/core/EnvironmentManager";
import { productData } from "../../src/data/static/productData";
import { test } from "../../src/fixtures/testFixtures";
import { CartPage } from "../../src/pages/CartPage";
import { CatalogPage } from "../../src/pages/CatalogPage";
import { HomePage } from "../../src/pages/HomePage";
import { ProductDetailsPage } from "../../src/pages/ProductDetailsPage";

test.describe("Cart Functonality", () => {
    let homePage: HomePage;
    let navigation: NavigationComponent;
    let catalogPage: CatalogPage;
    let productDetailsPage: ProductDetailsPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ browserManager }) => {
        const page = browserManager.getPage();

        homePage = new HomePage(page);
        navigation = new NavigationComponent(page);
        catalogPage = new CatalogPage(page);
        productDetailsPage = new ProductDetailsPage(page);
        cartPage = new CartPage(page);

        await homePage.navigate(EnvironmentManager.getBaseURL());

        await navigation.navigateToCatalog();

        await catalogPage.openProduct(
            productData.availableProduct.name
        );
    })

    test("@smoke @regression @knownIssue Verify product can be added to the cart", async () => {
    // Known application issue:
    // Cart drawer intermittently remains stuck on the loading spinner.
    // Test retained to monitor the existing application defect.
        await productDetailsPage.addProductToCart();

        await navigation.verifyCartItemCount(1);

        await navigation.navigateToCart();

        await cartPage.verifyProductInCart(
            productData.availableProduct.name
        );
    });

    test("@smoke @regression @knownIssue Verify product can be removed from cart", async () => {
    // Known application issue:
    // Cart drawer intermittently remains stuck on the loading spinner.
    // Test retained to monitor the existing application defect.
        await productDetailsPage.addProductToCart();

        await navigation.navigateToCart();

        await cartPage.verifyProductInCart(
            productData.availableProduct.name
        );

        await cartPage.removeProduct(
            productData.availableProduct.name
        );

        await cartPage.verifyCartIsEmpty();
    });

});