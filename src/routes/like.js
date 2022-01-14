import { Router } from 'express';
import Controller from '../controllers/like';
import * as Authorization from '../middlewares/authorization';

const router = Router();

router.put('/new/:id', Authorization.isUser, Controller.updateLike);
router.put('/unlike/:id', Authorization.isUser, Controller.unLike);

export default router;
