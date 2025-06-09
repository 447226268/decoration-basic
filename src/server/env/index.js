const dotEnv = require("dotenv");

const { NODE_ENV = "production" } = process.env;
switch (NODE_ENV) {
    case "test":
        dotEnv.config({ path: './.env.test' });
        break;
    case "development":
        dotEnv.config({ path: './.env.development' });
        break;
    case "production":
    default:
        dotEnv.config({ path: './.env.production' });
        break;
}