import mongoose = require('mongoose');
import { stat } from './EquipmentSubStats';

export interface Istat extends stat {
  step: Number;
}

export interface IDataEquipmentConfig {
  idEquipment: number;
  stats: Array<Istat>;
}

export interface IDataEquipmentConfigDocument extends IDataEquipmentConfig, mongoose.Document {}

export const DataEquipmentConfigSchema = new mongoose.Schema({
  idEquipment: Number,
  stats: {
    type: Array,
    of: new mongoose.Schema({
      _id: { type: mongoose.Types.ObjectId, require: false },
      type: { type: String, default: 'Atk' },
      valueMin: { type: Number, default: 0 },
      valueMax: { type: Number, default: 0 },
      step: { type: Number, default: 0},
    }),
  },
});

export const EquipmentMainStats = mongoose.model<IDataEquipmentConfigDocument>(
  'equipment_main_stats',
  DataEquipmentConfigSchema
);
