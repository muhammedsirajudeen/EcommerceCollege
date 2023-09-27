import mongoose from 'mongoose';
let orderboxModel;

if (mongoose.models && mongoose.models.orderboxModel) {
  orderboxModel = mongoose.models.orderboxModel;
} else {
  const productSchema=new mongoose.Schema({
      
      productName:String,
      price:Number,
      description:String,
      imageLink:String
  })
  const cartSchema = new mongoose.Schema({
    username:String,
    cart:[productSchema]
  })
  orderboxModel = mongoose.model('orderboxModel', cartSchema);
}

export default orderboxModel;