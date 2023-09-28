import { useEffect, useState } from "react"
import styles from "@/styles/Addtocart.module.css"
import homestyles from "@/styles/Home.module.css"
import axios from "axios"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import Head from "next/head"
import orderoptions from "@/helper/orderoptions"

export default function Addtocart(){
    const [price,setPrice]=useState(0)
    const {data:session}=useSession()
    const [cartdata,setCartdata]=useState([])
    
    useEffect(()=>{
        if(session){
            
            async function getcartdata(){
                let cartdata=await axios.get(`/api/checkoutlist?email=${session.user.email}`)
                let pricedata=0
                cartdata.data.cartdata.map((value)=>{
                    pricedata=pricedata+value.price
                    
                })
                setPrice(pricedata)
                setCartdata(cartdata.data.cartdata)
                
        }
            getcartdata()
        }

        
    },[session])
    async function deleteHandler(e){
        console.log(e.target.id)
        let response=await axios.delete(`/api/checkoutdelete?email=${session.user.email}&productId=${e.target.id}`)
        if(response.data.status==='DELETED'){
            window.location.reload()
        }
    }
    function signoutHandler(){
        signOut()
    }
    async function checkoutHandler(e){
        let address=prompt("enter the address")
        let confirmaddress=confirm("is the address correct? " + "\n"+ address)
        if(!confirmaddress){
            address=null

        }
        if(address){
            let response=await axios.post("/api/order/getorderid",{
                amount:price*100
            })
            console.log(response)
            let orderid=response.data.data ? response.data.data.id : null
            if(orderid){
                //code to proceeed to checkout here
                let razorpay_id=await (await axios.get("/api/env/getenv")).data.env
                orderoptions.key=razorpay_id
                orderoptions.amount=`${price}`
                orderoptions.name=session ? session.user.email : "ACME CORP" 
                orderoptions.order_id=orderid
                orderoptions.handler=async (response)=>{
                    let data=await axios.post("/api/order/ordersuccess",
                    {
                        email:session.user.email,
                        address:address
                    })
                    //here we are sending the email of the user 
                    console.log(data.data)
                    window.location.reload()
                }
                var rzp1 = new Razorpay(orderoptions);
                rzp1.on('payment.failed', function (response){
                    alert(response.error.code);
                    alert(response.error.description);
                    alert(response.error.source);
                    alert(response.error.step);
                    alert(response.error.reason);
                    alert(response.error.metadata.order_id);
                    alert(response.error.metadata.payment_id);
                });
                rzp1.open();
                e.preventDefault();
            }


        }
    }

    return(
        <>
        <Head>
            <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        </Head>
        <div className={homestyles.navbarcontainer}>
            <a href="/" className={homestyles.navitem}>home</a>
            <a href="/contact" className={homestyles.navitem}>contact us</a>
            <a href="/addtocart" className={homestyles.navitem}>your cart</a>
            <a href="/yourorder" className={homestyles.navitem}>your order</a>
            <div>{session? session.user.email : "please signin"} </div>

            <button className={styles.signout} onClick={signoutHandler} >signout</button>
            
        </div>
        <div className={styles.maincontainer}>
            
            <div className={styles.subcontainer}>
            <h1>YOUR CART  </h1>
            <p>  {(session)? session.user.email : "please loogin" } </p>
                {cartdata.map((value)=>{
                   
                    return(
                        <div className={styles.productcontainer} key={value._id} >
                           
                            <img src={value.imageLink} className={styles.productimage}></img>
                            <div className={styles.productname}>{value.productName}</div>
                            <div className={styles.description}>{value.description}</div>
                            <div className="price" >{value.price}</div>
                            <button className={styles.deletebutton} onClick={deleteHandler} id={value._id} >delete</button>
                        </div>
                    )
                })}
            </div>
            <div className={styles.checkoutwrapper}>
            <div className={styles.checkoutcontainer}>
                <div className={styles.totalprice}> TOTAL PRICE : {price}</div>
                <button className={styles.checkoutbutton} onClick={checkoutHandler} >checkout</button>                   
            </div>
            </div>
        </div>
        </>

    )
}