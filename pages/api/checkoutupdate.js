

//there is some missing logic in the code where any user can post here and update the information but for now 
//iam just overlooking and making the mvp asap
import Product from "@/model/productModel"
import Cart from "@/model/cartModel"
import mongoose from "mongoose"
import connectDB from "@/helper/db"
export default async function handler(req, res) {
    if(req.method==='POST'){
        if(mongoose.connection.readyState===0){
            await connectDB()
        }

        let productdoc=await Product.findById(req.body.productid)        
        let cartdoc=await Cart.find({username:req.body.email})
        console.log(cartdoc)
        let newdoc={}
        if(cartdoc.length===0) {
            

           
            newdoc.username=req.body.email
            newdoc.cart=[
                {
                    productName:productdoc.productName,
                    price:productdoc.price,
                    description:productdoc.description,
                    imageLink:productdoc.imageLink
                }
            ]
            console.log(newdoc)
        } else{
            //write the code to update the cart
            
        }
        
        let newcart=new Cart(newdoc)
        try{
            await newcart.save()
        }
        catch(error){
            console.log(error)
        }
        res.status(200).json({ name: 'John Doe' })
    
    }
  }
  