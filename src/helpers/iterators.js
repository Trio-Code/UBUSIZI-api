/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import PostService from '../database/services/post';
import LikeService from '../database/services/like';
import CommentService from '../database/services/comment';
import FollowService from '../database/services/follow';
import UserService from '../database/services/user';

export const postsIterator = async (id) => {
  try {
    const myPosts = await PostService.findOwnerPosts({ owner: id });
    const posts = await Promise.all(myPosts.map(async (post) => {
      const myLikeExist = await LikeService.findLike(id, post._id);
      const myLikes = await LikeService.findPostLike({ post: post._id });
      const { likes } = myLikes;
      const likers = await Promise.all(likes.map(async (like) => {
        const likee = like;
        likee._doc.fullname = `${likee.firstname} ${likee.lastname}`;
        likee._doc.firstname = undefined;
        likee._doc.lastname = undefined;
        const liker = {
          _id: myLikes._id,
          user: likee
        };
        return liker;
      }));
      const comments = await CommentService.findPostComents({ post: post._id });
      const commenters = await Promise.all(comments.map(async (comment) => {
        const commenter = {
          _id: comment._id,
          user: comment.user,
          comment: comment.comment
        };
        return commenter;
      }));
      post._doc.isLiked = (myLikeExist.length > 0);
      post._doc.totalLikes = likers.length;
      post._doc.totalComments = commenters.length;
      post._doc.likes = likers;
      post._doc.comments = commenters;
      return post;
    }));
    return posts;
  } catch (error) {
    throw error;
  }
};

export const allPostsIterator = async (id, posts) => {
  try {
    posts = await Promise.all(posts.map(async (post) => {
      const followsOwner = await FollowService.findFollowing(id, post.owner._id);
      if (!followsOwner[0] && (String(id) !== String(post.owner._id))) return undefined;
      const postId = post._id;
      const postLikes = await LikeService.findAllLikes({ post: postId });
      const isLiked = await LikeService.findLike(id, postId);
      const result = post;
      result._doc.isLiked = (isLiked.length > 0);
      const like = postLikes[0].likes;
      const likers = await Promise.all(like.map(async (likee) => {
        const likes = likee;
        const liker = {
          _id: postLikes._id,
          user: likee
        };
        const { user } = liker;
        const likerId = user._id;
        const followed = await FollowService.findFollower(id, likerId);
        likes._doc.fullname = `${likee.firstname} ${likee.lastname}`;
        likes._doc.firstname = undefined;
        likes._doc.lastname = undefined;
        likes._doc.isFollowing = (followed.length > 0);
        return liker;
      }));
      if (like.length === 0) {
        result._doc.likes = 'none';
        result._doc.likesNo = 0;
      } else {
        result._doc.likes = like;
        result._doc.likesNo = likers.length;
      }
      let comments = await CommentService.findAllComments({ post: postId });
      if (comments.length === 0) comments = 'none';
      result._doc.comments = comments;
      result._doc.commentsNo = await CommentService.countComments({ post: postId });
      return result;
    }));
    const followingPosts = posts.filter((post) => post !== undefined);
    return followingPosts;
  } catch (error) {
    throw error;
  }
};

export const userPostsIterator = async (id, userId) => {
  try {
    const myPosts = await PostService.findOwnerPosts({ owner: id });
    const posts = await Promise.all(myPosts.map(async (post) => {
      const myLikeExist = (userId === undefined)
        ? 0
        : await LikeService.findLike(userId, post._id);
      const myLikes = await LikeService.findPostLike({ post: post._id });
      const { likes } = myLikes;
      const likers = await Promise.all(likes.map(async (like) => {
        const liker = {
          _id: myLikes._id,
          user: like
        };
        const { user } = liker;
        const likeId = user._id;
        const followed = (userId === undefined)
          ? 0
          : await FollowService.findFollowing(userId, likeId);
        like._doc.isFollowing = (followed.length > 0);
        user._doc.fullname = `${user.firstname} ${user.lastname}`;
        user._doc.firstname = undefined;
        user._doc.lastname = undefined;
        return liker;
      }));
      const comments = await CommentService.findPostComents({ post: post._id });
      const commenters = await Promise.all(comments.map(async (comment) => {
        const commenter = {
          _id: comment._id,
          user: comment.user,
          comment: comment.comment,
          createdAt: comment.createdAt
        };
        return commenter;
      }));
      post._doc.isLiked = (myLikeExist.length > 0);
      post._doc.totalLikes = likers.length;
      post._doc.totalComments = commenters.length;
      post._doc.likes = likers;
      post._doc.comments = commenters;
      return post;
    }));
    return posts;
  } catch (error) {
    throw error;
  }
};

export const recentPostsIterator = async (posts, id) => {
  try {
    const recent = [];
    let exist = false;
    const myrecent = await Promise.all(posts.map(async (post) => {
      if (recent.length === 3) {
        exist = true;
      }
      if (post.owner._id != id) {
        if (exist === false) {
          recent.push(post.owner);
        }
      }
      for (let i = 1; i <= recent.length; i++) {
        for (let x = 1; x <= recent.length; x++) {
          if (recent[i - 1] === recent[x]) {
            exist = true;
            break;
          } else {
            exist = false;
          }
        }
        if (exist) {
          break;
        }
      }
    }));
    return recent;
  } catch (error) {
    throw error;
  }
};

export const promiseMap = async (users, mostFollowers, newUsers, id) => {
  let idStr; let
    userX;
  await Promise.all(users.map(async (user) => {
    const isFollowing = await FollowService.findFollowing(id, user._id);
    idStr = id.toString();
    userX = user._id.toString();
    if (isFollowing.length === 0 && idStr !== userX) {
      newUsers.push(user);
    }
  }));
  await Promise.all(mostFollowers.map(async (user) => {
    const isFollowing = await FollowService.findFollowing(id, user.owner);
    idStr = id.toString();
    userX = user.owner.toString();
    if (isFollowing.length === 0 && idStr !== userX) {
      const ind = await UserService.findUser({ _id: user.owner });
      ind.password = undefined;
      newUsers.push(ind);
    }
  }));
};

export const suggestionsData = async (id) => {
  const newUsers = [];
  const mostFollowers = await FollowService.mostFollowers();
  const users = await UserService.findAllUsers();
  await promiseMap(users, mostFollowers, newUsers, id);
  return newUsers;
};
