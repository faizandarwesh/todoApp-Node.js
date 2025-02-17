import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: [true, "Full name field is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email address field is required"],
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password field is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false, // This removes `__v`
  }
);

//This will store the hash of updated password
//This pre hook will trigger just before mongoose save call
userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = bcrypt.hash(password,10);
        next();
    }
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}

export const User = mongoose.model("User", userSchema);
