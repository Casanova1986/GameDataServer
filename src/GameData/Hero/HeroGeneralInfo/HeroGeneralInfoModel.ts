import mongoose = require ('mongoose');

export interface IGeneralHeroInfoData {
    idHero: number;
    name: string;
    description: string;
    className: string;
    type: string;
    tier: string;
    avatar: string;
    level: number;
    star: number;
  }

  export interface IGeneralHeroInfoDataDocument extends IGeneralHeroInfoData, mongoose.Document {}

export const GeneralHeroInfoDataSchema = new mongoose.Schema({
    idHero: {type: Number, default: 0},
    name: {type: String, default: "Aridus"},
    description:  {type: String, default: "Aridus description"},
    className:  {type: String, default: "Aridus classname"},
    type:  {type: String, default: "Mage"},
    tier:  {type: String, default: "Common"},
    avatar:  {type: String, default: "Aridus"},
    level: {type: Number, default: 0},
    star: {type: Number, default: 0},
});

export const GeneralHeroInfoModel = mongoose.model<IGeneralHeroInfoDataDocument>('GeneralHeroInfo', GeneralHeroInfoDataSchema);