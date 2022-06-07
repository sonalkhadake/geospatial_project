const mongoose= require("mongoose");
// const { required } = require("nodemon/lib/config");
// const Schema= mongoose.Schema

const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
   
    // mobile_number:{
    //     type:Number,
    //     required:true
    // },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    // is_Varified:{
    //     type:Boolean
    // },
   
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
})
const User= mongoose.model("user", UserSchema);
module.exports=User;