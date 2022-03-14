import { RedisKey } from './Param';
import { clientRedis } from '../redisConnect';
class RedisUtils {

    CheckCurrentDeviceOnline(userID: string, socketId:string, deviceId:string):Promise<boolean> {
        let promise = new Promise<any>((resolve, reject) => {
            clientRedis.hsetnx(RedisKey.ONLINE_USER, userID, deviceId + " " + socketId, (error: Error, reply: number) => {
                if (error) {
                    console.log(error);
                    resolve(true);
                } else {
                    if (reply == 0) {
                        clientRedis.hget(RedisKey.ONLINE_USER, userID, (error, value) => {
                            if (error) {
                                console.log(error);
                                resolve(true);
                            } else {
                                if (!value || (value != null && value.indexOf(deviceId + " ") !== -1)) {
                                    clientRedis.hset(RedisKey.ONLINE_USER, userID, deviceId + " " + socketId, (error: Error, reply: number) => {
                                        resolve(false);
                                    });
                                } else {
                                    resolve(true);
                                }
                            }
                        });
                    } else {
                        resolve(false);
                    }
                }
            }); 
        });
        return promise;
        
}
}

export const redisUtil = new RedisUtils();
