import Comment from '../models/comment';

class CommentService {
  static async addComment(newComment) {
    try {
      return await Comment.create(newComment);
    } catch (error) {
      throw error;
    }
  }

  static async deleteComment(comment) {
    try {
      return Comment.deleteOne(comment);
    } catch (error) {
      throw error;
    }
  }

  static async findComment(comment) {
    try {
      return await Comment.findOne(comment);
    } catch (error) {
      throw error;
    }
  }

  static async findAllComments(id) {
    try {
      return await Comment.find(id)
        .populate('user', ['username', 'profilePicture']);
    } catch (error) {
      throw error;
    }
  }

  static async countComments(id) {
    try {
      return await Comment.countDocuments(id);
    } catch (error) {
      throw error;
    }
  }

  static async findPostComents(post) {
    try {
      return await Comment.find(post).populate('user', ['_id', 'username', 'profilePicture']);
    } catch (error) {
      throw error;
    }
  }
}

export default CommentService;
