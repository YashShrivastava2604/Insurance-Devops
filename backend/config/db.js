import { error } from "console";
import mongoose from "mongoose";

const connectDB = async () => {
  try{
    const conn = await mongoose.connect(process.env.mongodb_uri)
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch{
    console.log(`Error in connecting mongodb \n Error: ${error}`)
    process.exit(1);
  }
}

export default connectDB;