import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
    minLength: [3, "First Name must contain at least 3 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    trim: true,
    minLength: [3, "Last Name must contain at least 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    validate: {
      validator: function (value) {
        return /\d{10}/.test(value);
      },
      message: "Phone number must contain exactly 10 digits",
    },
  },
  national_identity_card_number: {
    type: String,
    required: [true, "NIC is required"],
    validate: {
      validator: function (value) {
        return /\d{13}/.test(value);
      },
      message: "NIC must contain exactly 13 digits",
    },
  },
  dob: {
    type: Date,
    required: [true, "Date of Birth is required"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    enum: ["Male", "Female"],
  },
  appointment_date: {
    type: String,
    required: [true, "Appointment date is required"],
  },
  department: {
    type: String,
    required: [true, "Department name is required"],
  },
  doctor: {
    firstName: {
      type: String,
      required: [true, "Doctor's first name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Doctor's last name is required"],
    },
  },
  hasVisited: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  doctorId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Doctor ID is required"],
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Patient ID is required"],
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
