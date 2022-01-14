import { Router } from 'express';
import PostReportController from '../controllers/postReport';
import AccountReportController from '../controllers/accountReport';
import * as Authorization from '../middlewares/authorization';

const router = Router();

router.get('/posts', Authorization.isAdmin, PostReportController.fetchReportedPosts);
router.get('/accounts', Authorization.isAdmin, AccountReportController.fetchReportedAccounts);

export default router;
