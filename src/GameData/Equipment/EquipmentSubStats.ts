import mongoose = require('mongoose');

export interface stat {
    type: String;
    valueMin: Number;
    valueMax: Number;
}


export interface IEquipmentConfig {
  tier: String;
  stats: Array<stat>;
  costBaseLevelUpRDG: number;
  costTierUpRDG: number;
  costTierUpRDR: number;
}

export interface IEquipmentConfigDocument extends IEquipmentConfig, mongoose.Document {}

export const EquipmentConfigSchema = new mongoose.Schema({
  tier: String,
  stats: {
    type: Array,
    of: new mongoose.Schema({
      _id: { type: mongoose.Types.ObjectId, require: false },
      type: { type: String, default: 'Atk' },
      valueMin: { type: Number, default: 0 },
      valueMax: { type: Number, default: 0 },
    }),
  },
  costBaseLevelUpRDG: { type: Number, default: 0 },
  costTierUpRDG: { type: Number, default: 0 },
  costTierUpRDR: { type: Number, default: 0 },
});

export const EquipmentSubStats = mongoose.model<IEquipmentConfigDocument>('equipment_sub_stats', EquipmentConfigSchema);
