import mongoose from "mongoose";
const { Schema } = mongoose;

const swaggerApiSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    apiUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Documentation ||
  mongoose.model("Documentation", swaggerApiSchema);
