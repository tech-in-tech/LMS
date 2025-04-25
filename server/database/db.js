import mongoose from "mongoose";
const connectDB = async()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MONGODB Connected')
  } catch (error) {
    console.log("ERROR :: ",error)
  }
}

export default connectDB