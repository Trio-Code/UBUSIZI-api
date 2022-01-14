import mongoose from 'mongoose';

const AccountReportSchema = mongoose.Schema({
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reason: {
    type: String,
    required: true
  }
});

export default mongoose.model('AccountReport', AccountReportSchema);
