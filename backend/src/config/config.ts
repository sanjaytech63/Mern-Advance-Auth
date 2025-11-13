import { config as conf } from "dotenv";
conf();

const _config = {
  port: process.env.PORT,
  databaseUrl: process.env.MONGO_CONNECTION_STRING,
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  frontendDomain: process.env.FRONTEND_DOMAIN,
  mailtrapToken: process.env.MAILTRAP_TOKEN,
  mailtrapEndpoint: process.env.MAILTRAP_ENDPOINT,
};

export const config = Object.freeze(_config);
