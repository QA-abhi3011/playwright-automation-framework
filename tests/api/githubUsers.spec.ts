import { test, expect } from "../../src/fixtures/apiFixture";
import { GitHubApiClient } from "../../src/api/clients/GitHubApiClient";
import { GitHubUserSearchResponse } from "../../src/api/models/GitHubUserModels";
import { apiSearchDataFactory } from "../../src/data/factories/apiSearchDataFactory";

test("@smoke @regression Verify GitHub user search returns results", async ({ apiRequest }) => {
    const gitHubApiClient = new GitHubApiClient(apiRequest);

    const response = await gitHubApiClient.searchUsers("playwright");

    expect(response.status()).toBe(200);

    const responseBody = await response.json() as GitHubUserSearchResponse;

    expect(responseBody.total_count).toBeGreaterThan(0);

    expect(responseBody.items.length).toBeGreaterThan(0);

    expect(responseBody.items[0].login).toBeTruthy();

    expect(responseBody.items[0].id).toBeGreaterThan(0);

    expect(responseBody.items[0].html_url).toContain("github.com");
}
);


test("@smoke @regression Verify user search returns an empty result for a non-existing user", async ({ apiRequest }) => {

    const gitHubApiClient = new GitHubApiClient(apiRequest);

    const searchQuery = apiSearchDataFactory.generateNonExistingUserQuery();

    const response = await gitHubApiClient.searchUsers(searchQuery);

    const responseBody = await response.json() as GitHubUserSearchResponse;

    expect(responseBody.total_count).toBe(0);

    expect(responseBody.items).toHaveLength(0);


});

test("@regression Verify user search fails when query parameter is missing", async ({ apiRequest }) => {
    const gitHubApiClient = new GitHubApiClient(apiRequest);

    const response = await gitHubApiClient.searchUsersWithoutQuery();

    expect(response.status()).toBe(422);

    const responseBody = await response.json();

    expect(responseBody.message).toBeTruthy();

    expect(responseBody.errors.length).toBeGreaterThan(0);
  }
);