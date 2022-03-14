import mongoose = require('mongoose');


export interface ISkill{
    skillName: string;
    data : Array<{
        conditions: Array<Object>,
        skillCharInfo: Object,
    }>
}


export interface ISkillDocument extends ISkill, mongoose.Document {}

const SkillSchema = new mongoose.Schema({
    skillName: String,
    data: {
        type: Array,
        of: new mongoose.Schema ({
            conditions: {
                type: Array
            },
            skillCharInfo: {type: Object}
        })
    }
});

export const skillInfoModel = mongoose.model<ISkillDocument>('Skill', SkillSchema);




