import mongoose from 'mongoose';

const VerificationSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  content1: {
    type: String,
    required: true
  },
  content2: {
    type: String,
    required: false
  },
  content3: {
    type: String,
    required: false
  },
  reason: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('Verification', VerificationSchema);
