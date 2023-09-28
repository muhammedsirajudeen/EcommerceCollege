import styles from "@/styles/Home.module.css"
import { useEffect, useState } from "react"
import { signOut, useSession } from "next-auth/react"
import axios from "axios"
export default function Home(){
    const {data:session}=useSession()
    const [productdata,setproductData]=useState([])
    const [username,setuserName]=useState("")
    useEffect(()=>{
        console.log(session)
        if(session){
            
            setuserName(session.user.email)
            // location.href="/login"
        }
        
        async function getProductdata(){
            let data=await axios.get("http://localhost:3000/api/productlist")
            console.log(data.data)
            setproductData(data.data)
        }
        getProductdata()

    },[session])
    function signoutHandler(){
        signOut()
    }
    async function checkoutHandler(e){
        console.log(e.target.id)
        let response=await axios.post("/api/checkoutupdate",{
            productid:e.target.id,
            email:username
        })
        console.log(response)
    }
    return (
        <>
        <div className={styles.navbarcontainer}>
            <a href="/" className={styles.navitem}>home</a>
            <a href="/contact" className={styles.navitem}>contact us</a>
            <a href="/addtocart" className={styles.navitem}>your cart</a>
            <a href="/yourorder" className={styles.navitem}>your orders</a>
            <button className={styles.signout} onClick={signoutHandler} >signout</button>
            <div>{username} </div>
        </div>

        <div className={styles.productmaincontainer}>
            {productdata.map((value)=>{
                return(
                    <div className={styles.productcontainer} key={value._id} >
                    <img src={value.imageLink} className={styles.productimage}></img>
                    <div className={styles.productText}>{value.productName}</div>
                    <div className={styles.productText}>{value.description}</div>
                    <div className={styles.productText}>{value.price}</div>
                    <button className={styles.checkout} id={value._id} onClick={checkoutHandler} >add to cart</button>

                    </div>
                    
                )
            })}
        </div>

        </>
    )
}