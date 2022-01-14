import Category from '../models/category';

class CategoryService {
  static async addCategory(newCategory) {
    try {
      return await Category.create(newCategory);
    } catch (error) {
      throw error;
    }
  }

  static async findCategory(category) {
    try {
      return await Category.findOne(category);
    } catch (error) {
      throw error;
    }
  }

  static async UpdateCategory(filter, update) {
    try {
      return await Category.findOneAndUpdate(filter, update, { new: true });
    } catch (error) {
      throw error;
    }
  }

  static async findAllCategories() {
    try {
      return await Category.find();
    } catch (error) {
      throw error;
    }
  }
}

export default CategoryService;
