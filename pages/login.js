import { useSession, signIn, signOut } from "next-auth/react"
import styles from "@/styles/Login.module.css"
import { useEffect } from "react"
export default function Login(){
    const {data:session}=useSession()
    useEffect(()=>{
        console.log(session)
        if(session){
            alert("already logged in")
        }
    },[session])
   
    
    function googlesigninHandler(){
        signIn("google")
        

    }
    function passwordHandler(){
        alert("login with passsword")
    }
    function signout(){
        signOut()
    }

    return(
        <div className={styles.maincontainer}>
            <div className={styles.subcontainer}>
                <input type="email" className={styles.input}></input>
                <input type="password" className={styles.input}></input>
                <button onClick={passwordHandler} className={styles.googlebutton} >login</button>
                <p className={styles.or}>or</p>
                <button onClick={googlesigninHandler} className={styles.googlebutton} >google signin</button>
                <button onClick={signout}>signout</button>
            
            </div>

        </div>
    )
}