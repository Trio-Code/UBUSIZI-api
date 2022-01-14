import PostReport from '../models/postReport';

class PostReportService {
  static async reportPost(newReport) {
    try {
      return await PostReport.create(newReport);
    } catch (error) {
      throw error;
    }
  }

  static async fetchReportedPost() {
    try {
      return await PostReport.find().sort({ createdAt: -1 }).populate('owner', ['username', 'profilePicture']).populate('post', ['content', 'type'])
        .populate('reporter', ['username', 'profilePicture']);
    } catch (error) {
      throw error;
    }
  }
}

export default PostReportService;
