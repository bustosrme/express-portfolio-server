import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    BASE_URL: get('BASE_URL').required().asUrlString(),
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
    JWT_SECRET: get('JWT_SECRET').required().asString(),
}