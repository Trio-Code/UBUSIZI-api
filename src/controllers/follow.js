import FollowService from '../database/services/follow';
import UserService from '../database/services/user';
import out from '../helpers/response';
import fullname from '../helpers/fullname';
import ActivityService from '../database/services/activity';

class FollowController {
  static async follow(req, res) {
    try {
      const { id } = req.user;
      const followingId = req.params.id;
      const userExist = await UserService.findUser({ _id: followingId });
      if (!userExist) {
        return out(res, 404, 'User does not exist!', null, 'NOT_FOUND');
      }
      if (followingId === id) return out(res, 400, 'You can`t follow yourself', null, 'BAD REQUEST');
      const followed = await FollowService.findFollowing(id, followingId);
      if (followed.length > 0) return out(res, 400, 'Already Following', null, 'BAD REQUEST');
      await FollowService.follow({ owner: id }, followingId);
      await FollowService.follower({ owner: followingId }, id);
      const currentUser = await UserService.findUser({ _id: id });
      const isFollowing = await FollowService.findFollowing(followingId, id);
      const activity = {
        owner: followingId,
        type: 'Follow',
        user: currentUser._id,
        isFollowing: isFollowing.length > 0,
        userPic: currentUser.profilePicture,
        description: `${currentUser.username} started following you`,
        createdAt: new Date().getTime()
      };
      await ActivityService.createActivity(activity);
      return out(res, 200, 'User followed successfully');
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER ERROR');
    }
  }

  static async unfollow(req, res) {
    try {
      const { id } = req.user;
      const followingId = req.params.id;
      const userExist = await UserService.findUser({ _id: followingId });
      if (!userExist) {
        return out(res, 404, 'User does not exist!', null, 'NOT_FOUND');
      }
      if (followingId === id) return out(res, 400, 'You can\'t unfollow yourself', null, 'BAD REQUEST');
      const followed = await FollowService.findFollowing(id, followingId);
      if (followed.length === 0) return out(res, 400, 'First follow this user, before unfollowing', null, 'BAD REQUEST');
      await FollowService.unfollow({ owner: id }, followingId);
      await FollowService.removeFollower({ owner: followingId }, id);
      return out(res, 200, 'User unfollowed successfully');
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER ERROR');
    }
  }

  static async fetchFollowers(req, res) {
    try {
      const { id } = req.params;
      const follow = await FollowService.findAllFollowers({ owner: id });
      const { followers } = follow;
      if (followers.length === 0) return out(res, 404, 'No followers yet.', null, 'NOT_FOUND');
      fullname(followers);
      return out(res, 200, ' All Followers ', followers);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER ERROR');
    }
  }

  static async fetchFollowing(req, res) {
    try {
      const { id } = req.params;
      const follow = await FollowService.findAllFollowing({ owner: id });
      const { following } = follow;
      if (following.length === 0) return out(res, 404, 'You don\'t follow any one', null, 'NOT_FOUND');
      fullname(following);
      return out(res, 200, 'The people you follow', following);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER ERROR');
    }
  }
}
export default FollowController;
