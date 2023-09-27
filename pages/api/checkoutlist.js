import mongoose from "mongoose"
import Cart from "@/model/cartModel"
import connectDB from "@/helper/db"
export default async function handler(req, res) {
    if(mongoose.connection.readyState===0){
        await connectDB()
    }

    let cartdoc=await Cart.findOne({username:req.query.email})
    if(cartdoc){
        res.status(200).json({ cartdata: cartdoc.cart })

    }else{
        res.status(200).json({ cartdata: [] })
    }
  }
  