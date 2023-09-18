
import Product from "@/model/productModel"
import connectDB from "@/helper/db"
import mongoose from "mongoose"
export default async function handler(req, res) {

    if(req.method==='DELETE'){
        if(mongoose.connection.readyState===0){
            await connectDB()
        }
        try{
            let productId=req.query.id
            console.log(req.query.id)
            let doc= await Product.findByIdAndRemove(productId)
            if(!doc){
                console.log("not found")
            }else{
                console.log("deleted")
            }
        }
        catch(error){
            console.log("error happened")
        }
    }
    res.status(200).json({ name: 'John Doe' })
  }
  