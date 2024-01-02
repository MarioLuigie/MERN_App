import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api/posts", postRoutes);

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(CONNECTION_URL);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
  }
};
connectToDatabase();


