"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRedis = void 0;
const redis = require("redis");
const environment = require('./config/environment/server');
exports.clientRedis = redis.createClient({
    host: environment.redis.host,
    port: environment.redis.port
});
