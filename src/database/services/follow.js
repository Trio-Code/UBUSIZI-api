import Follow from '../models/follow';

class FollowService {
  static async addFollow(data) {
    try {
      return await Follow.create(data);
    } catch (error) {
      throw error;
    }
  }

  static async findFollowing(user, following) {
    try {
      return await Follow.find({ $and: [{ following }, { owner: user }] });
    } catch (error) {
      throw error;
    }
  }

  static async follow(filter, update) {
    try {
      return await Follow.findOneAndUpdate(filter, { $push: { following: update } }, { new: true });
    } catch (error) {
      throw error;
    }
  }

  static async unfollow(filter, update) {
    try {
      return await Follow.findOneAndUpdate(filter, { $pull: { following: update } }, { new: true });
    } catch (error) {
      throw error;
    }
  }

  static async follower(filter, update) {
    try {
      return await Follow.findOneAndUpdate(filter, { $push: { followers: update } }, { new: true });
    } catch (error) {
      throw error;
    }
  }

  static async findAllFollowers(owner) {
    try {
      return await Follow.findOne(owner)
        .populate('followers', ['username', 'profilePicture', 'firstname', 'lastname']);
    } catch (error) {
      throw error;
    }
  }

  static async findAllFollowing(owner) {
    try {
      return await Follow.findOne(owner)
        .populate('following', ['username', 'profilePicture', 'firstname', 'lastname']);
    } catch (error) {
      throw error;
    }
  }

  static async removeFollower(filter, update) {
    try {
      return await Follow.findOneAndUpdate(filter, { $pull: { followers: update } }, { new: true });
    } catch (error) {
      throw error;
    }
  }

  static async findFollowers(owner) {
    try {
      return await Follow.findOne(owner);
    } catch (error) {
      throw error;
    }
  }

  static async findFollower(user, followers) {
    try {
      return await Follow.find({ $and: [{ followers }, { owner: user }] });
    } catch (error) {
      throw error;
    }
  }

  static async mostFollowers() {
    try {
      return await Follow.aggregate([
        {
          $project: {
            Followers:
            { $size: ['$followers'] },
            owner: true
          }
        },
        {
          $match: {
            Followers: { $gt: 20 }
          }
        },
        {
          $sort: {
            Followers: -1
          }
        },
        { $limit: 10 }
      ]);
    } catch (error) {
      throw error;
    }
  }
}

export default FollowService;
