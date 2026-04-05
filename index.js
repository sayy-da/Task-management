import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./src/app.js";
import { MONGO_URI,PORT } from "./src/constants/env.js";
dotenv.config();

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("DB Connected");
    app.listen(PORT || 5000 , () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error(err));