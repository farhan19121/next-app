import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextRequest ,NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";


export async function GET(request:NextRequest){
     connect();
     try {
          const userId = await getDataFromToken(request); 
          const user = await User.findOne({_id:userId}).select("-password");
          return NextResponse.json({
               message:"user found",
               data:user,
          })
     } catch (error:any) {
          NextResponse.json({error:error.message},{status:400});
          
     }
}
