import dotenv from "dotenv";
dotenv.config(); // 🔥 MUST BE FIRST

import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); // wait for DB connection

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server start failed:", error.message);
  }
};

startServer();