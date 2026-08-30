import {APIRequestContext, request as playwrightRequest, test as base} from "@playwright/test";
import { EnvironmentManager } from "../core/EnvironmentManager";

type ApiFixtures = { apiRequest: APIRequestContext;};

/**
 * Extends Playwright's base test with an API request context
 * configured for the currently selected environment.
 */

export const test = base.extend<ApiFixtures>({
  apiRequest: async ({}, use) => {
    const apiRequestContext =
      await playwrightRequest.newContext({
        baseURL: EnvironmentManager.getAPIBaseURL()
      });

    await use(apiRequestContext);

    await apiRequestContext.dispose();
  }
});

export { expect } from "@playwright/test";

