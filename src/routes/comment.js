import { Router } from 'express';
import Controller from '../controllers/comment';
import * as Authorization from '../middlewares/authorization';

const router = Router();

router.get('/post/:id', Authorization.isUser, Controller.fetchComment);

router.post('/new/:id', Authorization.isUser, Controller.addComment);

router.delete('/delete/:id', Authorization.isUser, Controller.deleteComment);

export default router;
