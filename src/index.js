/* eslint-disable import/prefer-default-export */
import serverless from 'serverless-http';
import app from './app';

export const handler = serverless(app);
