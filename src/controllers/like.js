import LikeService from '../database/services/like';
import out from '../helpers/response';
import PostService from '../database/services/post';
import UserService from '../database/services/user';
import ActivityService from '../database/services/activity';

class LikeController {
  static async updateLike(req, res) {
    try {
      const { id } = req.user;
      const postId = req.params.id;
      const post = await PostService.findPost({ _id: postId });
      const user = await UserService.findUser({ _id: id });
      const postLike = await LikeService.findLike(id, postId);
      if (postLike.length > 0) return out(res, 400, 'You cannot like a post twice', null, 'BAD REQUEST');
      await LikeService.updateLikes({ post: postId }, id);
      const user1 = post.owner._id.toString();
      const user2 = user._id.toString();
      if (user1 !== user2) {
        const activity = {
          owner: post.owner._id,
          type: 'Like',
          description: `${user.username} liked your post`,
          user: user._id,
          userPic: user.profilePicture,
          postId: post._id,
          postContent: post.content,
          postType: post.type,
          color: post.color,
          createdAt: new Date().getTime()
        };
        await ActivityService.createActivity(activity);
      }
      return out(res, 200, 'Like successfull');
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER ERROR');
    }
  }

  static async unLike(req, res) {
    try {
      const { id } = req.user;
      const postId = req.params.id;
      const postLike = await LikeService.findLike(id, postId);
      if (postLike.length === 0) return out(res, 400, 'You cannot unlike a post', null, 'BAD REQUEST');
      await LikeService.unLike({ post: postId }, id);
      return out(res, 200, 'Like Successful');
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER ERROR');
    }
  }
}
export default LikeController;
