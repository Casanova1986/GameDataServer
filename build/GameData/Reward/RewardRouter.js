"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RewardController_1 = require("./RewardController");
const json = require('./Rewards.json');
var RewardRouter = (0, express_1.Router)();
var rewardController = new RewardController_1.RewardController();
RewardRouter.post('/addReward', async (req, res) => {
    let errors = new Array();
    if (!req.body.id) {
        errors.push('Id Reward is required');
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
        rewardController.addReward(req.body, (err, results) => {
            if (err) {
                res.send({
                    Status: 1,
                    Body: {
                        data: errors,
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
RewardRouter.post('/testAddAllReward', async (req, res) => {
    json.forEach(async (element) => {
        await rewardController.addReward(element, (err, results) => { });
    });
    res.send('ok');
});
exports.default = RewardRouter;
