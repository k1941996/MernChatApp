import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const DB_OPTIONS = {
      dbName: "ChatApp",
    };
    const DATABASE_URL = process.env.MONGO_DB_URL;
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("Connection to database Successfully established"); // remove in prod
  } catch (error) {
    console.log(error);
  }
};

export { connectDB };
