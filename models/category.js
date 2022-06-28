import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Category name is required'],
  },
}, {
  timestamps: true
});

export default mongoose.models.category || mongoose.model('category', categorySchema);