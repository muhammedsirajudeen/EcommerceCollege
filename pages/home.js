import styles from "@/styles/Home.module.css"
import { useEffect } from "react"
import { useSession } from "next-auth/react"
export default function Home(){
    const {data:session}=useSession()
    useEffect(()=>{
        console.log(session)
        if(session){
            alert(session.user.email)
        }
    },[session])
    return (
        <div className={styles.navbarcontainer}>
            <a href="/home" className={styles.navitem}>home</a>
            <a href="/contact" className={styles.navitem}>contact us</a>
            <a href="/cart" className={styles.navitem}>your cart</a>
            <button className={styles.signout}>signout</button>
        </div>
    )
}