import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
  product: {
    type: mongoose.Schema.Types.Mixed,
  },
  qty: {
    type: String,
  },
}, {
  timestamps: true
});

export default mongoose.models.cart || mongoose.model('cart', cartSchema);