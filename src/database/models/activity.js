import mongoose from 'mongoose';

const ActivitySchema = mongoose.Schema({
  owner: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  user: {
    type: String,
    required: false
  },
  userPic: {
    type: String,
    required: false
  },
  postId: {
    type: String,
    required: false
  },
  postContent: {
    type: String,
    required: false
  },
  postType: {
    type: String,
    required: false
  },
  bgcolor: {
    type: String,
    required: false
  },
  comment: {
    type: String,
    required: false
  },
  isFollowing: {
    type: Boolean,
    required: false
  },
  color: {
    type: String,
    required: false
  },
  createdAt: {
    type: Number,
    required: true
  }
});

export default mongoose.model('Activity', ActivitySchema);
