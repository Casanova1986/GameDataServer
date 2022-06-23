"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyModel = void 0;
//import mongoose from '../mongoConnect';
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    title: { type: String, required: true },
    creatorID: { type: String, required: true },
    content: { type: Array, required: true },
});
exports.SurveyModel = (0, mongoose_1.model)('Survey', schema);
