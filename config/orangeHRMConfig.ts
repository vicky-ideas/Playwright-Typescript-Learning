import { env } from "./environment";

export interface OrangeHrmConfig {
    environment: string;
    url: string;
    username: string;
    password: string;
}

export function getOrangeHrmConfig(): OrangeHrmConfig {

    const environment = process.env.ENV?.trim().toLowerCase();

    // Validate ENV
    if (!environment) {
        throw new Error(
            "ENV is missing. Please provide ENV=dev or ENV=qa."
        );
    }

    // Get selected environment configuration
    const environmentConfig =
        env.orangehrm[
            environment as keyof typeof env.orangehrm
        ];

    // Validate environment
    if (!environmentConfig) {
        throw new Error(
            `Invalid environment "${environment}". ` +
            "Supported environments are: dev, qa."
        );
    }

    // Validate URL
    if (!environmentConfig.url) {
        throw new Error(
            `OrangeHRM URL is missing for environment "${environment}".`
        );
    }

    // Validate username
    if (!environmentConfig.username) {
        throw new Error(
            `OrangeHRM username is missing for environment "${environment}".`
        );
    }

    // Password ONLY from runtime
    const password = process.env.ORANGEHRM_PASSWORD;

    if (!password) {
        throw new Error(
            "ORANGEHRM_PASSWORD is missing. " +
            "Password must be supplied at runtime."
        );
    }

    return {
        environment,
        url: environmentConfig.url,
        username: environmentConfig.username,
        password
    };
}
