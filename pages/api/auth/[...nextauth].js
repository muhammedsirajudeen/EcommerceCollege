import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import {  signIn } from "next-auth/react"


export const authOptions = {
    // Configure one or more authentication providers
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
      // ...add more providers here
    ],
    //callback is having some issues so for now just ignore it and develop other pieces
    callbacks:{
    //   async signIn(user,account,profile){
    //     // console.log(user)   
    //     return '/home'

    //   }

    },
    jwt:{
      secret:"secret",
      encryption:false
    },
    session:{
      jwt:true
    },
    
  }
  export default NextAuth(authOptions)