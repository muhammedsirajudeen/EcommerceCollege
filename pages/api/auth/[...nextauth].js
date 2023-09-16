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
    callbacks:{
      async signIn(user,account,profile){
        return '/home'

      }
    },
    jwt:"secret123"
  }
  export default NextAuth(authOptions)