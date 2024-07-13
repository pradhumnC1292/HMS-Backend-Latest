import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minLength: [3, "First Name must contain at least 3 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minLength: [3, "Last Name must contain at least 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    validate: {
      validator: function (value) {
        return validator.isMobilePhone(value, "any", { strictMode: false });
      },
      message: "Please enter a valid phone number",
    },
  },
  message: {
    type: String,
    required: true,
    minLength: [10, "Message must be at least 10 characters"],
  },
});

// Creating model

export const Message = mongoose.model("Message", messageSchema);
