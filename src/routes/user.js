import { Router } from 'express';
import Controller from '../controllers/user';
import postsController from '../controllers/post';
import AccountController from '../controllers/follow';
import AccountReportController from '../controllers/accountReport';
import SuggestionsController from '../controllers/suggestion';
import ActivityController from '../controllers/activity';

import * as Validations from '../middlewares/validation/user';
import * as Authorization from '../middlewares/authorization';

const router = Router();

router.get('/suggestions', Authorization.isUser, SuggestionsController.getSuggestions);
router.get('/activity', Authorization.isUser, ActivityController.recentActivity);
router.get('/recent-activities', Authorization.isUser, postsController.recentPosts);
router.get('/:id', Authorization.profile, Controller.fetchUser);
router.get('/:id/followers', Authorization.isUser, AccountController.fetchFollowers);
router.get('/:id/following', Authorization.isUser, AccountController.fetchFollowing);

router.post('/:id/report', Authorization.isUser, AccountReportController.reportAccount);
router.post('/signup', Validations.signUp, Controller.signUp);
router.post('/login', Controller.login);
router.post('/social-login', Controller.socialLogin);
router.post('/reset-password', Controller.resetPassword);

router.put('/:id/follow', Authorization.isUser, AccountController.follow);
router.put('/:id/unfollow', Authorization.isUser, AccountController.unfollow);
router.put('/verify-account', Controller.verifyAccount);
router.put('/update/change-password', Authorization.isUser, Validations.changePassword, Controller.changePassword);
router.put('/update/edit-profile', Authorization.isUser, Validations.updateProfile, Controller.updateUser);
router.put('/new-password', Controller.createNewPassword);
router.put('/update/remove-photo', Authorization.isUser, Controller.removeProfilePicture);
router.put('/update/change-photo', Authorization.isUser, Controller.changeProfilePicture);

export default router;
