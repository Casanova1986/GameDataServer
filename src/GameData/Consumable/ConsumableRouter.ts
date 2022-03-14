import { Router } from 'express';
import { ConsumableController } from './ConsumableController';

var ConsumableRouter = Router();
var consumableController = new ConsumableController();

export default ConsumableRouter;