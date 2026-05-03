import express from "express";
import dotenv from "dotenv";
import route from "./Routes/Routes.js";
import connectDB from "./config/db.js";
import cors from "cors";

// config og dotenv
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
// first middleware to enable cors because backend should interact with frontend\
app.use(cors());

// to accept the json data add this middleware
app.use(express.json());

// routes middleware
app.use("/api/user/", route);

// db connection
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is successfully running at PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error while connecting to the Database", error);
  });
