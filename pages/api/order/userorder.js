import mongoose from "mongoose"
import connectDB from "@/helper/db"
import orderboxModel from "@/model/orderboxModel"
export default async function Handler(req,res){
    if(mongoose.connection.readyState===0){
        await connectDB()
    }
    try{
        let doc=await orderboxModel.find({username:req.query.email})
        res.status(200).json({data:doc})

    }catch(error){
        console.log(error)
        res.status(501).json({data:"error occured"})

    }


}