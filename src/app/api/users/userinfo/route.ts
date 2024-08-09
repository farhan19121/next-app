import { NextRequest,NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";
import { connect } from "@/dbConfig/dbConfig";
import Userinfo from "@/models/crudModel";
import User from "@/models/userModel";
connect()
export async function POST(request:NextRequest){
     
     try {
        const reqBody = await request.json();
        const {username,email,name , collageId , about} = reqBody;
        const clgId = await Userinfo.findOne({collageId:collageId});
        if(clgId){
          return NextResponse.json({message:"collage id already used"});
        }else{
          const UserInfo = new Userinfo({
               username,
               email,
               name,
               collageId,
               about
          })

          const savedUserInfo = await UserInfo.save()
          console.log(savedUserInfo,"akjhdadskhg")
          return NextResponse.json({
               message:"User info updated",
               success:true,
               savedUserInfo

          })
        }

     } catch (error:any) {
          return NextResponse.json({error:error.message},{status:400})
     }
}