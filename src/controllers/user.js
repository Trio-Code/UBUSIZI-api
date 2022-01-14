/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import UserService from '../database/services/user';
import FollowService from '../database/services/follow';
import out from '../helpers/response';
import mailer from '../helpers/mailer';
import { sign, verify } from '../helpers/jwt';
import { generate, check } from '../helpers/bcrypt';
import * as Storage from '../helpers/storage';
import { userPostsIterator } from '../helpers/iterators';
import PostService from '../database/services/post';
import usernamefx from '../helpers/username';
import config from '../config';

class UserController {
  static async signUp(req, res) {
    try {
      const {
        username, password, email, firstname, lastname
      } = req.body;
      const exist = await UserService.findUser({ $or: [{ email }, { username }] });
      if (exist) return out(res, 409, 'Account already exists', null, 'CONFLICT_ERROR');
      if (usernamefx(username) === false) return out(res, 409, 'Username not allowed', null, 'CONFLICT_ERROR');
      const hashedPassword = await generate(password);
      req.body.password = hashedPassword;
      const newAccount = await UserService.signUp(req.body);
      newAccount.password = undefined;
      const emailSent = await mailer(['sign-up', {
        email,
        firstname,
        lastname,
        body: `${process.env.HOST}/user/verify?token=${sign(email)}`
      }, email
      ]);
      if (!emailSent) throw Error('Error sending the email');
      return out(res, 201, 'Signed up successfully!', newAccount);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async login(req, res) {
    try {
      const { account, password } = req.body;
      const user = await UserService.findUser({ $or: [{ email: account }, { username: account }] });
      if (!user) {
        const message = 'Account doesn\'t exist';
        return out(res, 404, message, null, 'NOT_FOUND');
      }
      if (user.isVerified === 'false') return out(res, 400, 'Verify your account first', null, 'BAD_REQUEST');
      const match = await check(user.password, password);
      if (!match) return out(res, 400, 'Password is Incorrect', null, 'AUTHENTICATION_ERROR');
      user._doc.token = await sign({ email: user.email, id: user._id, role: 'user' });
      user.password = undefined;
      return out(res, 200, 'Logged in successfully', user);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async socialLogin(req, res) {
    try {
      const {
        email, firstname, lastname
      } = req.body;
      let user = await UserService.findUser({ email });
      if (!user) {
        const username = firstname.toLowerCase() + lastname.toLowerCase() + Math.floor(Math.random() * 10000);
        const usernameExist = await UserService.findUser({ username });
        if (usernameExist) {
          const username2 = username + Math.floor(Math.random() * 100);
          req.body.username = username2;
        } else {
          req.body.username = username;
        }
        user = await UserService.signUp({ ...req.body, isVerified: true });
        const follow = {
          owner: user._id,
          follower: [],
          following: []
        };
        await FollowService.addFollow(follow);
      }
      user._doc.token = await sign({ email: user.email, id: user._id, role: 'user' });
      user.password = undefined;
      return out(res, 200, 'Logged in successfully ', user);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async verifyAccount(req, res) {
    try {
      const email = verify(req.query.token);
      const userExist = await UserService.findUser({ email });
      if (!userExist) return out(res, 404, 'We could not find a user with this email ', null, 'NOT FOUND');
      if (userExist.isVerified === true) return out(res, 400, 'The user is already verified', null, 'BAD_REQUEST');

      const verifiedAccount = await UserService.updateUser({ email }, { isVerified: true });
      verifiedAccount.password = undefined;
      const follow = {
        owner: verifiedAccount._id,
        follower: [],
        following: []
      };
      await FollowService.addFollow(follow);
      return out(res, 200, 'Account verified succefully, now you can login', verifiedAccount);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const { id } = req.user;
      const user = await UserService.findUser({ _id: id });
      const match = await check(user.password, oldPassword);
      if (!match) return out(res, 400, 'Old password is incorrect', null, 'BAD_REQUEST');
      if (newPassword === oldPassword) return out(res, 400, 'New password can\'t be the same as old password', null, 'BAD_REQUEST');
      const hashedPassword = await generate(newPassword);
      req.body.newPassword = hashedPassword;
      const updatedUser = await UserService.updateUser(
        { _id: id },
        { password: req.body.newPassword }
      );
      updatedUser.password = undefined;
      return out(res, 200, 'Password updated successfully', updatedUser);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async resetPassword(req, res) {
    try {
      const { account } = req.body;
      const exist = await UserService.findUser({ $or: [{ email: account }, { username: account }] });
      if (!exist) return out(res, 404, 'There is no user with that email/username', null, 'NOT_FOUND');
      const { email } = exist;
      const emailSent = await mailer(['reset-password', {
        email,
        resetBody: `${process.env.HOST}/users/password/new?token=${sign(email)}`
      }, email
      ]);
      if (!emailSent) throw Error('Error sending the email');
      exist.password = undefined;
      return out(res, 200, 'User found, go and check the link in your email!');
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async createNewPassword(req, res) {
    try {
      const email = verify(req.query.token);
      const exist = await UserService.findUser({ email });
      if (!exist) return out(res, 404, 'There is no user with that email', null, 'NOT_FOUND');
      const { password } = req.body;
      const hashedPassword = await generate(password);
      if (!password) return out(res, 400, 'The password must not be empty', null, 'BAD_REQUEST');

      const updatedPasswordAccount = await UserService.updateUser({ email }, { password: hashedPassword });
      updatedPasswordAccount.password = undefined;
      return out(res, 200, 'Password was reset successfully');
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async removeProfilePicture(req, res) {
    try {
      const { id } = req.user;
      await UserService.updateUser({ _id: id }, { profilePicture: 'none' });
      return out(res, 200, 'Profile Picture Removed');
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.user;
      const { username } = req.body;
      if (username) {
        const newUserExist = await UserService.findUser({ username });
        if (newUserExist) return out(res, 400, 'Username already exist', null, 'BAD REQUEST');
      }
      const updatedUser = await UserService.updateUser({ _id: id }, req.body);
      updatedUser.password = undefined;
      return out(res, 200, 'User Profile Updated', updatedUser);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER ERROR');
    }
  }

  static async changeProfilePicture(req, res) {
    try {
      const { id } = req.user;
      if (req.files) {
        const { photo } = req.files;
        const uploadedPhoto = await Storage.uploadImage(config.PROFILE_PICTURES_BUCKET, photo);
        req.body.profilePicture = uploadedPhoto.key;
      }
      const updatedUser = await UserService.updateUser({ _id: id }, req.body);
      updatedUser.password = undefined;
      return out(res, 200, 'User Profile Picture Updated', updatedUser);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER ERROR');
    }
  }

  static async fetchUser(req, res) {
    try {
      const name = req.params.id;
      const user = await UserService.findUser({ username: name });
      const userId = user._id;
      if (!user || user.isVerified === 'false') return out(res, 404, 'No User found', null, 'NOT_FOUND');
      user.password = undefined;
      const follower = await FollowService.findAllFollowers({ owner: userId });
      const follow = await FollowService.findAllFollowing({ owner: userId });
      const { followers } = follower;
      const { following } = follow;
      const posts = await PostService.findOwnerPosts({ owner: userId });
      user._doc.totalposts = posts.length;
      user._doc.followers = followers.length;
      user._doc.following = following.length;
      user._doc.allFollowers = followers;
      user._doc.allFollowing = following;
      if (req.user) {
        const { id } = req.user;
        const followed = await FollowService.findFollowing(id, userId);
        user._doc.isFollowing = (followed.length > 0);
        user._doc.posts = await userPostsIterator(userId, id);
        user._doc.isUser = (id === userId);
      } else {
        user._doc.isFollowing = false;
        user._doc.isUser = false;
        user._doc.posts = await userPostsIterator(userId);
      }
      return out(res, 200, 'Fetched User Profile', user);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }
}

export default UserController;
