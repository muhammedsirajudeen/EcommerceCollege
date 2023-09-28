import mongoose from 'mongoose';
let userModel;

if (mongoose.models && mongoose.models.userModel) {
  userModel = mongoose.models.userModel;
} else {

  const userSchema = new mongoose.Schema({
    email:String,
    password:String
  })
  userModel = mongoose.model('userModel', userSchema);
}

export default userModel;