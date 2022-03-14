"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardController = void 0;
const RewardModels_1 = require("./RewardModels");
const GetGameData_1 = require("../GetGameData");
class RewardController {
    async addReward(rewardData, callback) {
        RewardModels_1.CampaignRewardModel.findOne({ stage: rewardData.stage }, { stage: 1 }).then(async (data) => {
            if (data) {
                callback('', 'Reward Campaign ID is exist!');
            }
            else {
                let reward = new RewardModels_1.CampaignRewardModel({
                    stageId: rewardData.stageId,
                    boxNormalFirstPlay: rewardData.boxNormalFirstPlay,
                    boxNormalRelay: rewardData.boxNormalRelay,
                    RDGFirstPlay: rewardData.RDGFirstPlay,
                    RDGRePlay: rewardData.RDGRePlay,
                });
                await reward.save();
                await GetGameData_1.getGameData.loadGameData();
                callback('', 'Add Reward Succeeded');
            }
        });
    }
}
exports.RewardController = RewardController;
