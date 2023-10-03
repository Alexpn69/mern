import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./router/index.js";
import errorMiddleware from "./middleware/error-middleware.js";
dotenv.config();

mongoose.set("strictQuery", false);

const app = express();
// const corsOptions = {
//   credentials: true, 
//   origin: process.env.CLIENT_URL, 
// };
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
app.use(express.static("./files"));
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);

const PORT = process.env.PORT || 3003;
const main = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
    await mongoose
      .connect(
        process.env.URL,
        { useNewUrlParser: true },
        { useUnifiedTopology: true },
      )
      .then((res) => console.log("Connected to Mongo"))
      .catch((err) => console.log("Error of connection to Mongo"));
  } catch (error) {
    console.log(error);
  }
};
main();
