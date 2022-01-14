import Like from '../models/like';

class LikeService {
  static async addLike(likePost) {
    try {
      return await Like.create(likePost);
    } catch (error) {
      throw error;
    }
  }

  static async findLike(user, post) {
    try {
      return await Like.find({ $and: [{ post }, { likes: user }] });
    } catch (error) {
      throw error;
    }
  }

  static async findPostLike(post) {
    try {
      return await Like.findOne(post).populate('likes', ['_id', 'username', 'profilePicture', 'firstname', 'lastname']);
    } catch (error) {
      throw error;
    }
  }

  static async updateLikes(filter, update) {
    try {
      return await Like.findOneAndUpdate(filter, { $push: { likes: update } }, { new: true });
    } catch (error) {
      throw error;
    }
  }

  static async unLike(filter, update) {
    try {
      return await Like.findOneAndUpdate(filter, { $pull: { likes: update } }, { new: true });
    } catch (error) {
      throw error;
    }
  }

  static async findAllLikes(id) {
    try {
      return await Like.find(id)
        .populate('likes', ['username', 'profilePicture', 'firstname', 'lastname']);
    } catch (error) {
      throw error;
    }
  }
}

export default LikeService;
