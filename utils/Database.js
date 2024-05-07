import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

const disconnectDb = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export { connectDb, disconnectDb };
