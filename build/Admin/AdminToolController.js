"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminToolController = void 0;
const CastleController_1 = require("../GameData/Castle/CastleController");
const EquipmentController_1 = require("../GameData/Equipment/EquipmentController");
const HeroController_1 = require("../GameData/Hero/HeroController");
const logger_1 = require("../logger");
const ServerConfigController_1 = require("../ServerConfig/ServerConfigController");
const UserController_1 = require("../Users/UserController");
const userController = new UserController_1.UserController();
const serverConfig = new ServerConfigController_1.ServerConfigController();
const heroController = new HeroController_1.HeroController();
const castleController = new CastleController_1.CastleController();
const equipmentController = new EquipmentController_1.EquipmentController();
class AdminToolController {
    async clearDB(passKey, callback) {
        if (await !serverConfig.checkPassKey(passKey, null)) {
            logger_1.Logger.error(`Sb call clear DB wwith wrong passkey!`);
            return callback(`passKey error!`, ``);
        }
        let errs = new Array();
        let success = new Array();
        await heroController.clearDBHero((err, rs) => {
            if (err) {
                logger_1.Logger.error(err);
                errs.push(err);
            }
            else {
                logger_1.Logger.info(rs);
                success.push(rs);
            }
        });
        await castleController.clearDBCastle((err, rs) => {
            if (err) {
                logger_1.Logger.error(err);
                errs.push(err);
            }
            else {
                logger_1.Logger.info(rs);
                success.push(rs);
            }
        });
        await equipmentController.clearDbEquipment((err, rs) => {
            if (err) {
                logger_1.Logger.error(err);
                errs.push(err);
            }
            else {
                logger_1.Logger.info(rs);
                success.push(rs);
            }
        });
        callback(``, success);
    }
    async initHeroGeneralData(passKey, callback) {
        if (await !serverConfig.checkPassKey(passKey, null)) {
            logger_1.Logger.error(`Sb call init hero general data wwith wrong passkey!`);
            return callback(`passKey error!`, ``);
        }
        heroController.initDefaultGeneralHero(callback);
    }
    async createHeroGeneralData(passKey, data, callback) {
        if (await !serverConfig.checkPassKey(passKey, null)) {
            logger_1.Logger.error(`Sb call init hero general data wwith wrong passkey!`);
            return callback(`passKey error!`, ``);
        }
        if (!data) {
            return callback(`data cant empty!`, ``);
        }
        heroController.createHeroGeneralData(data, callback);
    }
}
exports.AdminToolController = AdminToolController;
