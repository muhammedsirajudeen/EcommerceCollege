import { useSession, signIn, signOut } from "next-auth/react"
import styles from "@/styles/Login.module.css"
import { useEffect } from "react"
export default function Login(){
    const {data:session}=useSession()
   
    
    useEffect(()=>{
        if(session){
            console.log(session.user.email)
            location.href="/home"
        }
    },[session])
   
    
    async function googlesigninHandler(){
        let user=await signIn("google")
        alert(user)
        

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
                <input type="email" className={styles.input} placeholder="email" ></input>
                <input type="password" className={styles.input} placeholder="password" ></input>
                <button onClick={passwordHandler} className={styles.googlebutton} >login</button>
                <p className={styles.or}>or</p>
                <button onClick={googlesigninHandler} className={styles.googlebutton} >google signin</button>
                <button onClick={signout} className={styles.googlebutton} >signout</button>
            
            </div>

        </div>
    )
}