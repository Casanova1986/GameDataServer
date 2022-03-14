"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HeroController_1 = require("./HeroController");
var HeroRouter = (0, express_1.Router)();
var heroController = new HeroController_1.HeroController();
HeroRouter.post('/addHero', async (req, res) => {
    let errors = new Array();
    if (!req.body.id) {
        errors.push('Id Hero is required');
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
        heroController.createHero(req.body, (err, results) => {
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
HeroRouter.post('/updateHero', async (req, res) => {
    let errors = new Array();
    if (!req.body.id) {
        errors.push('Id Hero is required');
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
        heroController.updateHero(req.body, (err, results) => {
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
HeroRouter.post('/deleteHero', async (req, res) => {
    let errors = new Array();
    if (!req.body.id) {
        errors.push('Id Hero is required');
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
        heroController.deleteHero(req.body.id, (err, results) => {
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
HeroRouter.post('/levelupHero', async (req, res) => {
    heroController.levelUpHero(req.body._id, (err, result) => {
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
HeroRouter.post('/enchanceHero', async (req, res) => {
    heroController.enchanceHero(req.body._id, req.body.isEnchace, (err, result) => {
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
HeroRouter.post('/equipHero', async (req, res) => {
    console.log(req.body);
    heroController.equipmnentForHero(req.body._idHero, req.body._idEquipt, req.body.isEquip, (err, result) => {
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
HeroRouter;
exports.default = HeroRouter;
