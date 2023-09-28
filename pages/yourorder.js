import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import styles from "@/styles/Yourorder.module.css"
import axios from "axios"
import { signOut } from "next-auth/react"
export default function YourOrder(){
    const {data:session}=useSession()
    const [orderdata,setOrderdata]=useState([])
    useEffect(()=>{
        
        if(session){
            async function getorderdata(){
                let data=await axios.get(`/api/order/userorder?email=${session.user.email}`)
                
                setOrderdata(data.data.data)
            }
            getorderdata()

        }
    },[session])
    function signoutHandler(){
        signOut()
    }
    async function deleteHandler(e){
        let response=await axios.delete(`/api/order/userorderdelete?id=${e.target.id}`)
        console.log(response.data.data)
        window.location.reload()
    }
    return(
        <>
                <div className={styles.navbarcontainer}>
            <a href="/" className={styles.navitem}>home</a>
            <a href="/contact" className={styles.navitem}>contact us</a>
            <a href="/addtocart" className={styles.navitem}>your cart</a>
            <a href="/yourorder" className={styles.navitem}>your orders</a>
            <div>{session? session.user.email : "please signin"} </div>
            <button className={styles.signout} onClick={signoutHandler} >signout</button>
           
        </div>
        <div className={styles.ordercontainer}>
           
                {orderdata.map((value)=>{
                    return(
                        <div className={styles.ordersubcontainer} key={value._id} >

                        
                            <div className={styles.ordertext}> {value.username} </div>
                            <div className={styles.ordertext}> {value.address} </div>
                            {value.cart.map((subvalue)=>{
                                return(
                                    <div key={subvalue._id}>
                                    <img src={subvalue.imageLink} className={styles.orderimage}></img>
                                    <div className={styles.orderheading}> {subvalue.productName} </div>
                                    <div className={styles.orderheading}> {subvalue.description} </div>
                                    <div className={styles.orderheading}> {subvalue.price} </div>
                                   
                                    </div>
                                )
                            })}
                            <button className={styles.orderbutton} onClick={deleteHandler} id={value._id}>delete order</button>
                        </div>
                    )
})}
            </div>
      
            </>

    )
}