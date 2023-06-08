import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

const connectDB = async () => {
  dotenv.config();

  const mongoURI = process.env.MONGO_URI ? process.env.MONGO_URI : "";

  try {
    const connect = await mongoose.connect(mongoURI);

    console.log(
      colors.cyan.underline(`MongoDB Connected: ${connect.connection.host}`)
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export { connectDB };
