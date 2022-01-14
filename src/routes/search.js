import { Router } from 'express';
import Controller from '../controllers/search';
import * as Authorization from '../middlewares/authorization';

const router = Router();

router.get('/:searchBy', Authorization.isUser, Controller);

export default router;
