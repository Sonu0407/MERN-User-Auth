import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ Database Connected Successfully");
  } catch (error) {
    console.log("❌ Failed to connect with Database", error);
    process.exit(1); // exit with failure
  }
};

export default connectDB;
