import {DataHeroConfig} from './ConfigInfo/HeroConfigInfoModel';

export enum Entity {
  MAXENERGY = 150,
  ENERGYREGENERATION = 10,
  MAX_SLOT_EQUIPMENT = 6
}

export var idHero = Math.floor(Math.random() * 23) + 1;

export var heroTier = {
  Common: [1,2,3,4,5],
  Rare: [12,22,33,42,52],
  Epic: [13,23,34,43,53],
  Unique: [16,15,24,25,35,36,44,45],
  Legendary: [14,17,26,27,38,39,46,47,],
  Ultimate: [],
};


