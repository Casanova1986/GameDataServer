"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logger_1 = require("../../logger");
const EnemyController_1 = require("./EnemyController");
var EnemyRouter = (0, express_1.Router)();
var enemyController = new EnemyController_1.EnemyController();
EnemyRouter.post('/getEnemy', async (req, res) => {
    logger_1.Logger.info(`--Get enemy info of ${req.body.nameEnemy}`);
    enemyController.getDataEnemy(req.body.nameEnemy, (err, result) => {
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
                    data: result,
                },
            });
        }
    });
});
EnemyRouter.get('/getEnemiesName', (req, res) => {
    logger_1.Logger.info(`--Get all enemies name!`);
    enemyController.getAllEnemyName((err, rs) => {
        if (err) {
            logger_1.Logger.error(`Get all enemies name error ${err}`);
            res.status(404).send(new Array());
        }
        else {
            logger_1.Logger.info(`Get all enemies name success!`);
            res.status(200).send(rs);
        }
    });
});
exports.default = EnemyRouter;
