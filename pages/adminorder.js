import styles from "@/styles/AdminManage.module.css"
import axios from "axios"
import { useEffect, useState } from "react"
export default function AdminOrder(){
    const [orderdata,setorderData]=useState([])
    useEffect(()=>{
        async function getorderdata(){
            let data=await axios.get("/api/order/getorders")
            console.log(data.data.data)
            setorderData(data.data.data)
        }
        getorderdata()


    },[])
    async function processedHandler(e){
        console.log(e.target.id)
        let data=await axios.delete(`/api/order/orderdelete?id=${e.target.id}`)
        console.log(data.data)
        window.location.reload()
    }
    return(
        // here add the code to process the order remove the order thats the only necessary things 
        <div className={styles.ordermaincontainer}>
        <div className={styles.ordercontainer}>
            {orderdata.map((value)=>{
                return(
                    <div className={styles.ordersubcontainer} key={value._id} >
                        <div className={styles.orderheading}>{value.username}</div>
                        <div className={styles.ordertext}>address: {value.address}</div>
                            {value.cart.map((subvalue)=>{
                                return(
                                    <div key={subvalue._id}>
                                    <img src={subvalue.imageLink} className={styles.orderimage}></img>
                                    <div className={styles.ordertext}> {subvalue.productName} </div>
                                    <div className={styles.ordertext}> {subvalue.price} </div>
                                    <div className={styles.ordertext}> {subvalue.description} </div>
    
                                    </div>
                                )
                            })}
                        <button className={styles.orderbutton} id={value._id} onClick={processedHandler} >process</button>
                    </div>  
                )
            })}
        </div>
        </div>
    )
}