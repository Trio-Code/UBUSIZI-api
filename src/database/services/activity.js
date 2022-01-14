import Activity from '../models/activity';

class ActivityService {
  static async createActivity(newActivity) {
    try {
      return await Activity.create(newActivity);
    } catch (error) {
      throw error;
    }
  }

  static async updateActivity(filter, update) {
    try {
      return await Activity.findOneAndUpdate(filter,
        { $push: { notifications: update } },
        { new: true });
    } catch (error) {
      throw error;
    }
  }

  static async recentActivity(owner) {
    try {
      const date = new Date().getTime();
      // 14 days 1209600000
      const fortnight = date - 1209600000;
      return await Activity.aggregate([
        {
          $match:
          {
            $and:
            [{ owner }, { createdAt: { $gte: fortnight } }, { createdAt: { $lte: date } }]
          }
        },
        {
          $sort: {
            createdAt: -1
          }
        }
      ]);
    } catch (error) {
      throw error;
    }
  }
}
export default ActivityService;
