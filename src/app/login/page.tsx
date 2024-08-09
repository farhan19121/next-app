"use client";
import Link from "next//link";
import React from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import User from "@/models/userModel";
 

export default function loginPage(){
     const router = useRouter();
     const [user,setUser] = React.useState({
          email:"",
          password:"",
         
     })   
     const [ButtonDisabled , setButtonDisabled] = React.useState(false);
     const [loading , setLoading] = React.useState(false);
     const onLogin = async () => {
          try {
               setLoading(true);
               const response = await axios.post("/api/users/login",user);
               console.log("login success",response.data);
               router.push(`/profile`);
               
          } catch (error:any) {
               console.log("login Failed",error.message);
          } finally{
               setLoading(false);
          }
     }

     React.useEffect(()=>{
          if(user.email.length > 0 && user.password.length > 0 ){
               setButtonDisabled(false);
          }else{
               setButtonDisabled(true);
          }
     },[user]);

     return (
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="flex text-center flex-col">
               
               <h1 className="text-center text-2xl text-black font-bold">{loading?"proccessing":"LOGIN"}</h1>
               <label className="text-sm  " htmlFor="email">email</label>
               <input type="text" 
                    className="p-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    id="email"
                    value={user.email}
                    onChange={(e)=>setUser({...user, email: e.target.value})} 
                    placeholder="email"
                    />

               <label className="text-sm " htmlFor="password">password</label>
               <input type="text" 
                    className="p-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    id="password"
                    value={user.password}
                    onChange={(e)=>setUser({...user, password: e.target.value})} 
                    placeholder="password"
                    />

               <button
               onClick={onLogin} 
               className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{ButtonDisabled? "FILL KAR LODE":"LOGIN"}</button>
               <a className="text-black" href="/signup">visit Signup page</a>
          </div>
          </main>
     )
}