import { NavigationComponent } from "../../src/components/NavigationComponent";
import { EnvironmentManager } from "../../src/core/EnvironmentManager";
import { SearchDataFactory } from "../../src/data/factories/SearcDataFactory";
import { test } from "../../src/fixtures/testFixtures";
import { HomePage } from "../../src/pages/HomePage";
import { SearchPage } from "../../src/pages/SearchPage";



test("@regression Verify search behaviour for a non existing product", async({ browserManager}) => {
    const page = browserManager.getPage();

    const homePage = new HomePage(page);
    //const navigation = new NavigationComponent(page);
    const searchPage = new SearchPage(page);

    const searchTerm = SearchDataFactory.createNonExistingProductName();

    await homePage.navigate(EnvironmentManager.getBaseURL());

    await searchPage.searchForProduct(searchTerm);

    await searchPage.verifyNoResults();



});