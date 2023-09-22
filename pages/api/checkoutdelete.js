import connectDB from "@/helper/db"
import Cart from "@/model/cartModel"
import mongoose from "mongoose"
export default async function handler(req, res) {
    if(mongoose.connection.readyState===0){
        await connectDB()
    }
    if(req.method==='DELETE'){
        try{
            let productId=req.query.productId
            let email=req.query.email
            console.log(email,productId)
            let doc=await Cart.findOne({username:req.query.email})
            
            let filterdcart=doc.cart.filter((value)=>value._id!=req.query.productId)
            doc.cart=filterdcart
            console.log(doc)
            await doc.save()
            res.status(200).json({ status: 'DELETED' })
            
        }catch(error){
            console.log(error)
            res.status(200).json({ status: 'ERROR' })
        }
    }
    
    res.status(200).json({ name: 'John Doe' })
  }

  