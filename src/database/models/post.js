import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: false
  },
  align: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: false
  },
  font: {
    type: String,
    required: false
  },
  caption: {
    type: String,
    required: false
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },

  createdAt: {
    type: Number,
    required: true
  }
});

export default mongoose.model('Post', PostSchema);
