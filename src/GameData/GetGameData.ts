import { heroInfo } from './Hero/HeroModel';
import { EquipmentModel } from './Equipment/EquipmentModel';
import { CampaignRewardModel } from './Reward/RewardModels';
import { consumableModel } from './Consumable/ConsumableModel';
import { UserInventoryModel } from '../Users/Models/UserInventory';
import { skillInfoModel } from './Skill/SkillModel';
import { GeneralHeroInfoModel } from './Hero/HeroGeneralInfo/HeroGeneralInfoModel';
import { DataHeroConfig } from './Hero/ConfigInfo/HeroConfigInfoModel';
import { Entity } from './Hero/HeroConfig';
import {IGeneralHeroInfoData} from './Hero/HeroGeneralInfo/HeroGeneralInfoModel';
import {ISkillInfo} from './Skill/SkillInfo/SkillInfoModel';
import { skillInfoDataModel } from './Skill/SkillInfo/SkillInfoModel';

import internal = require('stream');

export var campaignReward = new Map<string, any>();
export var consumableDataId = new Map<string, any>();

export var skillData = new Map<string, any>();

export var heroConfigData = new Map<number, any>();
export var generalHeroData = new Map<number, any>();


class GetGameData {
  async loadGameData() {
    // reload if admin change game dat

    consumableDataId = new Map<string, any>();

    heroConfigData = new Map<number, any>();
    generalHeroData = new Map<number, any>();
    skillData = new Map<string, any>();


    skillInfoModel.find({})
    .then( async (data)=>{
      if(data){
   
        data.forEach((skill)=>{
          skillData.set(skill.skillName,{
            _id: skill._id,
            skillName: skill.skillName,
            data: skill.data
          })
        });
      }
    })
    .catch();

    CampaignRewardModel.find({})
      .then(async (data) => {
        
        if (data) {
         
        data.forEach((eachReward) => {
       
            campaignReward.set(eachReward.stageId.toString(), {
              boxNormalFirstPlay: eachReward.boxNormalFirstPlay,
              boxNormalRelay: eachReward.boxNormalRelay,
              RDGFirstPlay: eachReward.RDGFirstPlay,
              RDGRePlay: eachReward.RDGRePlay,
            });
          
        });
      }
      })
      .catch((err) => console.log(err));


    CampaignRewardModel.find({})
      .then(async (data) => {
        data.forEach((eachReward) => {
          if (data) {
            campaignReward.set(eachReward.stageId.toString(), {
              boxNormalFirstPlay: eachReward.boxNormalFirstPlay,
              boxNormalRelay: eachReward.boxNormalRelay,
              RDGFirstPlay: eachReward.RDGFirstPlay,
              RDGRePlay: eachReward.RDGRePlay,
            });
          }
        });
      })
      .catch((err) => console.log(err));

    consumableModel
      .find({})
      .then(async (data) => {
        if (data) {
          data.forEach((consumItem) => {
            consumableDataId.set(consumItem._id.toString(), {
              _id: consumItem._id,
              itemName: consumItem.itemName,
              image: consumItem.image,
              description: consumItem.description,
              rarity: consumItem.rarity
            });
          });
        }
      })
      .catch((err) => console.log(err));

     await DataHeroConfig.find({})
      .then(async(data) =>{
        data.forEach(dataHeroConfig => {
          let fightInfo = {
            attackSpeed: Math.floor(Math.random() * dataHeroConfig.atkSpeedMax) + dataHeroConfig.atkSpeedMin,
            minAttackRange: dataHeroConfig.atkRangeMin,
            maxAttackRange: dataHeroConfig.atkRangeMin,
            damage: {
                critRate: Math.floor(Math.random() * (dataHeroConfig.critChanceMax - dataHeroConfig.critChanceMin)) + dataHeroConfig.critChanceMin,
                critDamage: Math.floor(Math.random() * (dataHeroConfig.critDamageMax - dataHeroConfig.critDamageMin)) + dataHeroConfig.critDamageMin,
                physicDamage: Math.floor(Math.random() * (dataHeroConfig.physicDamageMax - dataHeroConfig.physicDamageMin)) + dataHeroConfig.physicDamageMin,
                magicDamage: Math.floor(Math.random() * (dataHeroConfig.magicDamageMax - dataHeroConfig.magicDamageMin)) + dataHeroConfig.magicDamageMin,
                pureDamage: Math.floor(Math.random() * (dataHeroConfig.pureDamageMax - dataHeroConfig.pureDamageMin)) + dataHeroConfig.pureDamageMin,
            }
        }

        let entityInfo =
        {
            armor: Math.floor(Math.random() * (dataHeroConfig.armorMax - dataHeroConfig.armorMin)) + dataHeroConfig.armorMin,
            magicResistance: Math.floor(Math.random() * (dataHeroConfig.magicResMax - dataHeroConfig.magicResMin)) + dataHeroConfig.magicResMin,
            lifeSteal: dataHeroConfig.lifeSteal,
            HP: Math.floor(Math.random() * (dataHeroConfig.hpMax - dataHeroConfig.hpMin)) + dataHeroConfig.hpMin,
            maxEnergy: Entity.MAXENERGY,
            energyRegeneration: Entity.ENERGYREGENERATION
        }

        heroConfigData.set(dataHeroConfig.idHero,{
          fightInfo: fightInfo,
          entityInfo: entityInfo
        });

        });
      })
      .catch((err) => console.log(err));


      GeneralHeroInfoModel.find({})
      .then(async(data) =>{
        data.forEach(async generalHeroInfo => {
          let skills: Array<ISkillInfo> = new Array<ISkillInfo>();
          await skillInfoDataModel.find({idHero: generalHeroInfo.idHero})
          .then(rs=>{
             
              rs.forEach( e =>{
                skills.push(e);
              });
          })
          .catch(err=>{
            console.log('read skill data from db error');
          });
      
          let general : IGeneralHeroInfoData = {
            idHero: generalHeroInfo.idHero,
            name: generalHeroInfo.name,
            description: generalHeroInfo.description,
            className: generalHeroInfo.className,
            type: generalHeroInfo.type,
            tier: generalHeroInfo.tier,
            level: generalHeroInfo.level,
            star: generalHeroInfo.star,
            avatar: generalHeroInfo.avatar,
          }

          generalHeroData.set(generalHeroInfo.idHero,{ 
            idHero: generalHeroInfo.idHero,
            generalHeroInfo: general,
            fightInfo :  heroConfigData.get(generalHeroInfo.idHero).fightInfo,
            entityInfo: heroConfigData.get(generalHeroInfo.idHero).entityInfo,
            originFightInfo : heroConfigData.get(generalHeroInfo.idHero).fightInfo,
            originEntityInfo: heroConfigData.get(generalHeroInfo.idHero).entityInfo,
            skills : skills,
            
          });

        });
      })
      .catch((err) => console.log(err));
 
  }



  async getNFT(tokenID: string, callback: any){
    await EquipmentModel.find({tokenId: tokenID})
    .then(rs=>{

    })
    .catch(err=>{

    });
  }
}
export const getGameData = new GetGameData();
