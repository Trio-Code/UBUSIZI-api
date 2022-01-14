/* eslint-disable no-console */
/* eslint-disable eqeqeq */
import CategoryService from '../database/services/category';
import * as Storage from '../helpers/storage';
import out from '../helpers/response';
import config from '../config';

class CategoryController {
  static async addCategory(req, res) {
    try {
      const { coverPhoto } = req.files;
      const { categoryName } = req.body;
      const exist = await CategoryService.findCategory({ categoryName });
      if (exist) return out(res, 409, 'Category already exists', null, 'CONFLICT_ERROR');
      const uploadedContent = await Storage.uploadImage(config.PROFILE_PICTURES_BUCKET, coverPhoto);
      req.body.coverPhoto = uploadedContent.key;
      const newCategory = await CategoryService.addCategory(req.body);
      return out(res, 201, 'Category added successfully!', newCategory);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const exist = await CategoryService.findCategory({ _id: id });
      if (!exist) return out(res, 404, 'Category does not exists', null, 'NOT FOUND');
      const updatedCategory = await CategoryService.UpdateCategory({ _id: id }, req.body);
      return out(res, 200, 'Category  successfully updated!', updatedCategory);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async fetchAllCategories(req, res) {
    try {
      const categories = await CategoryService.findAllCategories();
      if (categories.length === 0) return out(res, 404, 'No categories added yet!', null);
      return out(res, 200, 'Categories fetched', categories);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }
}

export default CategoryController;
