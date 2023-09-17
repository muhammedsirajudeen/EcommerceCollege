delete require.cache[require.resolve('@/model/productModel')];

import Product from "@/model/productModel"
import connectDB from "@/helper/db"
import mongoose from "mongoose"
export default async function handler(req, res) {

    if(req.method==='POST'){
        if(mongoose.connection.readyState===0){
            await connectDB()
        }
        try{
           let newproduct=new Product(req.body)
           try{
            await newproduct.save()

           }catch(error){
            console.log(error)
           }

            
        }catch(error){
            console.log("error happened")
        }
    }
    res.status(200).json({ name: 'John Doe' })
  }
  