require('dotenv').config();
//const secretManager = require('./secretManager');

// function preferDockerSecret(secretKey: String | undefined): String {
//     let candidate = secretManager.readSecret(secretKey);
//     if (candidate == undefined) {
//       candidate = secretKey;
//     }
//     return candidate;
// }

module.exports = {
    server: {
        port: process.env.PORT
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    },
    mongo: {
        host: process.env.MONGO_HOST,
        port: process.env.MONGO_PORT,
        // username: preferDockerSecret(process.env.MONGO_USERNAME),
        // password: preferDockerSecret(process.env.MONGO_PASSWORD),
        username: process.env.MONGO_USERNAME,
        password: process.env.MONGO_PASSWORD,
        dbName: process.env.MONGO_DB
    }
};