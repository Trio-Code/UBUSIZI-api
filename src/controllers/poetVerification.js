/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable eqeqeq */
import VerificationService from '../database/services/poetVerification';
import UserService from '../database/services/user';
import * as Storage from '../helpers/storage';
import out from '../helpers/response';
import config from '../config';

class VerificationController {
  static async requestVerification(req, res) {
    try {
      const { id } = req.user;
      const verificationExist = await VerificationService.findRequest({ user: id });
      if (verificationExist) return out(res, 409, 'You already have a pending verification request', null, 'CONFLICT_ERROR');
      req.body.user = id;
      let { content1 } = req.files;
      content1 = await Storage.uploadPost(config.POSTS_BUCKET, content1);
      req.body.content1 = content1.key;

      if (req.files.content2) {
        let { content2 } = req.files;
        content2 = await Storage.uploadPost(config.POSTS_BUCKET, content2);
        req.body.content2 = content2.key;
      }
      if (req.files.content3) {
        let { content3 } = req.files;
        content3 = await Storage.uploadPost(config.POSTS_BUCKET, content3);
        req.body.content3 = content3.key;
      }

      const newRequest = await VerificationService.request(req.body);
      return out(res, 201, 'Request sent successfully!', newRequest);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async fetchRequests(req, res) {
    try {
      const requests = await VerificationService.fetchRequests();
      if (requests.length === 0) {
        return out(res, 404, 'No verification requests found', null, 'NOT_FOUND');
      }

      return out(res, 200, 'All requests fetched', requests);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async approveRequest(req, res) {
    try {
      const { id } = req.params;
      const userExist = await UserService.findUser({ _id: id });
      if (!userExist) return out(res, 404, 'We could not find a user with this id ', null, 'NOT FOUND');
      if (userExist.isPoet === true) return out(res, 400, 'This user is already verified as poet', null, 'BAD_REQUEST');
      const approvedAccount = await UserService.updateUser({ _id: id }, { isPoet: true });
      approvedAccount.password = undefined;
      return out(res, 200, 'Account has been approved Successfully', approvedAccount);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }
}
export default VerificationController;
