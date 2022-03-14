"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EquipmentController_1 = require("./EquipmentController");
var EquipmentRouter = (0, express_1.Router)();
var equipmentController = new EquipmentController_1.EquipmentController();
EquipmentRouter.post('/addEquipment', async (req, res) => {
    let errors = new Array();
    if (!req.body.id) {
        errors.push('Id Equipment is required');
    }
    else if (!req.body.name) {
        errors.push('Name Equipment is required');
    }
    else if (!req.body.rarity) {
        errors.push('Rarity is required');
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
        equipmentController.createEquipment(req.body, (err, results) => {
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
EquipmentRouter.post('/levelUpEquipment', async (req, res) => {
    let dataEquip = req.body;
    let errors = new Array();
    if (!req.body.id) {
        errors.push('Id Equipment is required');
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
        equipmentController.levelUpEquipment(req.body.id, (err, results) => {
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
EquipmentRouter.post('/deleteEquipment', async (req, res) => {
    new EquipmentController_1.EquipmentController().deleteEquipment(req.body.itemId, (err, results) => {
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
});
EquipmentRouter.get('/getEquipmentsOwner/:walletId', async (req, res) => {
    equipmentController.getEquipOwn(req.params.walletId, (err, result) => {
        if (err) {
            res.send({
                Status: 1,
                Body: {
                    data: [],
                    err: err
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
exports.default = EquipmentRouter;
