// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import mongoose from "mongoose";
import connectDB from "@/helper/db";
import Product from "@/model/productModel";


export default async function handler(req, res) {
    if(mongoose.connection.readyState===0){
        await connectDB()
    }
    try {
        const productDetails = await Product.find();
        console.log(productDetails);
        res.json(productDetails);
      } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Internal server error' });
      }

    
  }
  