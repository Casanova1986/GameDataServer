"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EquipmentModel_1 = require("../GameData/Equipment/EquipmentModel");
const HeroModel_1 = require("../GameData/Hero/HeroModel");
const ServerConfigController_1 = require("../ServerConfig/ServerConfigController");
const UserController_1 = require("../Users/UserController");
const AdminToolController_1 = require("./AdminToolController");
var AdminRouter = (0, express_1.Router)();
exports.default = AdminRouter;
const userController = new UserController_1.UserController();
const serverConfig = new ServerConfigController_1.ServerConfigController();
const adminController = new AdminToolController_1.AdminToolController();
AdminRouter.post('/heroShard', (req, res) => {
    userController.addHeroFrag_test(req.body.userData, req.body.heroData, req.body.amount, req.body.passKey, (err, rs) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.status(200).send(rs);
        }
    });
});
AdminRouter.post('/clearDB', async (req, res) => {
    adminController.clearDB(req.body.passKey, (err, rs) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.status(200).send(rs);
        }
    });
});
AdminRouter.post('/initHeroGeneralData', async (req, res) => {
    adminController.initHeroGeneralData(req.body.passKey, (err, rs) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.status(200).send(rs);
        }
    });
});
AdminRouter.post('/createHeroGeneralData', async (req, res) => {
    adminController.createHeroGeneralData(req.body.passKey, req.body.data, (err, rs) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.status(200).send(rs);
        }
    });
});
AdminRouter.get('/getNFT/:tokenID', async (req, res) => {
    if (!req.params.tokenID) {
        res.status(400).send(`tokenId invalid!`);
        return;
    }
    let hero = await HeroModel_1.heroInfo.findOne({ tokenID: req.params.tokenID });
    if (hero) {
        res.status(200).send(hero);
        return;
    }
    let item = await EquipmentModel_1.EquipmentModel.findOne({ tokenID: req.params.tokenID });
    if (item) {
        res.status(200).send(item);
        return;
    }
    res.status(400).send(`nothing bond with tokenID ${req.params.tokenID}`);
});
