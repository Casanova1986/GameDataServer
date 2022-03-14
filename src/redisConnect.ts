import * as redis from 'redis';

const environment = require('./config/environment/server');

export const clientRedis = redis.createClient({
    host: environment.redis.host,
    port: environment.redis.port
});