"use client";
import Link from "next//link";
import React from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage(){
     const router = useRouter();
     const [user,setUser] = React.useState({
          email:"",
          password:"",
          username:"",
     })   
     const [buttonDisabled ,setButtonDisabled] = React.useState(false);
     const [loading,setLoading] = React.useState(true)
     const onSignup = async () => {
          try {
               setLoading(true)
               const response = await axios.post("/api/users/signup" , user);
               console.log("signup success" , response.data);
               router.push("/login");
          } catch (error:any) {
               console.log("signup failed",error.massage);
               toast.error(error.message);
          } finally {
               setLoading(false)
          }
     }

     React.useEffect(()=>{
          if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0 ){
               setButtonDisabled(false);
          }else{
               setButtonDisabled(true);
          }
     },[user]);

     return (
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="flex text-center flex-col">
               <h1>{loading?"processing":"Signup"}</h1>
               <h1 className="text-center text-2xl text-black font-bold">SIGN UP</h1>
               <label className="text-sm  " htmlFor="username">username</label>
               <input type="text" 
                    className="p-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    id="username"
                    value={user.username}
                    onChange={(e)=>setUser({...user, username: e.target.value})} 
                    placeholder="username"
                    />

               <label className="text-sm " htmlFor="password">password</label>
               <input type="text" 
                    className="p-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    id="password"
                    value={user.password}
                    onChange={(e)=>setUser({...user, password: e.target.value})} 
                    placeholder="password"
                    />

               <label className="text-sm " htmlFor="email">email</label>
               <input type="text" 
                    className="p-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    id="email"
                    value={user.email}
                    onChange={(e)=>setUser({...user, email: e.target.value})} 
                    placeholder="email"
                    />

               <button
               onClick={onSignup} 
               className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled? "no signup":"Signup"}</button>
               <a className="text-black" href="/login">visit login page</a>
          </div>
          </main>
     )
}