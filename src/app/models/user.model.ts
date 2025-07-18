import { Model, model, Schema } from "mongoose";
import {
  IAddress,
  IUser,
  userInstanceMethod,
  userStaticMethod,
} from "../interfaces/user.interface";

import bcrypt from "bcryptjs";
import validator from "validator";

const addressSchema = new Schema<IAddress>(
  {
    city: { type: String },
    street: { type: String },
    zip: { type: Number },
  },
  { _id: false }
);
const userSchema = new Schema<IUser, userStaticMethod, userInstanceMethod>(
  {
    firstName: {
      type: String,
      required: [true, "firstName is required"],
      trim: true,
      minlength: [3, "FirstName must be 3 crachter .got {VALUE}"],
      maxlength: 10,
    },
    lastName: { type: String, required: true, trim: true },

    age: {
      type: Number,
      required: true,
      min: [18, "must be at least 18 , got {VALUE}"],
      max: 60,
    },

    email: {
      type: String,
      unique: [true, "Email common hoye gece"],
      required: true,
      lowercase: true,
      trim: true,
      // validate: {
      //   validator: function (value) {
      //     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      //   },
      //   message: (props) => `${props.value} is not a valid email!`,
      // },
      validate: [validator.isEmail, "Invalid Email {VALUE}"],
    },
    password: { type: String, required: true, trim: true },
    role: {
      type: String,
      enum: {
        values: ["ADMIN", "USER", "GHOST"],
        message: "role is not valid got {VALUE}",
      },
      default: "user",
    },
    address: { type: addressSchema, required: true },
  },
  { timestamps: true, versionKey: false }
);

userSchema.method("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});

userSchema.static("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});
userSchema.post("save", async function (doc) {
    console.log('%s has been saved', doc._id);
});

export const User = model<IUser, userStaticMethod>("User", userSchema);
