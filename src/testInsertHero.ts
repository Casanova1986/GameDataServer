let hero = require("./GameData/Heros.json")
import { heroInfo } from './GameData/Hero/HeroModel';


console.log(hero);

hero.forEach(element => {
    let hero = new heroInfo(
        {
            heroId: element.id,
            generalHeroInfo: element.general,
            mainStatInfo: element.mainStat,
            skills: element.skill,
        }
    );
    hero.save();

});