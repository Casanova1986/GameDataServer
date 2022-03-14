"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GuildController_1 = require("./GuildController");
var GuildRouter = (0, express_1.Router)();
let guildController = new GuildController_1.GuildController();
exports.default = GuildRouter;
