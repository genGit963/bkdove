import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { 
    type: String,
    required: true
   },
   profilePicture:{
    type:String,
    default:""
   },
   followers:{
    type:Array,
    default: []
   },
   following:{
    type:Array,
    default:[]
   },
   description:{
    type:String,
    default:""
   }   
},{timestamps:true});


const User = mongoose.model("User", UserSchema);

export default User;
