/* eslint-disable eqeqeq */
import PostReportService from '../database/services/postReport';
import PostService from '../database/services/post';
import out from '../helpers/response';

class PostReportController {
  static async reportPost(req, res) {
    try {
      let { id } = req.user;
      const { id: post } = req.params;
      req.body.reporter = id;
      req.body.post = post;
      const postExist = await PostService.findPost({ _id: post });
      if (!postExist) return out(res, 404, 'No Post with that Id', null, 'NOT_FOUND');
      let { owner: { _id: owner } } = postExist;
      id = id.toString();
      owner = owner.toString();
      if (id === owner) { return out(res, 400, 'You can\'t report your own post', null, 'BAD_REQUEST'); }
      req.body.owner = owner;
      const newReport = await PostReportService.reportPost(req.body);
      return out(res, 201, 'Post Reported', newReport);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async fetchReportedPosts(req, res) {
    try {
      const posts = await PostReportService.fetchReportedPost();
      return out(res, 200, 'Post Reported', posts);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }
}

export default PostReportController;
