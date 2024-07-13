import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "LATEST-HMS-DATABASE",
    })
    .then(() => {
      console.log("Database connection established successfully");
    })
    .catch((error) => {
      console.log(`Error connecting to DATABASE : ${error}`);
    });
};
