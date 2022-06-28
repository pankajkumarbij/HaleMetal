import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  mobileNumber: {
    type: String,
  },
  pinCode: {
    type: String,
  },
  address: {
    type: String,
  },
  landmark: {
    type: String,
  },
  district: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  product: {
    type: mongoose.Schema.Types.Mixed,
  },
  status: {
    type: String,
    default: 'order placed'
  },
  payment_status: {
    type: String,
    default: 'payment pending'
  },
  razorpay_payment_id: {
    type: String,
  },
  razorpay_order_id: {
    type: String,
  },
  razorpay_signature: {
    type: String,
  },
  amount: {
    type: String,
  },
  vehicleType: {
    type: String,
  },
  vehicleNumber: {
    type: String,
  },
  driverName: {
    type: String,
  },
  driverMobile: {
    type: String,
  },
  transportCharge: {
    type: String,
  },
  labourCharge: {
    type: String,
  },
}, {
    timestamps: true
});

export default mongoose.models.order || mongoose.model('order', orderSchema);