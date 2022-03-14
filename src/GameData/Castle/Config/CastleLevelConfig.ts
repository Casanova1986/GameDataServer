import mongoose = require('mongoose');

export interface ILevelCastleData{
    level: number;
    HP: number;
    armor: number;
    magicRes: number;
    cost: number;
    tier: string;
}

export interface IlevelCastleDataDocument extends ILevelCastleData, mongoose.Document{}

export const ILevelCastleDataSchema = new mongoose.Schema<ILevelCastleData>({
    level: {type: Number, default: 0},
    HP: {type: Number, default: 0},
    armor: {type: Number, default: 0},
    magicRes: {type: Number, default: 0},
    cost: {type: Number, default: 0},
    tier: {type: String, default: "Common"}
});

export const levelDatalCastle = mongoose.model<IlevelCastleDataDocument>('castle_level_config',ILevelCastleDataSchema);