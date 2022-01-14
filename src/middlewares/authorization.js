/* eslint-disable import/prefer-default-export */
import config from '../config';
import out from '../helpers/response';
import { verify } from '../helpers/jwt';

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const decodeToken = (req) => {
  try {
    if (!req.headers.authorization) throw new Error('Invalid access token');
    const token = req.headers.authorization.split(' ')[1];
    const user = verify(token, config.JWT_SECRET);
    return user;
  } catch (error) {
    throw error;
  }
};

export const isLoggedIn = async (req, res, next) => {
  try {
    req.user = await decodeToken(req);
    return next();
  } catch (error) {
    return out(res, 401, capitalize(error.message || error), null, 'AUTHENTICATION_ERROR');
  }
};

export const isUser = async (req, res, next) => {
  try {
    req.user = await decodeToken(req, res);
    if (req.user.role !== 'user') {
      return out(res, 403, 'You don\'t have access to do that action', null, 'FORBIDDEN');
    }
    return next();
  } catch (error) {
    return out(res, 401, capitalize(error.message || error), null, 'AUTHENTICATION_ERROR');
  }
};

export const decodeProfile = (req) => {
  try {
    let user;
    if (!req.headers.authorization) return user;
    const token = req.headers.authorization.split(' ')[1];
    user = verify(token, config.JWT_SECRET);
    return user;
  } catch (error) {
    throw error;
  }
};
export const profile = async (req, res, next) => {
  try {
    req.user = await decodeProfile(req);
    if (req.user === undefined) return next();
    if (req.user.role !== 'user') {
      return out(res, 403, 'You don\'t have access to do that action', null, 'FORBIDDEN');
    }
    return next();
  } catch (error) {
    return out(res, 401, capitalize(error.message || error), null, 'AUTHENTICATION_ERROR');
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    req.user = await decodeToken(req);
    if (req.user.role !== 'admin') {
      return out(res, 403, 'You don\'t have access to do that action', null, 'FORBIDDEN');
    }
    return next();
  } catch (error) {
    return out(res, 401, capitalize(error.message || error), null, 'AUTHENTICATION_ERROR');
  }
};
