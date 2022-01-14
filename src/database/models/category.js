import mongoose from 'mongoose';

const CategorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  coverPhoto: {
    type: String,
    required: true
  },
});

export default mongoose.model('Category', CategorySchema);
