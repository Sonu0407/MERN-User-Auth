import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    lastname: {
      type: String,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// hash password
userSchema.pre("save", async function () {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

// verify and compare password
userSchema.methods.comparePassword = async function (password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

const User = mongoose.model("User", userSchema);

export default User;
