import mongoose from "mongoose";
import connectDB from "@/helper/db";
import orderboxModel from "@/model/orderboxModel";
export default async function Handler(req,res){
    if(req.method==='DELETE'){
        if(mongoose.connection.readyState===0){
            await connectDB()
        }
        try{
            let doc=await orderboxModel.findByIdAndRemove(req.query.id)
            res.status(200).json({data:"success"})
            
        }catch(error){
            console.log(error)
            res.status(200).json({data:"error occured"})

        }
        
    }
}