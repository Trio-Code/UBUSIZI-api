/* eslint-disable import/prefer-default-export */
import validator from '../../helpers/validator';
import signUpSchema from './schemas/user/signup';
import ChangePasswordSchema from './schemas/user/changePassword';
import updateSchema from './schemas/user/update';

export const signUp = (req, res, next) => (
  validator(signUpSchema, req.body, res, next)
);
export const changePassword = (req, res, next) => (
  validator(ChangePasswordSchema, req.body, res, next)
);
export const updateProfile = (req, res, next) => (
  validator(updateSchema, req.body, res, next)
);
