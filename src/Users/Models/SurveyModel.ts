//import mongoose from '../mongoConnect';
import { Schema, model, Document } from 'mongoose';


export interface SurveyContent
{
  topicId:string,
  topicContent:string,
  option:Array<string>,
}


export interface Survey {
  title: string;
  creatorID: string;
  code:string;
  content:Array<SurveyContent> 
}

export interface ISurveyDocument extends Survey, Document {}

const schema = new Schema({
  title: { type: String, required: true },
  code: { type: String, required: true },
  creatorID: { type: String, required: true },
  content: { type: Array, required: true },
});

schema.index({
  creatorID: 1,
}, {
  sparse: true,
  background: true,
});
schema.index({
  code: 1,
}, {
  sparse: true,
  background: true,
});
export const SurveyModel = model<ISurveyDocument>('Survey', schema);
