import { Router } from 'express';
import admin from './admin';
import user from './user';
import post from './post';
import comment from './comment';
import like from './like';
import report from './reports';
import search from './search';
import verification from './poetVerification';
import category from './category';

const router = Router();

router.use('/admin', admin);
router.use('/users', user);
router.use('/posts', post);
router.use('/comments', comment);
router.use('/likes', like);
router.use('/reports', report);
router.use('/search', search);
router.use('/verifications', verification);
router.use('/category', category);

export default router;
