"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RankController_1 = require("./RankController");
var RankRouter = (0, express_1.Router)();
const rankController = new RankController_1.RankController();
exports.default = RankRouter;
RankRouter.get(`/groupRank/:userId`, (req, res) => {
    rankController.getRankGroup(req.params.userId, (err, rs) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.status(200).send(rs);
        }
    });
});
RankRouter.get(`/seasonRank/:userId`, (req, res) => {
    rankController.getRankSeason(req.params.userId, (err, rs) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.status(200).send(rs);
        }
    });
});
RankRouter.get(`/hallOfFameRank/:userId`, (req, res) => {
    rankController.getHallOfFame(req.params.userId, (err, rs) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.status(200).send(rs);
        }
    });
});
