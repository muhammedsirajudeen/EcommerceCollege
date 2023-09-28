import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import {  signIn } from "next-auth/react"
import CredentialsProvider from 'next-auth/providers/credentials';

import connectDB from "@/helper/db";
import userModel from "@/model/userModel";
export const authOptions = {
    // Configure one or more authentication providers
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
      CredentialsProvider({
        name:'ecommerce-college',
        credentials:{
          email:{
            label:'email',
            type:'email',
            placeholder:'name@example.com'
          },
          password:{label:'password',type:'password'}
        },
        async authorize(credentials,req){

          //here add login logic
          try{
            console.log("starting")
            console.log(credentials.email)
            let user=await userModel.findOne({email:credentials.email})
            if(user.email===credentials.email && user.password===credentials.password){
              return Promise.resolve(user)
            }else{
             return Promise.resolve(null)
            }
          }catch(error){
            console.log("error")
          }


          // const payload={
          //   email:credentials.email,
          //   password:credentials.password,
          // }
          // const res=await fetch("url",{
          //   method:'POST',
          //   body:JSON.stringify(payload),
          //   headers:{
          //     'Content-Type':'application/json'
          //   },
          // })

          // const user=await res.json()
          // if(!res.ok){
          //   throw new Error(user.message)
          // }
          // if(res.ok&&user){
          //   return user;
          // }
          // return null

        }
       })
      // ...add more providers here
    ],
    //callback is having some issues so for now just ignore it and develop other pieces

    jwt:{
      secret:"secret",
      encryption:false
    },
    session:{
      jwt:true
    },
    callbacks:{
      async jwt({token,user,account}){
        if(account&&user){
          return {
            ...token,
            accessToken:user.token,
            refreshToken:user.refreshToken
          }
        }
        return token
      },
      async session({session,token}){
        session.user.accessToken=token.accessToken
        session.user.refreshToken=token.refreshToken
        session.user.accessTokenExpires=token.accessTokenExpires
        return session
      }

    }
    
  }
  export default NextAuth(authOptions)