"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DataWave_1 = require("./DataWave");
const WaveController_1 = require("./WaveController");
var WaveRouter = (0, express_1.Router)();
var waveController = new WaveController_1.WaveController();
WaveRouter.post('/getStage', async (req, res) => {
    console.log(req.body);
    waveController.getDataWave(req.body.idStage, (err, result) => {
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
WaveRouter.post('/addAllWave', async (req, res) => {
    DataWave_1.wave_json.forEach(async (element) => {
        await waveController.addWave(element, (err, results) => { });
    });
    res.send('wave ok');
});
exports.default = WaveRouter;
