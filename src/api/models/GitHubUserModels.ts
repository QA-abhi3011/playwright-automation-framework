/**
 * Represents an individual user returned by the
 * GitHub user search API.
 */

export interface GitHubUser{
    login: string;
    id: number;
    node_id: number;
    avatar_url: string;
    html_url: string;
    type: string;
}

/**
 * Represents the response returned by the
 * GitHub user search API.
 */

export interface GitHubUserSearchResponse{
    total_count: number;
    incomplete_results: boolean;
    items: GitHubUser[];
}

/**
 * Represents the response returned by the
 * GitHub user details API.
 */
export interface GitHubUserDetails {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  html_url: string;
  type: string;
  public_repos: number;
  followers: number;
  following: number;
}