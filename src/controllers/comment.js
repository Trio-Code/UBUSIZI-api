import CommentService from '../database/services/comment';
import PostService from '../database/services/post';
import out from '../helpers/response';
import UserService from '../database/services/user';
import ActivityService from '../database/services/activity';

class CommentController {
  static async addComment(req, res) {
    try {
      const { id } = req.user;
      const { id: post } = req.params;
      req.body.user = id;
      req.body.post = post;
      const postExist = await PostService.findPost({ _id: post });
      if (!postExist) return out(res, 404, 'No Post with that Id', null, 'NOT_FOUND');
      req.body.createdAt = new Date().getTime();
      const newComment = await CommentService.addComment(req.body);
      const user = await UserService.findUser({ _id: id });
      const user1 = postExist.owner._id.toString();
      const user2 = user._id.toString();
      if (user1 !== user2) {
        const activity = {
          owner: postExist.owner._id,
          type: 'Comment',
          description: `${user.username} commented on your post`,
          user: user._id,
          userPic: user.profilePicture,
          postId: postExist._id,
          postContent: postExist.content,
          postType: postExist.type,
          comment: req.body.comment,
          color: postExist.color,
          createdAt: new Date().getTime()
        };
        await ActivityService.createActivity(activity);
      }
      return out(res, 201, 'Comment created successfully', newComment);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async deleteComment(req, res) {
    try {
      const { id } = req.params;
      let { id: user } = req.user;
      const commentExist = await CommentService.findComment({ _id: id });
      if (!commentExist) return out(res, 404, 'Comment doesn`t exist ', null, 'NOT FOUND');
      user = user.toString();
      const commentedUser = commentExist.user.toString();
      if (user !== commentedUser) return out(res, 403, 'You don\'t have access to this comment', null, 'FORBIDDEN');
      await CommentService.deleteComment(commentExist);
      return out(res, 200, 'Comment Deleted Successfully');
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async fetchComment(req, res) {
    try {
      const { id } = req.params;
      const post = await PostService.findPost({ _id: id });
      if (!post) return out(res, 404, 'No post with that Id', null, 'NOT_FOUND');
      const comments = await CommentService.findAllComments({ post: id });
      return out(res, 201, 'all comments', comments);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }
}

export default CommentController;
