/* eslint-disable no-plusplus */
import ActivityService from '../database/services/activity';
import out from '../helpers/response';

class ActivityController {
  static async recentActivity(req, res) {
    try {
      const { id } = req.user;
      const activities = await ActivityService.recentActivity(id);
      if (activities.length === 0) return out(res, 404, 'No activity found', null, 'NOT_FOUND');
      return out(res, 200, 'Recent activities', activities);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER ERROR');
    }
  }
}

export default ActivityController;
