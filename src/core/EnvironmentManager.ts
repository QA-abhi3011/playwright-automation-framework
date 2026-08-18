import * as dotenv from "dotenv";
import path from "path";

export class EnvironmentManager{
    private static env = process.env.ENV || "qa";

    static loadEnvironment(): void{
        const envFile = path.resolve(
            process.cwd(), `config/env/.env.${this.env}`
        );

        dotenv.config({path: envFile});

        console.log(`Environment Loaded: ${this.env}`);
    }

    static getBaseURL(): string{
        return process.env.BASE_URL || "";
    }

    static getEnvironment(): string{
        return this.env;
    }


}