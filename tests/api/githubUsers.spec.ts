import { test, expect } from "../../src/fixtures/apiFixture";
import { GitHubApiClient } from "../../src/api/clients/GitHubApiClient";
import { GitHubUserSearchResponse, GitHubUserDetails } from "../../src/api/models/GitHubUserModels";
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
  
});

test("@regression Verify user details can be retrieved from the search results", async({ apiRequest}) => {
    const gitHubApiClient = new GitHubApiClient(apiRequest);

    // Search for users and use the returned username
    // in the user details endpoint.

    const searchResponse = await gitHubApiClient.searchUsers("torvalds");

    expect(searchResponse.status()).toBe(200);

    const searchResponseBody = await searchResponse.json() as GitHubUserSearchResponse;

    const username = searchResponseBody.items[0].login;

    // Retrieve details for the user returned by the search API.

    const userDetailsResponse = await gitHubApiClient.getUsers(username);

    expect(userDetailsResponse.status()).toBe(200);

    const userDetails = await userDetailsResponse.json() as GitHubUserDetails;

    // Validate that both API responses refer to the same user.
    expect(userDetails.login).toBe(username);

    expect(userDetails.id).toBeGreaterThan(0);

    expect(userDetails.avatar_url).toContain("github");

    expect(userDetails.html_url).toContain(`github.com/${username}`);

    expect(userDetails.type).toBeTruthy();
});