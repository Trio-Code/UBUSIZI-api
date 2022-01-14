import { Router } from 'express';
import Controller from '../controllers/post';
import PostReportController from '../controllers/postReport';
import * as Validations from '../middlewares/validation/post';
import * as Authorization from '../middlewares/authorization';

const router = Router();

router.get('/all', Authorization.isUser, Controller.fetchAllPosts);
router.get('/my-posts', Authorization.isUser, Controller.fetchOwnPosts);
router.get('/single/:id', Authorization.isUser, Controller.fetchSinglePost);

router.post('/new', Authorization.isUser, Validations.addPost, Controller.addPost);
router.post('/:id/report', Authorization.isUser, PostReportController.reportPost);
router.delete('/delete/:id', Authorization.isUser, Controller.deletePost);

export default router;
