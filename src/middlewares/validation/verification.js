/* eslint-disable import/prefer-default-export */
import validator from '../../helpers/validator';
import requestSchema from './schemas/verification/request';

export const requestVerification = (req, res, next) => (
  validator(requestSchema, req.body, res, next)
);
