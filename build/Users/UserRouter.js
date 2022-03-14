"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("./UserController");
const HeroController_1 = require("../GameData/Hero/HeroController");
const EquipmentModel_1 = require("../GameData/Equipment/EquipmentModel");
const EquiqmentConfig_1 = require("../GameData/Equipment/EquiqmentConfig");
var UserRouter = (0, express_1.Router)();
const userController = new UserController_1.UserController();
const heroController = new HeroController_1.HeroController();
UserRouter.post('/registerUser', async (req, res) => {
    let errors = new Array();
    if (!req.body.userName) {
        errors.push('Name is required.');
    }
    if (!req.body.passWord) {
        errors.push('Password is required.');
    }
    if (errors.length) {
        res.send({
            Status: 1,
            Body: {
                data: errors,
            },
        });
    }
    else {
        userController.registerUser(req.body.userName, req.body.passWord, (err, results) => {
            if (err) {
                res.send({
                    Status: 1,
                    Body: {
                        data: err,
                    },
                });
            }
            else {
                res.send({
                    Status: 1,
                    Body: {
                        data: results,
                    },
                });
            }
        });
    }
});
UserRouter.post('/login', async (req, res) => {
    let errors = new Array();
    if (!req.body.userName) {
        errors.push('Name is required.');
    }
    if (!req.body.passWord) {
        errors.push('Password is required.');
    }
    if (errors.length) {
        res.send({
            Status: 1,
            Body: {
                data: errors,
            },
        });
    }
    else {
        userController.loginUser(req.body.userName, req.body.passWord, (err, results) => {
            if (err) {
                res.send({
                    Status: 1,
                    Body: {
                        data: err,
                    },
                });
            }
            else {
                res.send({
                    Status: 1,
                    Body: {
                        data: results,
                    },
                });
            }
        });
    }
});
UserRouter.post('/testRandom', async (req, res) => {
    if ((req.body.chest = 'Common')) {
        EquipmentModel_1.EquipmentModel.find({ equipmentRarity: req.body.chest })
            .then((data) => {
            res.send('ok');
            let randomEquip = Math.round(Math.random() * (data.length - 1));
            let randomEquipNumSub = EquiqmentConfig_1.Equip_TierList.Common.subStatMin +
                Math.round(Math.random() * (EquiqmentConfig_1.Equip_TierList.Common.subStatMax - EquiqmentConfig_1.Equip_TierList.Common.subStatMin));
            console.log('test');
            let subArray = new Array();
            while (randomEquipNumSub > 0) {
                let randomEquipSub = Math.round(Math.random() * (EquiqmentConfig_1.subStatConfig.Common.length - 1));
                if (subArray.indexOf(randomEquipSub) === -1) {
                    randomEquipNumSub--;
                    subArray.push(randomEquipSub);
                }
            }
            subArray.sort((a, b) => {
                return a - b;
            });
            let equipResult = data[randomEquip];
            //subArray.forEach((e) => equipResult?.subStats.push(subStatConfig.Common[e]));
            console.log(equipResult);
        })
            .catch((err) => res.send(err));
    }
});
UserRouter.post('/RandomEquip', async (req, res) => {
    userController.randomEquipment(req.body.userId, res);
});
UserRouter.post('/RandomHero', async (req, res) => {
    let tier = req.body.tier;
    // userController.randomHero(req.body.userId, tier, (err, rs) => {
    //   res.send(rs);
    // });
});
UserRouter.post('/GenerateHero', async (req, res) => {
    let walletId = req.body.walletId;
    let tokenId = req.body.tokenId;
    userController.geneRateHero(walletId, tokenId, (err, rs) => {
        res.send(rs);
    });
});
UserRouter.post('/testPassPlayCampain', async (req, res) => {
    let userId = req.body.userId;
    let stageId = req.body.stageId;
    userController.playCampaign(userId, stageId, (err, rs) => {
        res.send(rs);
    });
});
UserRouter.get('/GetHeroOwnerInfo/:walletId', async (req, res) => {
    let walletId = req.params.walletId;
    heroController.getHeroesOwner(walletId, (err, rs) => {
        res.send(rs);
    });
});
UserRouter.get('/GetHeroInfo', async (req, res) => {
    heroController.getHeroes((err, rs) => {
        res.send(rs);
    });
});
exports.default = UserRouter;
