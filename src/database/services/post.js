import Post from '../models/post';

class PostService {
  static async addPost(newPost) {
    try {
      return await Post.create(newPost);
    } catch (error) {
      throw error;
    }
  }

  static async fetchAllPosts(page, limit) {
    try {
      return await Post.find()
        .sort({ createdAt: -1 })
        .populate('owner', ['username', 'profilePicture'])
        .skip((page - 1) * limit)
        .limit(limit);
    } catch (error) {
      throw error;
    }
  }

  static async recentPosts() {
    try {
      return await Post.find()
        .sort({ createdAt: -1 })
        .populate('owner', ['username', 'profilePicture']);
    } catch (error) {
      throw error;
    }
  }

  static async findPost(post) {
    try {
      return await Post.findOne(post)
        .populate('owner', ['username', 'profilePicture', 'firstname', 'lastname']);
    } catch (error) {
      throw error;
    }
  }

  static async findOwnerPosts(id) {
    try {
      return await Post.find(id)
        .sort({ createdAt: -1 });
    } catch (error) {
      throw error;
    }
  }

  static async deletePost(post) {
    try {
      return await Post.deleteOne(post);
    } catch (error) {
      throw error;
    }
  }
}

export default PostService;
