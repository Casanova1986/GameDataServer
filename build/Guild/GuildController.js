"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildController = void 0;
const Guild = require("./GuildModel");
const GuildConfig = require("./GuildConfig");
function maxGuildMember(guildLevel) {
    return guildLevel * GuildConfig.MemberGuild.STEP + GuildConfig.MemberGuild.STEP;
}
class GuildController {
    async createGuild(msg, callback) {
        let guildLevel = 1;
        let region = 1;
        let maxMember = maxGuildMember(guildLevel);
        let member = 1;
        let point = 0;
        let fund = 0;
        let maxLevelReach = 10;
        let autoAcceptMember = true;
        let blockList = new Array();
        let timeCreated = new Date();
        let mapMember = new Map();
        mapMember.set(msg.leaderId, {
            role: Guild.GuildRole.LEADER,
            pointDonate: 0,
            memberID: msg.leaderId,
            fundDonate: 0,
            timeJoin: new Date(),
        });
        let guildData = new Guild.GuildModel({
            name: msg.name,
            icon: msg.icon,
            guildLevel: guildLevel,
            maxMember: maxMember,
            member: member,
            region: region,
            leaderId: msg.leaderId,
            memberList: mapMember,
            point: point,
            fund: fund,
            maxLevelReach: maxLevelReach,
            slogan: msg.slogan,
            announce: msg.announce,
            autoAcceptMember: autoAcceptMember,
            blockList: blockList,
            timeCreated: timeCreated,
        });
        let result = await guildData.save();
        callback('', result);
    }
    findGuild() { }
    deleteGuild() { }
    joinGuild() { }
    leftGuild() { }
    changeRoleMember() { }
}
exports.GuildController = GuildController;
