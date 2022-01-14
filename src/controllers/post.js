/* eslint-disable eqeqeq */
import PostService from '../database/services/post';
import LikeService from '../database/services/like';
import CommentService from '../database/services/comment';
import UserService from '../database/services/user';
import * as Storage from '../helpers/storage';
import out from '../helpers/response';
import { postsIterator, allPostsIterator, recentPostsIterator } from '../helpers/iterators';
import config from '../config';

class PostController {
  static async addPost(req, res) {
    try {
      const { id } = req.user;
      const user = await UserService.findUser({ _id: id });
      if (user.isPoet === 'false') {
        return out(res, 400, 'Sorry, You have to request a poet verification first');
      }
      if (req.files) {
        const { content } = req.files;
        const uploadedContent = await Storage.uploadPost(config.POSTS_BUCKET, content);
        req.body.content = uploadedContent.key;
      }
      req.body.owner = id;
      req.body.createdAt = new Date().getTime();

      const newPost = await PostService.addPost(req.body);
      const like = {
        post: newPost._id,
        likes: []
      };
      await LikeService.addLike(like);
      return out(res, 201, 'Poem added successfully!', newPost);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async fetchAllPosts(req, res) {
    try {
      const { id } = req.user;
      const { page, limit } = req.query;
      let posts = await PostService.fetchAllPosts(parseInt(page, 10), parseInt(limit, 10));
      if (posts.length === 0) return out(res, 404, 'No posts available', null, 'NOT_FOUND');
      posts = await allPostsIterator(id, posts);
      return out(res, 200, 'Posts', posts);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async recentPosts(req, res) {
    try {
      const { id } = req.user;
      let posts = await PostService.recentPosts();
      if (posts.length === 0) return out(res, 404, 'No recent posts available', null, 'NOT_FOUND');
      posts = await allPostsIterator(id, posts);
      posts = await recentPostsIterator(posts, id);
      return out(res, 200, 'recent Posts', posts);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async fetchOwnPosts(req, res) {
    try {
      const { id } = req.user;
      let posts = await PostService.findOwnerPosts({ owner: id });
      if (posts.length === 0) return out(res, 404, 'No posts available', null, 'NOT_FOUND');
      posts = await postsIterator(id);
      return out(res, 200, 'Posts', posts);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async deletePost(req, res) {
    try {
      const { id } = req.params;
      const owner = req.user.id;
      const Post = await PostService.findPost({ _id: id });
      if (!Post) return out(res, 404, 'this  Post doesn`t exist ', null, 'NOT FOUND');
      if (Post.owner._id != owner) return out(res, 403, 'You do not have access to this post', null, 'FORBIDDEN');
      await PostService.deletePost(Post);
      return out(res, 200, 'Post Deleted Successfully');
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async fetchSinglePost(req, res) {
    try {
      const { id } = req.user;
      const { id: postId } = req.params;
      const post = await PostService.findPost({ _id: postId });
      if (!post) return out(res, 404, 'No post with that Id', null, 'NOT_FOUND');

      let comments = await CommentService.findAllComments({ post: postId });
      if (comments.length === 0) comments = 'none';

      let postLikes = await LikeService.findAllLikes({ post: postId });
      const like = postLikes[0].likes;
      const isLiked = await LikeService.findLike(id, postId);

      post._doc.commentsNo = await CommentService.countComments({ post: postId });
      post._doc.comments = comments;
      post._doc.isLiked = (isLiked.length > 0);
      if (like.length === 0) {
        postLikes = 'none';
        post._doc.likesNo = 0;
      } else {
        post._doc.likesNo = like.length;
      }
      post._doc.likes = postLikes;
      like.map((likee) => {
        const liker = likee;
        liker._doc.fullname = `${likee.firstname} ${likee.lastname}`;
        liker._doc.firstname = undefined;
        liker._doc.lastname = undefined;
        return liker;
      });
      post.owner._doc.fullname = `${post.owner.firstname} ${post.owner.lastname}`;
      post.owner.firstname = undefined;
      post.owner.lastname = undefined;
      return out(res, 200, 'Post fetched', post);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }
}

export default PostController;
