

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
       
        let newdoc={}
        newdoc.username=req.body.email
        if(cartdoc.length===0) {
            

           
           
            newdoc.cart=[
                {
                    productName:productdoc.productName,
                    price:productdoc.price,
                    description:productdoc.description,
                    imageLink:productdoc.imageLink
                }
            ]
            console.log(newdoc)
            let newcart=new Cart(newdoc)
            try{
                await newcart.save()
            }
            catch(error){
                console.log(error)
            }
        } else{
            //write the code to update the cart
            newdoc.cart=cartdoc[0].cart
            newdoc.cart.push(
                {
                    productName:productdoc.productName,
                    price:productdoc.price,
                    description:productdoc.description,
                    imageLink:productdoc.imageLink
                }
            )
            const docToReplace = await Cart.findOne({ username: req.body.email })
            console.log(docToReplace)
            docToReplace.cart=newdoc.cart
            try{
                await docToReplace.save()
            }catch(error){
                console.log(error)
            }
            
            
        }
        

        res.status(200).json({ name: 'John Doe' })
    
    }
  }
  