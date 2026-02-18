import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:[true, "Name is required"]
    },
    email:{
        type:String,
        required:[true, "Email is required"],
        unique:true,
        trim:true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    password:{
        type:String,
        required:[true, "Password is required"],
        minLength:[6, "Password must be at least 6 characters long"],
        select:false
    },
    role:{
        type:String,
        enum:["user", "admin"],
        default:"user"
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    otp:String,
    otpExpires:Date
}, {timestamps:true})

const User = mongoose.model("User", userSchema);

export default User;