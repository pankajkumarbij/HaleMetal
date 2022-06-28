import mongoose from 'mongoose';

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const userSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: [true, 'First Name is required'],
  },
  lName :{ 
    type: String,
  },
  mobile: {
    type: String,
    required: [true, 'mobile number is required'],
  },
  email: { 
    type: String,
    required: [true, 'Email is required'],
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength:8,
  },
}, {
  timestamps: true
});

export default mongoose.models.user || mongoose.model('user', userSchema);