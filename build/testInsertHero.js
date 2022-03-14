"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let hero = require("./GameData/Heros.json");
const HeroModel_1 = require("./GameData/Hero/HeroModel");
console.log(hero);
hero.forEach(element => {
    let hero = new HeroModel_1.heroInfo({
        heroId: element.id,
        generalHeroInfo: element.general,
        mainStatInfo: element.mainStat,
        skills: element.skill,
    });
    hero.save();
});
