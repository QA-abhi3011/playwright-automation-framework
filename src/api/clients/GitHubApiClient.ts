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
}