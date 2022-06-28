import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'category name is required'],
  },
  productName: {
    type: String,
    required: [true, 'product name is required'],
  },
  unit: {
    type: String,
  },
  price: {
    type: String,
  },
  size: {
    type: String,
  },
  material: {
    type: String,
  },
  brand: {
    type: String,
  },
  min_qty: {
    type: Number,
  },
  others: {
    type: mongoose.Schema.Types.Mixed,
  },
}, {
  timestamps: true
});

export default mongoose.models.product || mongoose.model('product', productSchema);