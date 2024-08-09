import { connect } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"



export async function POST(request : NextRequest){
     connect();
     try {
          const reqBody = await request.json();
          const {email , password} = reqBody;
          console.log(reqBody);

          //Check if user exist
          const user = await User.findOne({email});
          console.log(user)
          if(!user){
               return NextResponse.json({error:"user doesnt exist"},{status:400})
          } else {
          //Check if passsword is correct
               const validPassword = await bcrypt.compare(password,user.password);
               console.log(validPassword);
               if(!validPassword){
                    return NextResponse.json({error:"invalid password"},{status:400})
               }

               //create token data
               const tokenData = {
                    id: user._id,
                    username:user.username,
                    email:user.email
               }    
               //create token
               const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"})
               const response = NextResponse.json(
                    {
                         message:"login success",
                         success:true,
                    })
               response.cookies.set("token",token, {
                    httpOnly:true,

               });
               return response;
          }

          
     } catch (error:any) {
          return NextResponse.json({error:error.message},{status:500})
     }
}