import { Router } from 'express';
import Controller from '../controllers/category';
import * as Validations from '../middlewares/validation/category';
import * as Authorization from '../middlewares/authorization';

const router = Router();

router.post('/new', Authorization.isAdmin, Validations.addCategory, Controller.addCategory);

router.put('/:id/update', Authorization.isAdmin, Validations.UpdateCategory, Controller.updateCategory);

router.get('/all', Controller.fetchAllCategories);

export default router;
