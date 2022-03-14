//import mongoose from '../mongoConnect';
import { Schema, model, Document } from 'mongoose';
import * as UserConfig from './../UserConfig';

export interface UserInfo {
  userName: string;
  passWord: string;
  avatar: string;
  walletID: string;

  RDGLock: number;
  RDRLock: number;

  RDG: number;
  RDR: number;

  energy: number;
  maxEnergy: number;
  currentStage: number;
  currentMap: number;

  lastDayLogin: number;
  lastDeviceId: string;

  name: string;
  avatarsOwned: Array<Number>;
  rank: number;

}

export interface IUserDocument extends UserInfo, Document {}

const schema = new Schema({
  userName: { type: String, required: true },
  passWord: { type: String, required: true },
  avatar: { type: String, required: false, default:"adrius_the_sould_stealer_icon" },
  walletID: { type: String, default: '' },

  RDGLock: { type: Number, require: true, default: 0 },
  RDRLock: { type: Number, require: true, default: 0 },

  RDG: { type: Number, require: true, default: 0 },
  RDR: { type: Number, require: true, default: 0 },

  energy: { type: Number, require: true, default: UserConfig.Entity.MAXENERGY },
  maxEnergy: { type: Number, require: true, default: UserConfig.Entity.MAXENERGY },
  currentStage: { type: Number, default: 0 },
  currentMap: { type: Number, default: 0 },

  lastDayLogin: { type: Number,  default: 0 },
  lastDeviceId: { type: String, default: '' },

  name: { type: String, default: '' },
  //avatarsOwned: { type: Array , of: Number },
  rank: { type: Number,  default: 0 },
});
export const UserModel = model<IUserDocument>('User', schema);
