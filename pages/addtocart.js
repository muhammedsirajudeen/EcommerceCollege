import { useEffect, useState } from "react"
import styles from "@/styles/Addtocart.module.css"
import axios from "axios"
import { useSession } from "next-auth/react"
import { I18NProvider } from "next/dist/server/future/helpers/i18n-provider"

export default function Addtocart(){
    const {data:session}=useSession()
    const [cartdata,setCartdata]=useState([])
    
    useEffect(()=>{
        if(session){
            async function getcartdata(){
                let cartdata=await axios.get(`/api/checkoutlist?email=${session.user.email}`)
    
                setCartdata(cartdata.data.cartdata)
    
        }
            getcartdata()
        }
        
    },[session])
    function deleteHandler(){
        console.log("the button is for delete")
        // here we add code for deleting from the cart for that we have to add product id inorder 
        // to understand what product it is that we need to delete
    }
    return(
        <div className={styles.maincontainer}>
            
            <div className={styles.subcontainer}>
            <h1>YOUR CART  </h1>
            <p>  {(session)? session.user.email : "please loogin" } </p>
                {cartdata.map((value)=>{
                   
                    return(
                        <div className={styles.productcontainer}>
                           
                            <img src={value.imageLink} className={styles.productimage}></img>
                            <div className={styles.productname}>{value.productName}</div>
                            <div className={styles.description}>{value.description}</div>
                            <div className={styles.price}>{value.price}</div>
                            <button className={styles.deletebutton} onClick={deleteHandler} >delete</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}