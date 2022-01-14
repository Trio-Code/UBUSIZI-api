/* eslint-disable import/prefer-default-export */
import validator from '../../helpers/validator';
import categorySchema from './schemas/category/category';
import updateCategorySchema from './schemas/category/updateCategory';

export const addCategory = (req, res, next) => (
  validator(categorySchema, req.body, res, next)
);
export const UpdateCategory = (req, res, next) => (
  validator(updateCategorySchema, req.body, res, next)
);
