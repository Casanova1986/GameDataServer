import mongoose = require ('mongoose');

export interface IGeneralEquipmentInfoData {
    idEquipment: number;
    name: string;
    description: string;
    type: string;
    tier: string;
    image: string;
    fuseRate: number;
    numSubStatsMin: number;
    numSubStatsMax: number;
  }

  export interface IGeneralEquipmentInfoDataDocument extends IGeneralEquipmentInfoData, mongoose.Document {}

export const GeneralEquipmentInfoDataSchema = new mongoose.Schema({
    idEquipment: {type: Number, default: 0},
    name: {type: String, default: "Training Sword"},
    description:  {type: String, default: "Training Sword description"},
    type:  {type: String, default: "Weapon"},
    tier:  {type: String, default: "Common"},
    image:  {type: String, default: "Weapon"},
    fuseRate: { type: Number, default: 100 },
    numSubStatsMin: { type: Number, default: 0 },
    numSubStatsMax: { type: Number, default: 0 },
});

export const EquipmentGeneralInfo = mongoose.model<IGeneralEquipmentInfoDataDocument>('equipment_general_info', GeneralEquipmentInfoDataSchema);