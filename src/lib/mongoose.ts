"user-server";
import mongoose from "mongoose";

let isConnected: boolean = false;
export const connectDatabase = async () => {
  if (!process.env.MONGODB_URL) {
    throw new Error("MongoDb url not found");
  }

  if (isConnected) {
    console.log("MongoDb is connected");
    return;
  }

  try {
    const url = process.env.MONGODB_URL;
    await mongoose.connect(url!, {
      dbName: "education",
    });
    isConnected = true;
    console.log("MongoDb is connected");
  } catch (error) {
    console.log(error);
  }
};
