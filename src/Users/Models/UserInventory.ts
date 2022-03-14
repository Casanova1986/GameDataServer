import mongoose = require('mongoose');
//import { Schema, model, Document } from 'mongoose';
import { TypeBox } from '../../GameData/Reward/RewardModels';
import { UserInfo } from './UserModel';

export enum ItemType {
  Hero = 0,
  Frag = 1,
  Equip = 2,
  NormalBox = 3,
  HeroBox = 4,
  EquipBox = 5,
  Castle = 6,
  HeroFrag = 7,
}

export interface IUserInventory {
  amount: Number;
  isInMarket: boolean;
  isValid: boolean;
  MetaData: Object;
  walletID: String;
}

export interface UserInventory {
  walletID: string;
  userId: UserInfo | String;
  amount: number,
  price: number,
  itemId: mongoose.Types.ObjectId;
  itemType: ItemType | TypeBox;
  isInMarket: boolean;
  isValid: boolean;
  MetaData: Object;
  CreatedAt: Date;
  UpdatedAt: Date;
}

export interface IUserInventoryDocument extends UserInventory, Document {}

const UserInventorySchema = new mongoose.Schema<UserInventory>({
  walletID: { type: String, required: true },
  amount:{ type: Number, default: 1 },
  price:{ type: Number, required: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
  itemType: { type: Number, required: true },
  isInMarket: { type: Boolean },
  isValid: { type: Boolean, default: true },
  MetaData: { type: Object, required: false },
  CreatedAt: {
    type: Date,
    default: new Date(),
  },
  UpdatedAt: {
    type: Date,
    default: new Date(),
  },
});

UserInventorySchema.index({ userId: 1 }, { sparse: true, background: true });

export const UserInventoryModel = mongoose.model<IUserInventoryDocument>('UserInventory', UserInventorySchema);
