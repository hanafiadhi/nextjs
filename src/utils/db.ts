import mongoose from "mongoose";

export const connection = async () => {
  try {
    await mongoose.connect(
      `${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`,
    );
  } catch (error) {
    throw new Error("Connection Errorr");
  }
};

