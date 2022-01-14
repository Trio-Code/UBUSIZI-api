import { Router } from 'express';
import Controller from '../controllers/poetVerification';
import * as Validations from '../middlewares/validation/verification';
import * as Authorization from '../middlewares/authorization';

const router = Router();

router.post('/request', Authorization.isUser, Validations.requestVerification, Controller.requestVerification);
router.get('/requests/all', Authorization.isAdmin, Controller.fetchRequests);
router.put('/requests/:id/approve', Authorization.isAdmin, Controller.approveRequest);

export default router;
