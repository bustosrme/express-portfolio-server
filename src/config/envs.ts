import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    BASE_URL: get('BASE_URL').required().asUrlString(),
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),

    DATABASE_URL: get('DATABASE_URL').required().asString(),

    JWT_SECRET: get('JWT_SECRET').required().asString(),

    DISCORD_WEBHOOK_URL: get('DISCORD_WEBHOOK_URL').required().default('').asString(),

    MONGO_URL: get('MONGO_URL').required().asString(),
    MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
    
    MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
    MAILER_EMAIL: get('MAILER_EMAIL').required().asEmailString(),
    MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),
    SEND_EMAIL: get('SEND_EMAIL').default('false').asBool(),
}