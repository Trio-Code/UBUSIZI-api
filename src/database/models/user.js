import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default: 'none',
  },
  isVerified: {
    type: String,
    default: false,
  },
  isPoet: {
    type: String,
    default: false,
  },
  bio: {
    type: String,
    default: '**No Biography**',
  },
  socials: {
    instagram: {
      type: String,
      required: false
    },
    facebook: {
      type: String,
      required: false
    },
    twitter: {
      type: String,
      required: false
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('User', UserSchema);
