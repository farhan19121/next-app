"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage(){
const router = useRouter()

     const [data , setData] = useState("nothing");
     const onLogout = async() => {
          try {
             await axios.get('/api/users/logout');
             router.push("/login")
          } catch (error:any) {
               console.log(error.message)
          }
     }

     

     const getUserDetails = async () => {
          try {
               const res = await axios.get("/api/users/me");
               console.log(res.data);
               setData(res.data.data._id)
               
          } catch (error:any) {
               console.log({error:error.message})
               
          }
     }
     

     return (
          <div className="flex flex-col text-center item-center justify-center min-h-screen py-2">
               <h1>Profile</h1>
               <hr />
               <p>Profile page</p>
               <h2 className="text-red-200 text-2xl h-[200px]">{data==="nothing"? "Nothing":<Link href={`/profile/${data}`}></Link>}</h2>
               <button type="button" onClick={onLogout} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Alternative</button>

               <button type="button" onClick={getUserDetails} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-green-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">user</button>
               <button type="button" onClick={()=> router.push("/info")} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-green-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">update user data</button>
          
          
          </div>
     )
}