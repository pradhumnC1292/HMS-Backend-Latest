import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./routers/messageRouter.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routers/userRouter.js";
import appointmentRouter from "./routers/appointmentRouter.js";

const app = express();
config({ path: "./config.env" });

// middleware for connecting frontend to the backend
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// middleware for reading cookie values that are sent from the client's browser(in request header) to the serve(access these cookies as an Object)
app.use(cookieParser());

// middleware for parsing data to JSON
app.use(express.json());

// This middleware allows the server to read and parse URL-encoded data sent through HTML form submissions, making this data available in req.body.
app.use(express.urlencoded({ extended: true }));

// middleware to handle file uploads
app.use(
  fileUpload({
    // This tells the middleware to save the uploaded files as temporary files on the server instead of storing them in memory
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

dbConnection();

app.use(errorMiddleware);

export default app;
