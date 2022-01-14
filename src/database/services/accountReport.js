import AccountReport from '../models/accountReport';

class AccountReportService {
  static async reportAccount(report) {
    try {
      return await AccountReport.create(report);
    } catch (error) {
      throw error;
    }
  }

  static async fetchReportedAccounts() {
    try {
      return await AccountReport.find().sort({ createdAt: -1 }).populate('account', ['username', 'profilePicture']).populate('reporter', ['username', 'profilePicture']);
    } catch (error) {
      throw error;
    }
  }
}

export default AccountReportService;
