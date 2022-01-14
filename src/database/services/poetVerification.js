import Verification from '../models/poetVerification';

class VerificationService {
  static async request(newRequest) {
    try {
      return await Verification.create(newRequest);
    } catch (error) {
      throw error;
    }
  }

  static async fetchRequests() {
    try {
      return await Verification.find().sort({ createdAt: -1 }).populate('user', ['username', 'profilePicture', 'firstname', 'lastname', 'email']);
    } catch (error) {
      throw error;
    }
  }

  static async findRequest(params) {
    try {
      return await Verification.findOne(params);
    } catch (error) {
      throw error;
    }
  }
}

export default VerificationService;
