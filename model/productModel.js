
import mongoose from 'mongoose';

let Product;

if (mongoose.models && mongoose.models.Product) {
  Product = mongoose.models.Product;
} else {
  const productSchema = new mongoose.Schema({
    productName: String,
    price: Number,
    description: String,
    imageLink: String,
  });
  Product = mongoose.model('Product', productSchema);
}

export default Product;