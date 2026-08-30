import { APIRequestContext, APIResponse } from "@playwright/test";

/**
 * API client responsible for GitHub REST API requests.
 */

export class GitHubApiClient {
    constructor(
        private readonly request: APIRequestContext
    ) { }

    /*
     * Searches GitHub users using the provided query. 
    */
    async searchUsers(searchQuery: string): Promise<APIResponse> {
        return this.request.get("/search/users", {
            params: {
                q: searchQuery
            }
        });
    }

    /*
     * Retrieves details for a specific GitHub user.
    */
    async getUsers(username: string): Promise<APIResponse>{
        return this.request.get(`/users/${username}`);
    }

    /*
     * Searches GitHub users without providing a search query.
     * Used to validate API error handling for an invalid request. 
    */

    async searchUsersWithoutQuery(): Promise<APIResponse> {
        return this.request.get("/search/users");
    }
}