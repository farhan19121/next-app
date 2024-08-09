import mongoose from "mongoose";

const crudSchema = new mongoose.Schema(
     {
          username:{
               type:String,
               unique:true,
          },
          email:{
               type:String,
               unique:true,
          },
          name:{
               type:String,
               required:true
          },
          collageId:{
               type:String,
               required:true,
               unique:true
          },
          about:{
               type:String,
               required:true
          }
     },{timestamps:true}
)

let Userinfo = mongoose.model("Crud",crudSchema)
export default Userinfo;