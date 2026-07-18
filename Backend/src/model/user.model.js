import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true,"Name is Required"],
      trim:true
    },
    email: {
      type: String,
      required:[true,"Email is Required"],
      unique: true,
      lowercase:true,
      trim:true
    },
    password: {
      type: String,
      required:[true,"Password is Required"],
      minlength:[8,"Password Must contain 8 characters"]
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;