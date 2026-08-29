import { test, expect } from "../../src/fixtures/apiFixture";
import { GitHubApiClient } from "../../src/api/clients/GitHubApiClient";
import { GitHubUserSearchResponse } from "../../src/api/models/GitHubUserModels";

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