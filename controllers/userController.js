import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

// Patient Register API
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    national_identity_card_number,
    dob,
    gender,
    password,
    role,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !national_identity_card_number ||
    !dob ||
    !gender ||
    !password ||
    !role
  ) {
    return next(
      new ErrorHandler(
        "Please fill the form carefully and check all the fields !!",
        400
      )
    );
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler("User already Registered, Please try to Login !!", 400)
    );
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    national_identity_card_number,
    dob,
    gender,
    password,
    role: "Patient",
  });
  generateToken(user, "User Registered Successfully !!", 200, res);

  // res.status(200).json({
  //   success: true,
  //   Message: "User Registered Successfully",
  // });
});

// Login API

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword || !role) {
    return next(
      new ErrorHandler(
        "Please fill the form carefully and check all the fields !!",
        400
      )
    );
  }
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler(
        "Password and confirm password do not match. Please ensure both fields are identical",
        400
      )
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }
  if (role !== user.role) {
    return next(
      new ErrorHandler(
        "The specified role is not valid for this operation. Please select an appropriate role and try again.",
        400
      )
    );
  }
  generateToken(user, "Login Successfully!", 201, res);
  // res.status(200).json({
  //   success: true,
  //   message: "User Logged In Successfully",
  // });
});

// Add Admin API

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    national_identity_card_number,
    dob,
    gender,
    password,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !national_identity_card_number ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(
      new ErrorHandler(
        "Please fill the form carefully and check all the fields !!",
        400
      )
    );
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} with this email already Registered !!`,
        400
      )
    );
  }
  const createAdmin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    national_identity_card_number,
    dob,
    gender,
    password,
    role: "Admin",
  });
  res.status(200).json({
    success: "true",
    message: "Admin Registered Successfully",
    createAdmin,
  });
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar Required", 400));
  }
  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    //  mimetypes (Multipurpose Internet Mail Extensions) are standard way of classifying file type (Extension).
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    national_identity_card_number,
    dob,
    gender,
    password,
    doctorDepartment,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !national_identity_card_number ||
    !dob ||
    !gender ||
    !password ||
    !doctorDepartment ||
    !docAvatar
  ) {
    return next(
      new ErrorHandler(
        "Please fill the form carefully and check all the fields !!",
        400
      )
    );
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler("Doctor with this email Already Exists !", 400)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(
      new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
    );
  }
  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    national_identity_card_number,
    dob,
    gender,
    password,
    role: "Doctor",
    doctorDepartment,
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "New Doctor Registered",
    doctor,
  });
});

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const allDoctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    allDoctors,
  });
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      message: "Admin Logout Successfully",
    });
});

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      message: "Patient Logout Successfully",
    });
});
