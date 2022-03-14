"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerConfigController = void 0;
const ServerConfigModel_1 = require("./ServerConfigModel");
const bcrypt = require('bcrypt');
class ServerConfigController {
    async checkPassKey(key, callback) {
        let data = await ServerConfigModel_1.ConfigModel.findOne();
        if (!data) {
            if (callback)
                return callback('data server error', '');
            return false;
        }
        if (!bcrypt.compareSync(key, data.passKey)) {
            if (callback)
                return callback('wrong passkey', '');
            return false;
        }
    }
    async OnOffMainTain(isOn, passKey, callback) {
        if (await !this.checkPassKey(passKey, null)) {
            return callback('wrong passKey', '');
        }
        ServerConfigModel_1.ConfigModel.updateOne({}, { isMaintain: isOn }).
            then(rs => {
            console.log(rs);
            return callback('', rs);
        })
            .catch(err => {
            console.log(err);
            return callback(err, '');
        });
    }
    async CheckMaintain(callback) {
        ServerConfigModel_1.ConfigModel.find()
            .then(rs => {
            if (rs == null || rs.length == 0)
                return callback('server config empty', '');
            else {
                return callback('', rs[0]);
            }
        })
            .catch(err => {
            return callback('server config error', '');
        });
    }
}
exports.ServerConfigController = ServerConfigController;
