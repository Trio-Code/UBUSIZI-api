import mongoose from 'mongoose';

const CommentSchema = mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Number,
    required: true
  }
});

export default mongoose.model('Comment', CommentSchema);
