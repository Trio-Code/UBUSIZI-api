import config from '../config';
import out from '../helpers/response';
import { sign } from '../helpers/jwt';

class AdminController {
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      if (username !== config.ADMIN_USERNAME || password !== config.ADMIN_PASSWORD) return out(res, 400, 'Username or password incorrect', null, 'AUTHENTICATION_ERROR');
      const token = await sign({ username, role: 'admin' });
      return out(res, 200, 'Logged in successfully', { username, role: 'admin', token });
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }
}
export default AdminController;
