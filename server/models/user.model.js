import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    profilePicture: {
      type: String,
      required: [true, "Please Provide Avatar"],
      trim: true,
    },
    uploads: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Upload",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
