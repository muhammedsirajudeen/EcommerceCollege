import mongoose from 'mongoose';
let Cart;

if (mongoose.models && mongoose.models.Cart) {
  Cart = mongoose.models.Cart;
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
  Cart = mongoose.model('Cart', cartSchema);
}

export default Cart;