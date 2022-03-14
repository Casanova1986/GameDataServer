"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ConsumableController_1 = require("./ConsumableController");
var ConsumableRouter = (0, express_1.Router)();
var consumableController = new ConsumableController_1.ConsumableController();
exports.default = ConsumableRouter;
