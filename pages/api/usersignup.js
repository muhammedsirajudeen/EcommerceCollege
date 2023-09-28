import mongoose from "mongoose";
import userModel from "@/model/userModel";
export default async function Handler(req,res){
    if(req.method==='POST'){
        if(mongoose.connection.readyState===0){
            await connectDB()
        }
        try{
            let doc=await userModel.findOne({email:req.body.email})
            console.log(doc)
            if(doc){
                res.status(200).json({data:"user present"})
            }else{
              

                let newUser=new userModel(req.body)
                try{
                    await newUser.save()
                    res.status(200).json({data:"user saved"})
                }catch(error){
                    console.log(error)
                    res.status(200).json({data:"error"})
                }
            }
        }catch(error){
            res.status(200).json({data:"error"})
        }


    }
   
}