import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required!"],
    trim: true,
    minLength: [3, "First Name must contain at least 3 characters!"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required!"],
    trim: true,
    minLength: [3, "Last Name must contain at least 3 characters!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email!"],
  },
  phone: {
    type: String,
    required: [true, "Phone is required!"],
    validate: {
      validator: function (value) {
        return /\d{10}/.test(value);
      },
      message: "Phone number must contain exactly 10 digits!",
    },
  },
  national_identity_card_number: {
    type: String,
    required: [true, "NIC is required!"],
    validate: {
      validator: function (value) {
        return /\d{13}/.test(value);
      },
      message: "NIC must contain only 13 digits!",
    },
  },
  dob: {
    type: Date,
    required: [true, "Date of Birth is required!"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required!"],
    enum: ["Male", "Female"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minLength: [8, "Password must contain at least 8 characters!"],
    select: false, // ensure that password field is not returned by default
  },
  role: {
    type: String,
    required: [true, "User Role is required!"],
    enum: ["Patient", "Doctor", "Admin"],
  },
  doctorDepartment: {
    type: String,
    required: function () {
      return this.role === "Doctor";
    }, // Make this field required only if the role is Doctor
  },
  docAvatar: {
    public_id: {
      type: String,
      required: function () {
        return this.role === "Doctor"; // Make this field required only if the role is Doctor
      },
    },
    url: {
      type: String,
      required: function () {
        return this.role === "Doctor"; // Make this field required only if the role is Doctor
      },
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("User", userSchema);
