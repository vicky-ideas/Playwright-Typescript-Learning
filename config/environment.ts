import dotenv from "dotenv";

export function loadEnvironment(): string {

    const environment = process.env.ENV?.trim().toLowerCase();

    if (!environment) {
        throw new Error(
            "ENV is missing. Please provide ENV=dev or ENV=qa."
        );
    }

    if (!["dev", "qa"].includes(environment)) {
        throw new Error(
            `Invalid environment "${environment}". ` +
            "Supported environments are: dev, qa."
        );
    }

    dotenv.config({
        path: `config/${environment}.env`
    });

    return environment;
}