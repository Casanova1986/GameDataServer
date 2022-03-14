import mongoose = require('mongoose');

export enum TypeCoin {
  RDG = 1,
  RDR = 2,
}

export enum TypeBox {
  CommonBox = 3,
  EpicBox = 4,
  LegendBox = 5,
}

export interface ICampaignReward {
  stageId: number;
  boxNormalFirstPlay: number;
  boxNormalRelay: number;
  RDGFirstPlay: number;
  RDGRePlay: number;
}
export interface ICampaignRewardDocument extends ICampaignReward, mongoose.Document {}

const CampaignRewardSchema = new mongoose.Schema({
  stageId: { type: Number, default: 0 },
  boxNormalFirstPlay: { type: Number, default: 0 },
  boxNormalRelay: { type: Number, default: 0 },
  RDGFirstPlay: { type: Number, default: 0 },
  RDGRePlay: { type: Number, default: 0 },
});

export const CampaignRewardModel = mongoose.model<ICampaignReward>('Reward', CampaignRewardSchema);
