import mongoose = require('mongoose');
import * as HeroModel from './HeroModel';
import {  getGameData } from '../GetGameData';
import * as Equipment from '../Equipment/EquipmentModel';
import * as HeroConfig from './HeroConfig';
import {GeneralHeroInfoModel,IGeneralHeroInfoData} from './HeroGeneralInfo/HeroGeneralInfoModel';
import {skillInfoDataModel,ISkillInfo} from '../Skill/SkillInfo/SkillInfoModel';
import {heroLevelUpConfig} from './ConfigInfo/HeroLevelUpConfigModel';
import {heroEnchanceConfig} from './ConfigInfo/HeroEnchanceConfigModel';
import console = require('console');
import { EquipmentController } from '../Equipment/EquipmentController';

import {DataHeroConfig} from './ConfigInfo/HeroConfigInfoModel';
import { UserInventoryModel } from '../../Users/Models/UserInventory';
import { UserController } from '../../Users/UserController';
import { ItemType } from '../../Users/Models/UserInventory';
import { generalHeroData } from '../GetGameData';

var equipmentController = new EquipmentController();

var levelUpDataConfig = new Map<number,any>();
var enchanceDataConfig = new Map<string,any>();

function heroDataUpdate(obj: Object): Object {
  let key: string[] = Object.keys(obj);
  for (let i = 0; i < key.length; i++) {
    if (obj[`${key[i]}`] === undefined || Number.isNaN(obj[`${key[i]}`])) {
      delete obj[`${key[i]}`];
    }
  }
  return obj;
}

export class HeroController {

  constructor(){
   
    levelUpDataConfig = new Map<number,any>();
    heroLevelUpConfig.find()
    .then(data=>{
      data.forEach(elementConfig=>{
        levelUpDataConfig.set(elementConfig.idHero,{
          idHero: elementConfig.idHero,
          atk: elementConfig.atk,
          atkSpeed: elementConfig.atkSpeed,
          critChance: elementConfig.critChance,
          critDamage: elementConfig.critDamage,
          Hp: elementConfig.Hp,
          armor: elementConfig.armor,
          magicRes: elementConfig.magicRes
        });
      });
    })
    .catch(err=>{
      console.log(err);
    });

    enchanceDataConfig = new Map<string,any>();

    let enchanceDataStarCommon = new Map<number,any>();
    let enchanceDataStarRare = new Map<number,any>();
    let enchanceDataStarEpic = new Map<number,any>();
    let enchanceDataStarUnique = new Map<number,any>();
    let enchanceDataStarLegendary = new Map<number,any>();

    heroEnchanceConfig.find()
    .then(data=>{
      data.forEach(tierData=>{

        if(tierData.tier == 'Common'){
          enchanceDataStarCommon.set(tierData.star,{
            tier: tierData.tier,
            star: tierData.star,
            atk: tierData.atk,
            atkSpeed: tierData.atkSpeed,
            critChance: tierData.critChance,
            critDamage: tierData.critDamage,
            Hp: tierData.Hp,
            armor: tierData.armor,
            magicRes: tierData.magicRes
          });
        }else if(tierData.tier == 'Rare'){
          enchanceDataStarRare.set(tierData.star,{
            tier: tierData.tier,
            star: tierData.star,
            atk: tierData.atk,
            atkSpeed: tierData.atkSpeed,
            critChance: tierData.critChance,
            critDamage: tierData.critDamage,
            Hp: tierData.Hp,
            armor: tierData.armor,
            magicRes: tierData.magicRes
          });
        }else if(tierData.tier == 'Epic'){
          enchanceDataStarEpic.set(tierData.star,{
            tier: tierData.tier,
            star: tierData.star,
            atk: tierData.atk,
            atkSpeed: tierData.atkSpeed,
            critChance: tierData.critChance,
            critDamage: tierData.critDamage,
            Hp: tierData.Hp,
            armor: tierData.armor,
            magicRes: tierData.magicRes
          });
        }else if(tierData.tier == 'Unique'){
          enchanceDataStarUnique.set(tierData.star,{
            tier: tierData.tier,
            star: tierData.star,
            atk: tierData.atk,
            atkSpeed: tierData.atkSpeed,
            critChance: tierData.critChance,
            critDamage: tierData.critDamage,
            Hp: tierData.Hp,
            armor: tierData.armor,
            magicRes: tierData.magicRes
          });
        }else if(tierData.tier == 'Legendary'){
          enchanceDataStarLegendary.set(tierData.star,{
            tier: tierData.tier,
            star: tierData.star,
            atk: tierData.atk,
            atkSpeed: tierData.atkSpeed,
            critChance: tierData.critChance,
            critDamage: tierData.critDamage,
            Hp: tierData.Hp,
            armor: tierData.armor,
            magicRes: tierData.magicRes
          });
        }

      });

      enchanceDataConfig.set('Common', enchanceDataStarCommon);
      enchanceDataConfig.set('Rare', enchanceDataStarRare);
      enchanceDataConfig.set('Epic', enchanceDataStarEpic);
      enchanceDataConfig.set('Unique', enchanceDataStarUnique);
      enchanceDataConfig.set('Legendary', enchanceDataStarLegendary);
    })
    .catch(err=>{
      console.log(err);
    });

  }

  async randomHero(idHero:number, callback: any){
    let tier = "Common";
    let dataHeroConfig;
    await DataHeroConfig.findOne({idHero: idHero})
    .then(rs=>{
      if(rs != null){
        dataHeroConfig = rs;
      }
    })
    .catch(err=>{

    });

    let fightInfo = {
      attackSpeed: Math.floor(Math.random() * dataHeroConfig.atkSpeedMax) + dataHeroConfig.atkSpeedMin,
      minAttackRange: dataHeroConfig.atkRangeMin,
      maxAttackRange: dataHeroConfig.atkRangeMax,
      damage: {
          critRate: Math.floor(Math.random() * (dataHeroConfig.critChanceMax - dataHeroConfig.critChanceMin)) + dataHeroConfig.critChanceMin,
          critDamage: Math.floor(Math.random() * (dataHeroConfig.critDamageMax - dataHeroConfig.critDamageMin)) + dataHeroConfig.critDamageMin,
          physicDamage: Math.floor(Math.random() * (dataHeroConfig.physicDamageMax - dataHeroConfig.physicDamageMin)) + dataHeroConfig.physicDamageMin,
          magicDamage: Math.floor(Math.random() * (dataHeroConfig.magicDamageMax - dataHeroConfig.magicDamageMin)) + dataHeroConfig.magicDamageMin,
          pureDamage: Math.floor(Math.random() * (dataHeroConfig.pureDamageMax - dataHeroConfig.pureDamageMin)) + dataHeroConfig.pureDamageMin,
      }
  }

  console.log(`${dataHeroConfig.critDamageMax} - ${dataHeroConfig.critDamageMin}`);

  let entityInfo =
  {
      armor: Math.floor(Math.random() * (dataHeroConfig.armorMax - dataHeroConfig.armorMin)) + dataHeroConfig.armorMin,
      magicResistance: Math.floor(Math.random() * (dataHeroConfig.magicResMax - dataHeroConfig.magicResMin)) + dataHeroConfig.magicResMin,
      lifeSteal: dataHeroConfig.lifeSteal,
      HP: Math.floor(Math.random() * (dataHeroConfig.hpMax - dataHeroConfig.hpMin)) + dataHeroConfig.hpMin,
      maxEnergy: HeroConfig.Entity.MAXENERGY,
      energyRegeneration: HeroConfig.Entity.ENERGYREGENERATION
  }
    
    let generalHeroInfo;
  
    await GeneralHeroInfoModel.findOne({ idHero: idHero})
    .then(rs=>{
      if(rs){
        generalHeroInfo = rs;
      }

    })
    .catch(err=>{
      generalHeroInfo = {tier : tier, idHero: idHero};
    });
    

    let skills: Array<ISkillInfo> = new Array<ISkillInfo>();
    await skillInfoDataModel.find({idHero: idHero})
    .then(rs=>{
       
        rs.forEach( e =>{
          skills.push(e);
        });
    })
    .catch(err=>{
      console.log('read skill data from db error');
    });

    let general : IGeneralHeroInfoData = {
      idHero: idHero,
      name: generalHeroInfo.name,
      description: generalHeroInfo.description,
      className: generalHeroInfo.className,
      type: generalHeroInfo.type,
      tier: generalHeroInfo.tier,
      level: generalHeroInfo.level,
      star: generalHeroInfo.star,
      avatar: generalHeroInfo.avatar,
    }


    await HeroModel.heroInfo.create({ 
      idHero: idHero,
      generalHeroInfo: general,
      fightInfo : fightInfo,
      entityInfo: entityInfo,
      originFightInfo : fightInfo,
      originEntityInfo: entityInfo,
      skills : skills,
      
    },callback);

  }

  async createHero(heroData: any, callback: any) {
  
      let general: IGeneralHeroInfoData = {
        idHero: heroData?.general?.idHero,
        name: heroData?.general?.heroName,
        description: heroData?.general?.description,
        className: heroData?.general?.className,
        type: heroData?.general?.type,
        tier: heroData?.general?.tier,
        level: heroData?.general?.level,
        star: heroData?.general?.star,
        avatar: heroData?.general?.avatar,
      };


      let fightInfo: HeroModel.IFightInfo = {
        attackSpeed : heroData?.fightInfo?.attackSpeed,
        minAttackRange: heroData?.fightInfo?.minAttackRange,
        maxAttackRange: heroData?.fightInfo?.maxAttackRange,

        damage: heroData?.fightInfo?.damage,
        typeBullet: heroData?.fightInfo?.typeBullet,
      }

      let entity: HeroModel.EntityInfo = {
          armor: heroData?.entityInfo?.armor,
          magicResistance: heroData?.entityInfo?.magicResistance,
          lifeSteal: heroData?.entityInfo?.lifeSteal,
          HP: heroData?.entityInfo?.HP,
          reflect:  heroData?.entityInfo?.reflect,
          energy: heroData?.entityInfo?.energy,
          maxEnergy: heroData?.entityInfo?.maxEnergy,
          energyRegeneration: heroData?.entityInfo?.energyRegeneration,

      };

      let skill: Array<ISkillInfo> = new Array<ISkillInfo>();
      heroData.skill.forEach((data) => {
        skill.push(data);
      });

      let equipments: Array<Number> = new Array<Number>();
      heroData.equipments.forEach(data => {
        equipments.push(data);
      });
 
      let newHero = new HeroModel.heroInfo({
        idHero: heroData.id,
        tokenID: heroData.tokenID,
        equipments: equipments,
        skills: skill,

        generalHeroInfo: general,
        fightInfo: fightInfo,
        entityInfo: entity,
        originFightInfo: fightInfo,
        originEntityInfo: entity,
      });
      await newHero.save();
      await getGameData.loadGameData();
      callback('', 'Add New Hero Succeeded');
    
  }

  async updateHero(heroData: any, callback: any) {

    let className = '';
    let tier = '';
    let typeHero = '';
    if (heroData.className !== undefined) {
      className = heroData.className;
    }
    if (heroData.tier !== undefined) {
      tier = heroData.tier;
    }
    if (heroData.typeHero !== undefined) {
      typeHero = heroData.typeHero;
    }
    let general: IGeneralHeroInfoData = {
      idHero: heroData?.generalHeroInfo?.idHero,
      name: heroData?.generalHeroInfo?.name,
      description: heroData?.generalHeroInfo?.description,
      className: heroData?.generalHeroInfo?.className,
      type: heroData?.generalHeroInfo?.type,
      tier: heroData?.generalHeroInfo?.tier,
      level: heroData?.generalHeroInfo?.level,
      star: heroData?.generalHeroInfo?.star,
      avatar: heroData?.generalHeroInfo?.avatar,
    };

    let damage : HeroModel.IDamage = {
      critRate: heroData?.fightInfo?.damage.critRate,
      critDamage: heroData?.fightInfo?.damage.critDamage,
      physicDamage: heroData?.fightInfo?.damage.physicDamage,
      magicDamage: heroData?.fightInfo?.damage.magicDamage,
      pureDamage: heroData?.fightInfo?.damage.pureDamage,
    }


    let fightInfo: HeroModel.IFightInfo = {
      attackSpeed : heroData?.fightInfo?.attackSpeed,
      minAttackRange: heroData?.fightInfo?.minAttackRange,
      maxAttackRange: heroData?.fightInfo?.maxAttackRange,

      damage: damage,
      typeBullet: heroData?.fightInfo?.typeBullet
    }

    let entity: HeroModel.EntityInfo = {
      armor: heroData?.entityInfo?.armor,
      magicResistance: heroData?.entityInfo?.magicResistance,
      lifeSteal: heroData?.entityInfo?.lifeSteal,
      HP: heroData?.entityInfo?.HP,
      reflect:  heroData?.entityInfo?.reflect,
      energy: heroData?.entityInfo?.energy,
      maxEnergy: heroData?.entityInfo?.maxEnergy,
      energyRegeneration: heroData?.entityInfo?.energyRegeneration,
    };

    let skill: Array<ISkillInfo> = new Array<ISkillInfo>();
    heroData.skills.forEach((data) => {
      skill.push(data);
    });

    let equipments: Array<Equipment.IEquipment> = new Array<Equipment.IEquipment>();
    heroData.equipments.forEach(data => {
      equipments.push(data);
    });

    

    let updateHero: HeroModel.IHero = {
        
        idHero: heroData.idHero,
        tokenID: heroData.tokenID,
        equipments: equipments,
        skills: skill,

        generalHeroInfo: general,
        fightInfo: fightInfo,
        entityInfo: entity,
        isNFT: heroData.isNFT,
    };

    HeroModel.heroInfo
      .updateOne({ _id: heroData._id }, { $set: updateHero })
      .then(async (results) => {
        if (results.modifiedCount == 0) callback('', 'Data not found check parameter id');
        else {
          callback('', updateHero);
        }
      })
      .catch((err) => callback(err, ''));
  }

  async deleteHero(id: string, callback: any) {
    HeroModel.heroInfo
      .deleteOne({ _id: id })
      .then(async (results) => {
        if (results.deletedCount == 0) {
          callback('', 'Check parameter or id valid');
        } else {
          await getGameData.loadGameData();
          callback('', 'Delete Success!');
        }
      })
      .catch((err) => callback('', err));
  }

  async getHeroesOwner(walletId: string, callback: any){
    
    console.log(walletId);
    if(walletId === undefined){
      console.log('wallet ID invalid');
      callback( 'wallet ID invalid',''); 
      return;
    }

    let inventoriesItem = new Array();
    await UserInventoryModel.find({walletID: walletId, itemType: ItemType.Hero})
    .then(rs=>{
      if(!rs || rs.length == 0){
        console.log("inventori of wallet empty!");
        return;
      }
        inventoriesItem = rs;
    })
    .catch(err=> {
      console.log("inventori of wallet empty!");
      return;
    });

    if(inventoriesItem.length == 0){
      callback('',null);
      return;
    }

    
  let heroes = new Array();
  for(let i = 0; i < inventoriesItem.length; i++){
    await HeroModel.heroInfo.findOne({_id: inventoriesItem[i].itemId})
    .then(rs=>{
      if(rs)
        heroes.push( rs );
     
    })
    .catch(err=>{
      console.log(err);
    });
  }

  callback('',heroes);
  }

  async getHeroes(callback: any){

    let heros = new Array();
    generalHeroData.forEach((value,key) => {
      heros.push(value);
    });

    callback('',heros);
  }

  async levelUpHero(_id: string, callback: any){
    console.log(`levelup hero ${_id}`);

    let heroData;
    await HeroModel.heroInfo.findOne({_id: _id})
    .then(rs=>{
      if(!rs)
        return callback('','can not find hero data of _id: '+_id);
      heroData = rs;
    })
    .catch(err=>{
      return callback('','can not find hero data of _id: '+_id);
    });


    if(!levelUpDataConfig.has(heroData.idHero)){
      return callback('','can not find hero level config data of _id: '+heroData.idHero);
      
    }
    
    let dataLevelup = levelUpDataConfig.get(heroData.idHero);
    console.log(`data levelup hero ${dataLevelup}`);
    let atk = heroData?.fightInfo?.damage.physicDamage != 0 ? heroData?.fightInfo?.damage.physicDamage : heroData?.fightInfo?.damage.magicDamage;
    atk += dataLevelup.atk;
    
    let damage : HeroModel.IDamage = {
      critRate: heroData?.fightInfo?.damage.critRate + dataLevelup.critChance,
      critDamage: heroData?.fightInfo?.damage.critDamage + dataLevelup.critDamage,
      physicDamage: heroData?.fightInfo?.damage.physicDamage != 0 ?  atk : 0 ,
      magicDamage: heroData?.fightInfo?.damage.magicDamage != 0 ? atk: 0,
      pureDamage: heroData?.fightInfo?.damage.pureDamage,
    }

    let fightInfo: HeroModel.IFightInfo = {
      attackSpeed : heroData?.fightInfo?.attackSpeed + dataLevelup.atkSpeed,
      minAttackRange: heroData?.fightInfo?.minAttackRange,
      maxAttackRange: heroData?.fightInfo?.maxAttackRange,

      damage: damage,
      typeBullet: heroData?.fightInfo?.typeBullet
    }

    let entity: HeroModel.EntityInfo = {
      armor: heroData?.entityInfo?.armor + dataLevelup.armor,
      magicResistance: heroData?.entityInfo?.magicResistance + dataLevelup.magicRes,
      lifeSteal: heroData?.entityInfo?.lifeSteal,
      HP: heroData?.entityInfo?.HP + dataLevelup.Hp,
      reflect:  heroData?.entityInfo?.reflect,
      energy: heroData?.entityInfo?.energy,
      maxEnergy: heroData?.entityInfo?.maxEnergy,
      energyRegeneration: heroData?.entityInfo?.energyRegeneration,
    };

    let general: IGeneralHeroInfoData = {
      idHero: heroData?.generalHeroInfo?.idHero,
      name: heroData?.generalHeroInfo?.name,
      description: heroData?.generalHeroInfo?.description,
      className: heroData?.generalHeroInfo?.className,
      type: heroData?.generalHeroInfo?.type,
      tier: heroData?.generalHeroInfo?.tier,
      level: heroData?.generalHeroInfo?.level+1,
      star: heroData?.generalHeroInfo?.star,
      avatar: heroData?.generalHeroInfo?.avatar,
    };

    heroData.fightInfo = fightInfo;
    heroData.entityInfo = entity;
    heroData.generalHeroInfo = general;

    this.updateHero(heroData, callback);

  }

  async enchanceHero(_id: string, isEnchance: boolean, callback: any){
    console.log(`levelup hero ${_id}`);

    
    let heroData;
    await HeroModel.heroInfo.findOne({_id: _id})
    .then(rs=>{
      if(!rs)
        return callback('can not find hero data of _id: '+_id,'');
      heroData = rs;
    })
    .catch(err=>{
      return callback('can not find hero data of _id: '+_id,'');
    });

    let oldHeroData = JSON.parse(JSON.stringify(heroData));
    //console.log(heroData);
    if(!enchanceDataConfig.has(heroData.generalHeroInfo.tier)){
      return callback('can not find hero enchace config data of type: '+ heroData.generalHeroInfo.tier,'');
    }
    
    let mapEnchanceDataStar = enchanceDataConfig.get(heroData.generalHeroInfo.tier);
    let heroStarType = (heroData.generalHeroInfo.star - heroData.generalHeroInfo.star%5)/5;
    if(!mapEnchanceDataStar.has(heroStarType)){
      return callback('can not find hero enchace config data of star: '+ heroStarType,'');
    }

    let dataEnchance = mapEnchanceDataStar.get(heroStarType);
    console.log(`data levelup hero ${JSON.stringify(dataEnchance)}`);
    let atk = heroData?.fightInfo?.damage.physicDamage != 0 ? heroData?.fightInfo?.damage.physicDamage : heroData?.fightInfo?.damage.magicDamage;
    atk += dataEnchance.atk;
    
    let damage : HeroModel.IDamage = {
      critRate: heroData?.fightInfo?.damage.critRate + dataEnchance.critChance,
      critDamage: heroData?.fightInfo?.damage.critDamage + dataEnchance.critDamage,
      physicDamage: heroData?.fightInfo?.damage.physicDamage != 0 ?  atk : 0 ,
      magicDamage: heroData?.fightInfo?.damage.magicDamage != 0 ? atk: 0,
      pureDamage: heroData?.fightInfo?.damage.pureDamage,
    }

    let fightInfo: HeroModel.IFightInfo = {
      attackSpeed : heroData?.fightInfo?.attackSpeed + dataEnchance.atkSpeed,
      minAttackRange: heroData?.fightInfo?.minAttackRange,
      maxAttackRange: heroData?.fightInfo?.maxAttackRange,

      damage: damage,
      typeBullet: heroData?.fightInfo?.typeBullet
    }

    let entity: HeroModel.EntityInfo = {
      armor: heroData?.entityInfo?.armor + dataEnchance.armor,
      magicResistance: heroData?.entityInfo?.magicResistance + dataEnchance.magicRes,
      lifeSteal: heroData?.entityInfo?.lifeSteal,
      HP: heroData?.entityInfo?.HP + dataEnchance.Hp,
      reflect:  heroData?.entityInfo?.reflect,
      energy: heroData?.entityInfo?.energy,
      maxEnergy: heroData?.entityInfo?.maxEnergy,
      energyRegeneration: heroData?.entityInfo?.energyRegeneration,
    };

    let general: IGeneralHeroInfoData = {
      idHero: heroData?.generalHeroInfo?.idHero,
      name: heroData?.generalHeroInfo?.heroName,
      description: heroData?.generalHeroInfo?.description,
      className: heroData?.generalHeroInfo?.className,
      type: heroData?.generalHeroInfo?.type,
      tier: heroData?.generalHeroInfo?.tier,
      level: heroData?.generalHeroInfo?.level,
      star: heroData?.generalHeroInfo?.star+1,
      avatar: heroData?.generalHeroInfo?.avatar,
    };

    heroData.fightInfo = fightInfo;
    heroData.entityInfo = entity;
    heroData.generalHeroInfo = general;

    if(isEnchance === undefined || isEnchance === null || isEnchance ){
      this.updateHero(heroData, (err, result)=>{
        if(err){
          callback(err,[]);
        }else{
          heroData = JSON.parse(JSON.stringify(result));
          if(!enchanceDataConfig.has(heroData.generalHeroInfo.tier)){
            return callback('can not find hero enchace config data of type: '+ heroData.generalHeroInfo.tier,'');
          }
          
          let mapEnchanceDataStar = enchanceDataConfig.get(heroData.generalHeroInfo.tier);
          let heroStarType = (heroData.generalHeroInfo.star - heroData.generalHeroInfo.star%5)/5;
          if(!mapEnchanceDataStar.has(heroStarType)){
            return callback('can not find hero enchace config data of star: '+ heroStarType,'');
          }
      
          let dataEnchance = mapEnchanceDataStar.get(heroStarType);
          console.log(`data levelup hero ${JSON.stringify(dataEnchance)}`);
          let atk = heroData?.fightInfo?.damage.physicDamage != 0 ? heroData?.fightInfo?.damage.physicDamage : heroData?.fightInfo?.damage.magicDamage;
          atk += dataEnchance.atk;
          
          let damage : HeroModel.IDamage = {
            critRate: heroData?.fightInfo?.damage.critRate + dataEnchance.critChance,
            critDamage: heroData?.fightInfo?.damage.critDamage + dataEnchance.critDamage,
            physicDamage: heroData?.fightInfo?.damage.physicDamage != 0 ?  atk : 0 ,
            magicDamage: heroData?.fightInfo?.damage.magicDamage != 0 ? atk: 0,
            pureDamage: heroData?.fightInfo?.damage.pureDamage,
          }
      
          let fightInfo: HeroModel.IFightInfo = {
            attackSpeed : heroData?.fightInfo?.attackSpeed + dataEnchance.atkSpeed,
            minAttackRange: heroData?.fightInfo?.minAttackRange,
            maxAttackRange: heroData?.fightInfo?.maxAttackRange,
      
            damage: damage,
            typeBullet: heroData?.fightInfo?.typeBullet
          }
      
          let entity: HeroModel.EntityInfo = {
            armor: heroData?.entityInfo?.armor + dataEnchance.armor,
            magicResistance: heroData?.entityInfo?.magicResistance + dataEnchance.magicRes,
            lifeSteal: heroData?.entityInfo?.lifeSteal,
            HP: heroData?.entityInfo?.HP + dataEnchance.Hp,
            reflect:  heroData?.entityInfo?.reflect,
            energy: heroData?.entityInfo?.energy,
            maxEnergy: heroData?.entityInfo?.maxEnergy,
            energyRegeneration: heroData?.entityInfo?.energyRegeneration,
          };
      
          let general: IGeneralHeroInfoData = {
            idHero: heroData?.generalHeroInfo?.idHero,
            name: heroData?.generalHeroInfo?.heroName,
            description: heroData?.generalHeroInfo?.description,
            className: heroData?.generalHeroInfo?.className,
            type: heroData?.generalHeroInfo?.type,
            tier: heroData?.generalHeroInfo?.tier,
            level: heroData?.generalHeroInfo?.level,
            star: heroData?.generalHeroInfo?.star+1,
            avatar: heroData?.generalHeroInfo?.avatar,
          };
      
          heroData.fightInfo = fightInfo;
          heroData.entityInfo = entity;
          heroData.generalHeroInfo = general;
  
          callback('',[result, heroData]);
        }
      });
    }else{
      callback('',[ oldHeroData,heroData]);
    }
  }


  async equipmnentForHero(_idHero: string,_idEquipt:string, isEquipment: boolean, callback: any){
    
    console.log("call equip!");

    let heroData;
    await HeroModel.heroInfo.findOne({_id: _idHero})
    .then(rs=>{
      if(!rs)
        return callback('','can not find hero data of _id: '+_idHero);
      heroData = rs;
    })
    .catch(err=>{
      return callback('','can not find hero data of _id: '+_idHero);
    });

    if(isEquipment && heroData.equipments.length >= HeroConfig.Entity.MAX_SLOT_EQUIPMENT){
      console.log(`hero _id: ${_idHero} already equip max slot`);
      return callback( `hero _id: ${_idHero} already equip max slot`);
    }

    let equipmentData ;
    await Equipment.EquipmentModel.findOne({_id:_idEquipt })
    .then(rs=>{
      if(!rs){
        console.log(`equiptment _id: ${_idEquipt} not exist!`);
        return callback( `equiptment _id: ${_idEquipt} not exist!`,'');
      }

      equipmentData = rs;
    })
    .catch(err=>{
      console.log(`equiptment _id: ${_idEquipt} error ${err}!`);
      return callback( `equiptment _id: ${_idEquipt} error ${err}!`,'');
    });

   

    let className = '';
    let tier = '';
    let typeHero = '';
    if (heroData.className !== undefined) {
      className = heroData.className;
    }
    if (heroData.tier !== undefined) {
      tier = heroData.tier;
    }
    if (heroData.typeHero !== undefined) {
      typeHero = heroData.typeHero;
    }
    let general: IGeneralHeroInfoData = {
      idHero: heroData?.generalHeroInfo?.idHero,
      name: heroData?.generalHeroInfo?.name,
      description: heroData?.generalHeroInfo?.description,
      className: heroData?.generalHeroInfo?.className,
      type: heroData?.generalHeroInfo?.type,
      tier: heroData?.generalHeroInfo?.tier,
      level: heroData?.generalHeroInfo?.level,
      star: heroData?.generalHeroInfo?.star,
      avatar: heroData?.generalHeroInfo?.avatar,
    };

    let skill: Array<ISkillInfo> = new Array<ISkillInfo>();
    heroData.skills.forEach((data) => {
      skill.push(data);
    });

    

    let Atk = 0;
    let AtkSpd = 0;
    let CritRate = 0;
    let CritDmg = 0;
    let armor = 0;
    let magicRes = 0;
    let HP = 0;

   
    let isPlus = 1;

    let equipments: Array<Equipment.IEquipment> = new Array<Equipment.IEquipment>();
    heroData.equipments.forEach(data => {
      
      if(!isEquipment && data._id.toString() === _idEquipt){
        
        data.heroEquippedId = data._id;
        equipmentController.updateEquipment(data, (err, rs)=>{

        });

        isPlus = -1;

      }else
        equipments.push(data);
    });

    
      //equipt to hero
      if(isEquipment){
        equipments.push(equipmentData);
        isPlus = 1;
        equipmentData.heroEquippedId = heroData._id;
        equipmentController.updateEquipment(equipmentData, (err, rs)=>{

        });
      }

      equipmentData.mainStats.forEach(stats => {
        if(stats.typeStats === 'Atk'){
          Atk +=  isPlus * stats.valueStats;
        }

        if(stats.typeStats === 'HP'){
          HP += isPlus *stats.valueStats;
        }
        if(stats.typeStats === 'Armor'){
          armor += isPlus *stats.valueStats;
        }

        if(stats.typeStats === 'Atk Spd'){
          AtkSpd += isPlus *stats.valueStats;
        }
        if(stats.typeStats === 'Magic Res'){
          magicRes += isPlus *stats.valueStats;
        }

        if(stats.typeStats === 'Crit Damage'){
          CritDmg += isPlus *stats.valueStats;
        }
        if(stats.typeStats === 'Crit Chance'){
          CritRate += isPlus *stats.valueStats;
        }
    });

    equipmentData.subStats.forEach(stats => {
      if(stats.type === 'Atk'){
        Atk += isPlus *stats.value;
      }

      if(stats.type === 'HP'){
        HP += isPlus *stats.value;
      }
      if(stats.type === 'Armor'){
        armor += isPlus *stats.value;
      }

      if(stats.type === 'Atk Spd'){
        AtkSpd += isPlus *stats.value;
      }
      if(stats.type === 'Magic Res'){
        magicRes += isPlus *stats.value;
      }

      if(stats.type === 'Crit Damage'){
        CritDmg += isPlus *stats.value;
      }
      if(stats.type === 'Crit Chance'){
        CritRate += isPlus *stats.value;
      }
  });
    
      heroData.equipments = equipments;

    let damage : HeroModel.IDamage = {
      critRate: heroData?.fightInfo?.damage.critRate + CritRate,
      critDamage: heroData?.fightInfo?.damage.critDamage + CritDmg,
      physicDamage: heroData?.fightInfo?.damage.physicDamage != 0 ? heroData?.fightInfo?.damage.physicDamage + Atk:0,
      magicDamage: heroData?.fightInfo?.damage.magicDamage != 0 ? heroData?.fightInfo?.damage.magicDamage + Atk:0,
      pureDamage: heroData?.fightInfo?.damage.pureDamage,
    }


    let fightInfo: HeroModel.IFightInfo = {
      attackSpeed : heroData?.fightInfo?.attackSpeed + AtkSpd,
      minAttackRange: heroData?.fightInfo?.minAttackRange,
      maxAttackRange: heroData?.fightInfo?.maxAttackRange,

      damage: damage,
      typeBullet: heroData?.fightInfo?.typeBullet
    }

    let entity: HeroModel.EntityInfo = {
      armor: heroData?.entityInfo?.armor + armor,
      magicResistance: heroData?.entityInfo?.magicResistance + magicRes,
      lifeSteal: heroData?.entityInfo?.lifeSteal,
      HP: heroData?.entityInfo?.HP + HP,
      reflect:  heroData?.entityInfo?.reflect,
      energy: heroData?.entityInfo?.energy,
      maxEnergy: heroData?.entityInfo?.maxEnergy,
      energyRegeneration: heroData?.entityInfo?.energyRegeneration,
    };

    

      heroData.skills = skill;

      heroData.generalHeroInfo = general;
      heroData.fightInfo = fightInfo;
      heroData.entityInfo = entity;

     //console.log(heroData);
    // return callback('',updateHero);

    return this.updateHero(heroData,callback);
  }
}

const heroController = new HeroController();

export class HeroProcessor{
  ProcessMessage(msg: any, callback: any){
    switch(msg.cmd){
      case 'HERO_LEVEL_UP':
        heroController.levelUpHero(msg._id,callback);
        break;

      case 'HERO_ENCHANCE':
        heroController.enchanceHero(msg._id, msg.isEnchace, callback);
        break;

      case 'HERO_EQUIP_ITEM':
        heroController.equipmnentForHero(msg._idHero, msg._idEquipt, msg.isEquip,callback);
        break;
    }
  }
}