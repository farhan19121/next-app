"use client"
import axios from "axios"
import React, { useEffect, useState } from "react"


export default function updateDataPage() {

     const [userInfo, setUserInfo] = useState({
          username:"",
          email:"",
          name: "",
          collageId: "",
          about: ""
     })

     const fetchData = async()=>{
          try {
               const response = await axios.get('/api/users/me') ;
         
               setUserInfo({...userInfo,email:response.data.data.email,username:response.data.data.username});

          } catch (error:any) {
               console.log({ error: error.message });
          }
     }

     useEffect(()=>{fetchData()},[])

     const onSubmit = async () => {
          try {
               const response = await axios.post('/api/users/userinfo', userInfo);
               console.log("User Info updated", response.data)
          } catch (error: any) {
               console.log({ error: error.message });
          }
     }
     console.log(userInfo)


     return (
          <main className="flex min-h-screen flex-col items-center justify-between p-24">


               <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-2xl" data-v0-t="card">
                    <div className="flex flex-col space-y-1.5 p-6">
                         <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Student Information</h3>
                         <p className="text-sm text-muted-foreground">Please fill out the form below to provide your personal details.</p>
                    </div>
                    <div className="p-6">
                         <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="grid gap-4">
                                   <div className="grid gap-2">
                                        <label
                                             className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                             htmlFor="name"
                                        >
                                             Name
                                        </label>
                                        <input
                                             onChange={(e) => { setUserInfo({ ...userInfo, name: e.target.value }) }}
                                             className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                             id="name"
                                             placeholder="Enter your full name"
                                        />
                                   </div>
                                   <div className="grid gap-2">
                                        <label
                                             className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                             htmlFor="college-id"
                                        >
                                             College ID
                                        </label>
                                        <input
                                             className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                             id="college-id"
                                             onChange={(e) => { setUserInfo({ ...userInfo, collageId: e.target.value }) }}
                                             placeholder="Enter your college ID"
                                        />
                                   </div>
                              </div>
                              <div className="grid gap-4">
                                   <div className="grid gap-2">
                                        <label
                                             className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                             htmlFor="about"
                                        >
                                             About
                                        </label>
                                        <textarea
                                             onChange={(e) => { setUserInfo({ ...userInfo, about: e.target.value }) }}
                                             className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                             id="about"
                                        ></textarea>
                                   </div>
                              </div>
                              <div className="flex items-center p-6" data-id="18">
                                   <button 
                                   onClick={onSubmit}
                                   className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ml-auto" type="submit" data-id="19">Submit</button></div>
                         </form>
                    </div>
               </div>
          </main>
     )
}