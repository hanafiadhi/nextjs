import mongoose from "mongoose";
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USER,
} from "./env.constant";

export const connection = async () => {
  try {
    let url = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;
    if (DATABASE_USER && DATABASE_PASSWORD) {
      url = `mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;
    }
    await mongoose.connect(url);
  } catch (error) {
    throw new Error("Connection Errorr");
  }
};
