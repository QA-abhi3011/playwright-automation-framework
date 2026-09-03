import * as dotenv from "dotenv";
import path from "path";

export class EnvironmentManager {
    private static env = process.env.ENV || "qa";

    /*
     * Loads environment-specific configuration.
    */

    static loadEnvironment(): void {
        const envFile = path.resolve(
            process.cwd(), `config/env/.env.${this.env}`
        );

        dotenv.config({ path: envFile, override: true });
    }

    /* 
     * Returns the base URL used for UI automation.
    */
    static getBaseURL(): string {
        const baseURL = process.env.UI_BASE_URL;

        if (!baseURL) {
            throw new Error(
                "UI_BASE_URL is not configured for the selected environemnt"
            );
        }
        return baseURL;
    }

    /*
      * Returns the base URL used for API automation.
    */
    static getAPIBaseURL(): string {
        const apiBaseUrl = process.env.API_BASE_URL;

        if (!apiBaseUrl) {
            throw new Error(
                "API_BASE_URL is not configured for the selected environment."
            );
        }

        return apiBaseUrl;
    }

   /*
    * Returns the currently selected environment.
   */
    static getEnvironment(): string {
        return this.env;
    }


}