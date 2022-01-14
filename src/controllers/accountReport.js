import AccountReportService from '../database/services/accountReport';
import UserService from '../database/services/user';
import out from '../helpers/response';

class AccountReportController {
  static async reportAccount(req, res) {
    try {
      const { id } = req.user;
      const { id: accountId } = req.params;
      req.body.reporter = id;
      req.body.account = accountId;
      const accountExist = await UserService.findUser({ _id: accountId });
      if (!accountExist) return out(res, 404, 'The account you are reporting doesn\'t exist', null, 'NOT_FOUND');
      if (id === accountId) return out(res, 400, 'You can\'t report your own account', null, 'BAD_REQUEST');
      const reportedAccount = await AccountReportService.reportAccount(req.body);
      return out(res, 201, 'Account reported successfully!', reportedAccount);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async fetchReportedAccounts(req, res) {
    try {
      const accounts = await AccountReportService.fetchReportedAccounts();
      return out(res, 200, 'All reported Accounts', accounts);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }
}

export default AccountReportController;
