import { useSession, signIn, signOut } from "next-auth/react"
import styles from "@/styles/Login.module.css"
import { useEffect, useState } from "react"
import axios from "axios"
export default function Login(){
    const {data:session}=useSession()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmpassword,setConfirmpassword]=useState("")
    useEffect(()=>{
        if(session){
            console.log(session.user.email)
            location.href="/"
        }
    },[session])
   
    
    async function googlesigninHandler(){
        let user=await signIn("google")
        alert(user)
        

    }
    async function passwordHandler(){
        if(password===confirmpassword){
            let response=await axios.post("/api/usersignup",{
                email:email,
                password:password
            })
           if(response.data.data!=="user saved"){
            setEmail("")
            setPassword("")
            alert(response.data.data)
            window.location="/api/auth/signin"

           }
           else if(response.data.data==="user saved"){
            window.location="/api/auth/signin"
           }
        }
        else{
            alert("password isnt same")
        }
    }
    function confirmpassHandler(e){
        setConfirmpassword(e.target.value)
    }
    function signout(){
        signOut()
    }
    function emailHandler(e){
        setEmail(e.target.value)
    }
    function passHandler(e){
        setPassword(e.target.value)
    }

    return(
        <div className={styles.maincontainer}>
            <div className={styles.subcontainer}>
                <h1>signup</h1>
                <input type="email" className={styles.input} placeholder="email" onChange={emailHandler} value={email} ></input>
                <input type="password" className={styles.input} placeholder="password" onChange={passHandler} value={password} ></input>
                <input type="password" className={styles.input} placeholder="password" onChange={confirmpassHandler} value={confirmpassword} ></input>
                <button onClick={passwordHandler} className={styles.googlebutton} >signup</button>
            
            </div>

        </div>
    )
}