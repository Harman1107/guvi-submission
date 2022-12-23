const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        default:null
    },
    mobile:{
        type:Number,
        default:null
    },
    age:{
        type:Number,
        default:null
    },
    gender:{
        type:String,
        default:null
    } 
},{
    timestamps:true
})

module.exports = mongoose.model("users", User);