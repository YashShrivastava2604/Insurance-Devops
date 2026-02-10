import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateToken } from "../utils/generateToken.js";
import { error } from "console";
import { triggerAsyncId } from "async_hooks";

const generateOtp = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    // sameSite: "strict",
    maxAge: 5 * 24 * 60 * 60 * 1000
}

// Register
const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        const existingUser = await User.findOne({ email })

        if(existingUser && existingUser.isVerified){
            return res.status(400).json("User already exists. Please login");
        }
        
        const otp = generateOtp();

        if (existingUser && !existingUser.isVerified) {
            existingUser.otp = otp;
            existingUser.otpExpires = Date.now() + 10 * 60 * 1000;
            await existingUser.save();

            await sendEmail(
                email,
                "Verify your account",
                `<h2>Your OTP is <strong>${otp}</strong></h2>`
            );

            return res.json({ message: "OTP resent to your email" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpires: Date.now() + 10*60*1000
        })

        const emailHTML = `
            <h2>Verify your account</h2>
            <p>Your OTP is <strong>${otp}</strong>. </p>
            <p>This OTP expires in 10 minutes.</p>
        `;

        await sendEmail(email, "Verify your account", emailHTML)

        res.status(201).json({
            message: "OPT sent to your email.\nVerify your email to activate account"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Registration failed" });
    }
}

const verifyOTP = async(req, res) => {
    try {
        const { email, otp } = req.body;
        if(!email || !otp)
            return res.status(400).json({message: "Email and OTP are required"})
        const user = await User.findOne({ email })

        if( !user || user.otp !== otp || user.otpExpires < Date.now() )
            return res.status(400).json({message: "Invalid OTP"})

        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;

        await user.save();

        const token = generateToken(user._id)
        res.cookie("token", token, cookieOptions);

        return res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            message: "Email verified successfully"
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message:"Email verification failed" })
    }
}

//login
const login = async(req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password)
            return res.status(400).json({message:"Both fields are required."})

        const user = await User.findOne({ email }).select("+password")

        if(!user)
            return res.status(400).json({message:"User don't exist. Please sign in."})
        
        if(!user.isVerified)
            return res.status(400).json({message:"Please verify your email first."})

        console.log("hased password: ", user.password, ", user password: ", password);

        const doesMatch = await bcrypt.compare(password, user.password)
        if(!doesMatch)
            return res.status(500).json({message:"Invalid credentials"})

        const token = generateToken(user._id)
        res.cookie("token", token, cookieOptions)

        res.json({
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        })
    } catch(error){
        console.error(error)
        return res.status(500).json({message:"Login controller error"})
    }
}

const logout = async(req, res) => {
    res.clearCookie("token", cookieOptions);
    res.json({ message: "Logout successful" })
}

export { register, login, logout, verifyOTP }