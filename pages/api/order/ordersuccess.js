import Cart from "@/model/cartModel"
import orderboxModel from "@/model/orderboxModel"
import mongoose from "mongoose"
import connectDB from "@/helper/db"
export default async function Handler(req,res){
    console.log(req.body)
    if(mongoose.connection.readyState===0){
        await connectDB()
    }
    let doc=await Cart.findOne({username:req.body.email})
   
    var newObj = {};

    for (var key in doc) {
    if (key !== '_id') {
        newObj[key] = doc[key];  //simple code to just transfer the properties
        }
    }

    let orderbox=new orderboxModel(newObj)
    try{
        await orderbox.save()
        await Cart.findOneAndRemove({username:req.body.email})
        res.status(200).json({data:"success"})
    }catch(error){
        console.log(error)
        res.status(403).json({data:"success"})

    }
    
}