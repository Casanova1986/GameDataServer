import { CampaignRewardModel } from './RewardModels';
import { getGameData } from '../GetGameData';

export class RewardController {
  async addReward(rewardData: any, callback: any) {
    CampaignRewardModel.findOne({ stage: rewardData.stage }, { stage: 1 }).then(async (data) => {
      if (data) {
        callback('', 'Reward Campaign ID is exist!');
      } else {
        let reward = new CampaignRewardModel({
          stageId: rewardData.stageId,
          boxNormalFirstPlay: rewardData.boxNormalFirstPlay,
          boxNormalRelay: rewardData.boxNormalRelay,
          RDGFirstPlay: rewardData.RDGFirstPlay,
          RDGRePlay: rewardData.RDGRePlay,
        });
        await reward.save();
        await getGameData.loadGameData();
        callback('', 'Add Reward Succeeded');
      }
    });
  }
}
