import mongoose from 'mongoose';

const FollowSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],

  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ]
});

export default mongoose.model('Follow', FollowSchema);
