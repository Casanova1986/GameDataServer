import mongoose = require('mongoose');
import { IGeneralEquipmentInfoData } from './EquipmentGeneralInfo';

export interface subStats {
  type: String;
  value: Number;
  tier: String
}
export interface mainStats {
  typeStats: String;
  valueStats: Number;
  step: Number;
}

export interface IEquipment extends IGeneralEquipmentInfoData {
  tokenId: string;
  level: number;
  levelMax: number;
  costBaseLevelUpRDG: number;
  costLevelUpRDG: number;
  heroEquippedId: mongoose.Types.ObjectId;
  mainStats: Array<mainStats>;
  subStats: Array<subStats>;
  fuseRate: number;
  numSubStatsMin: number;
  numSubStatsMax: number;
  idEquipment: number;
  name: string;
  description: string;
  type: string;
  tier: string;
  image: string;
  originMainStats: Array<mainStats>;
  originSubStats: Array<mainStats>;
  isNFT: boolean;
}

export interface IEquipmentDocument extends IEquipment, mongoose.Document {}

export const EquipmentSchema = new mongoose.Schema({
  tokenId: { type: String, default: '' },
  idEquipment: { type: Number, default: 0 },
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  type: { type: String, default: '' },
  tier: { type: String, default: '' },
  level: { type: Number, default: 0 },
  levelMax: { type: Number, default: 20 },
  image: { type: String, default: '' },
  mainStats: {
    type: Array,
    of: new mongoose.Schema({
      _id: { type: mongoose.Types.ObjectId, require: false },
      typeStats: { type: String, default: 'Atk' },
      valueStats: { type: Number, default: 0 },
      step: { type: Number, default: 0 },
    }),
  },
  subStats: {
    type: Array,
    of: new mongoose.Schema({
      _id: { type: mongoose.Types.ObjectId, require: false },
      type: String,
      value: Number,
      tier: String,
    }),
  },
  originMainStats: {
    type: Array,
    of: new mongoose.Schema({
      _id: { type: mongoose.Types.ObjectId, require: false },
      typeStats: { type: String, default: 'Atk' },
      valueStats: { type: Number, default: 0 },
      step: { type: Number, default: 0 },
    }),
  },
  originSubStats: {
    type: Array,
    of: new mongoose.Schema({
      _id: { type: mongoose.Types.ObjectId, require: false },
      type: String,
      value: Number,
      tier: String,
    }),
  },
  fuseRate: { type: Number, default: 100 },
  numSubStatsMin: { type: Number, default: 0 },
  numSubStatsMax: { type: Number, default: 0 },
  costBaseLevelUpRDG: { type: Number, default: 100,},
  costLevelUpRDG: { type: Number, default: 100,},
  heroEquippedId: { type: mongoose.Types.ObjectId },
  timeCreated: { type: Date},
  isNFT: {type: Boolean, default: false}
});

export const EquipmentModel = mongoose.model<IEquipmentDocument>('Equipment', EquipmentSchema);
