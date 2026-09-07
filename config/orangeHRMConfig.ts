import { loadEnvironment } from "./environment";

export interface OrangeHrmConfig {
    environment: string;
    url: string;
    username: string;
    password: string;
}

export function getOrangeHrmConfig(): OrangeHrmConfig {

    const environment = loadEnvironment();

    const url = process.env.ORANGEHRM_URL;
    const username = process.env.ORANGEHRM_USERNAME;
    const password = process.env.ORANGEHRM_PASSWORD;


    if (!url) {
        throw new Error(
            `OrangeHRM URL is missing for environment "${environment}".`
        );
    }

    if (!username) {
        throw new Error(
            `OrangeHRM username is missing for environment "${environment}".`
        );
    }

    if (!password) {
        throw new Error(
            "ORANGEHRM_PASSWORD is missing. " +
            "Password must be supplied at runtime."
        );
    }

    return {
        environment,
        url,
        username,
        password
    };
}
