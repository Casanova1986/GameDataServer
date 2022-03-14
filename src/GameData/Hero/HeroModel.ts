import mongoose = require('mongoose');
import * as HeroConfig from './HeroConfig';
import * as Equipment from '../Equipment/EquipmentModel';
import {IGeneralHeroInfoData,GeneralHeroInfoDataSchema} from './HeroGeneralInfo/HeroGeneralInfoModel';
import {ISkillInfo, SkillInfoSchema} from '../Skill/SkillInfo/SkillInfoModel';


export var Tier = ['Common', 'Rare', 'Epic', 'Unique', 'Legendary'];

export var typeHero = ['Mage', 'Warrior', 'Support', 'Ranger', 'Defender'];


export interface EntityInfo {
  armor: number;
  magicResistance: number;
  lifeSteal: number;
  HP: number;
  reflect: number;
  energy: number;
  maxEnergy: number;
  energyRegeneration:number;
}

export interface IDamage{
  critRate: number;
  critDamage: number;
  physicDamage: number;
  magicDamage: number;
  pureDamage: number;
}


export interface IFightInfo{
  attackSpeed : number;
  minAttackRange: 0;
  maxAttackRange: 8;

  damage: IDamage;
  typeBullet: string;
}

export interface IHero {
  idHero: number;
  equipments : Array<Equipment.IEquipment>;
  tokenID : string,
  skills: Array<ISkillInfo>;
  generalHeroInfo: IGeneralHeroInfoData;
  fightInfo: IFightInfo;
  entityInfo: EntityInfo;
  isNFT: boolean;
}

export interface IHeroDocument extends IHero, mongoose.Document {}

export const fightSchema = new mongoose.Schema({
  attackSpeed: { type: Number, default: 40 },
  minAttackRange: { type: Number, default: 0 },
  maxAttackRange:{ type: Number, default: 8 },
  damage: {
    type: Object,
    of: new mongoose.Schema({
      critRate: {type: Number, default: 0},
      critDamage:  {type: Number, default: 200},
      physicDamage:  {type: Number, default: 0},
      magicDamage:  {type: Number, default: 20},
      pureDamage:  {type: Number, default: 0}
    })
  },

  typeBullet: {type: String, default: "BulletInfo"},

});

export const entitySchema = new mongoose.Schema({
  armor: { type: Number, default: 5 },
  magicResistance: { type: Number, default: 15 },
  lifeSteal: { type: Number, default: 0 },
  HP: { type: Number, default: 100 },

  reflect: {
    type: Number,
    default: 0,
  },
  energy: {
    type: Number,
    default: 0,
  },
  maxEnergy: {
    type: Number,
    default: HeroConfig.Entity.MAXENERGY,
  },
  energyRegeneration: {
    type: Number,
    default: HeroConfig.Entity.ENERGYREGENERATION,
},
})

const HeroSchema = new mongoose.Schema({
  idHero: Number,
  tokenID: String,
  equipments: {
    type: Array, 
    of: Equipment.EquipmentSchema
  },

  skills: {
    type: Array,
    of: SkillInfoSchema
  },

  generalHeroInfo: {
    type: Object,
    of:  GeneralHeroInfoDataSchema
  },
  
  fightInfo:{
    type: Object,
    of: fightSchema
  },

  entityInfo: {
    type: Object,
    of: entitySchema,
  },

  originFightInfo:{
    type: Object,
    of: fightSchema
  },

  originEntityInfo: {
    type: Object,
    of: entitySchema,
  },

  timeCreated: { type: Date, default: new Date() },
  isNFT: {type: Boolean, default: false}
});

HeroSchema.index({
  idHero: 1,
});

HeroSchema.index({
  tier: 'text',
});

export const heroInfo = mongoose.model<IHeroDocument>('Hero', HeroSchema);
