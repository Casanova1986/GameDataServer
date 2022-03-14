"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankController = void 0;
const logger_1 = require("../../logger");
const RankModel_1 = require("./RankModel");
const { rank } = require('../../config/environment/server');
class RankController {
    async getRankGroup(userId, callback) {
        if (!userId) {
            return callback(`user ID invalid!`, ``);
        }
        let rank_0 = await this.getAllRankData();
        let userData = await RankModel_1.RankModel.findOne({ userId: userId });
        if (!userData) {
            logger_1.Logger.error(`cant not find user rank data! Create one! `);
            userData = await RankModel_1.RankModel.create({ userId: userId });
        }
        let index_rank = rank_0.map((e) => { return e.userId.toString(); }).indexOf(userId);
        if (index_rank == -1) {
            // return normal rank
            let rank_1 = await RankModel_1.RankModel.find({ rank: userData.rank }).sort({
                score: -1,
                wave: -1
            });
            if (!rank_1) {
                return callback(`Can not get rank data!`, ``);
            }
            let index = rank_1.map((e) => { return e.userId.toString(); }).indexOf(userId);
            rank_1 = JSON.parse(JSON.stringify(rank_1)).map((e, i) => {
                e.rankOrder = i;
                return e;
            });
            let tmp_userData = JSON.parse(JSON.stringify(userData));
            tmp_userData.rankOrder = index;
            rank_1.push(tmp_userData);
            return callback(``, rank_1);
        }
        let master_index = (rank.emperor + rank.master);
        if (index_rank <= master_index) {
            //return rank emperor + rank master
            let rank_master = JSON.parse(JSON.stringify(rank_0.splice(0, master_index)));
            rank_master = rank_master.map((e, i) => { e.rankOrder = i - 1; e.rank = RankModel_1.RankName.MASTER; return e; });
            let tmp_userData = JSON.parse(JSON.stringify(userData));
            rank_master[0].rank = RankModel_1.RankName.EMPEROR;
            rank_master[0].rankOrder = 0;
            if (index_rank == 0) {
                tmp_userData.rankOrder = 0;
            }
            else {
                tmp_userData.rankOrder = index_rank - 1;
            }
            rank_master.push(tmp_userData);
            return callback(``, rank_master);
        }
        let elite_index = (rank.emperor + rank.master + rank.elite);
        if (index_rank <= elite_index) {
            //return rank elite
            let rank_elite = JSON.parse(JSON.stringify(rank_0.splice(master_index, elite_index - master_index)));
            rank_elite = rank_elite.map((e, i) => { e.rankOrder = i; e.rank = RankModel_1.RankName.ELITE; return e; });
            let tmp_userData = JSON.parse(JSON.stringify(userData));
            tmp_userData.rankOrder = index_rank - master_index;
            rank_elite.push(tmp_userData);
            return callback(``, rank_elite);
        }
        let diamon_index = (rank.emperor + rank.master + rank.elite + rank.diamond);
        if (index_rank <= diamon_index) {
            //return rank diamond
            let rank_diamond = JSON.parse(JSON.stringify(rank_0.splice(elite_index, diamon_index - elite_index)));
            rank_diamond = rank_diamond.map((e, i) => { e.rankOrder = i; e.rank = RankModel_1.RankName.DIAMOND; return e; });
            let tmp_userData = JSON.parse(JSON.stringify(userData));
            tmp_userData.rankOrder = index_rank - elite_index;
            rank_diamond.push(tmp_userData);
            return callback(``, rank_diamond);
        }
        let platinum_index = (rank.emperor + rank.master + rank.elite + rank.diamond + rank.platinum);
        if (index_rank <= platinum_index) {
            //return rank paltinum
            let rank_platinum = JSON.parse(JSON.stringify(rank_0.splice(diamon_index, platinum_index - diamon_index)));
            rank_platinum = rank_platinum.map((e, i) => { e.rankOrder = i; e.rank = RankModel_1.RankName.PLATINUM; return e; });
            let tmp_userData = JSON.parse(JSON.stringify(userData));
            tmp_userData.rankOrder = index_rank - diamon_index;
            rank_platinum.push(tmp_userData);
            return callback(``, rank_platinum);
        }
        rank_0.splice(0, diamon_index);
        rank_0 = JSON.parse(JSON.stringify(rank_0));
        let tmp_userData = JSON.parse(JSON.stringify(userData));
        tmp_userData.rankOrder = index_rank - platinum_index;
        rank_0.push(tmp_userData);
        return callback(``, rank_0);
    }
    async getRankSeason(userId, callback) {
        if (!userId) {
            return callback(`user ID invalid!`, ``);
        }
        await RankModel_1.RankModel.find().sort({
            score: -1,
            wave: -1
        }).limit(rank.emperor + rank.master + rank.elite + rank.diamond + rank.platinum)
            .exec((err, rs) => {
            if (err) {
                callback(`get rank season error`, ``);
            }
            else {
                let index = rs.map((e) => { return e.userId.toString(); }).indexOf(userId);
                callback(``, rs, index);
            }
        });
    }
    async getHallOfFame(userId, callback) {
        if (!userId) {
            return callback(`user ID invalid!`, ``);
        }
        await RankModel_1.RankModel.find().sort({
            bestScore: -1,
            bestWave: -1
        })
            .exec((err, rs) => {
            if (err) {
                callback(`get rank hall of fame error`, ``);
            }
            else {
                let index = rs.map((e) => { return e.userId.toString(); }).indexOf(userId);
                callback(``, rs, index);
            }
        });
    }
    async getAllRankData() {
        let users = await RankModel_1.RankModel.find({ rank: RankModel_1.RankName.GOLD }).sort({
            score: -1,
            wave: -1
        })
            //.select({ "_id": 0 })
            .exec();
        return users;
    }
}
exports.RankController = RankController;
