"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisUtil = void 0;
const Param_1 = require("./Param");
const redisConnect_1 = require("../redisConnect");
class RedisUtils {
    CheckCurrentDeviceOnline(userID, socketId, deviceId) {
        let promise = new Promise((resolve, reject) => {
            redisConnect_1.clientRedis.hsetnx(Param_1.RedisKey.ONLINE_USER, userID, deviceId + " " + socketId, (error, reply) => {
                if (error) {
                    console.log(error);
                    resolve(true);
                }
                else {
                    if (reply == 0) {
                        redisConnect_1.clientRedis.hget(Param_1.RedisKey.ONLINE_USER, userID, (error, value) => {
                            if (error) {
                                console.log(error);
                                resolve(true);
                            }
                            else {
                                if (!value || (value != null && value.indexOf(deviceId + " ") !== -1)) {
                                    redisConnect_1.clientRedis.hset(Param_1.RedisKey.ONLINE_USER, userID, deviceId + " " + socketId, (error, reply) => {
                                        resolve(false);
                                    });
                                }
                                else {
                                    resolve(true);
                                }
                            }
                        });
                    }
                    else {
                        resolve(false);
                    }
                }
            });
        });
        return promise;
    }
}
exports.redisUtil = new RedisUtils();
