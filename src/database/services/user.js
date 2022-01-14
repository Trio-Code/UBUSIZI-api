import User from '../models/user';

class UserService {
  static async signUp(newUser) {
    try {
      return await User.create(newUser);
    } catch (error) {
      throw error;
    }
  }

  static async findUser(user) {
    try {
      return await User.findOne(user);
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(filter, update) {
    try {
      return await User.findOneAndUpdate(filter, update, { new: true });
    } catch (error) {
      throw error;
    }
  }

  static async findAllUsers() {
    try {
      return await User.find({ isVerified: true })
        .sort({ createdAt: -1 })
        .select('-password')
        .limit(10);
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
