import {Router} from 'express';
import { skillData } from '../GetGameData';

var SkillRouter = Router();

export default SkillRouter;

SkillRouter.get('/skillInfo/:skillName',(req,res)=>{
    var skillName = req.params.skillName;
    if(skillName == null || skillName == undefined){
        res.send('skillName invalid!');
        return;
    }

    console.log(skillData);

    if(skillData.has(skillName)){
        res.send(skillData.get(skillName));
        return;
    }

    res.send(`skill info ${skillName} empty!`);
});