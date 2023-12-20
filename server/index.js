import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/posts", postRoutes);

const CONNECTION_URL = process.env.CONNECTION_URL || "mongodb+srv://mklotocki86:September1939@mern.odw5adb.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(CONNECTION_URL);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};
connectToDatabase();


