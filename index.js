import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import flashcard from "./routes/flashcard.js"
import collection from "./routes/collection.js"
const app = express();
dotenv.config();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/flashcardrouter",flashcard)
app.use("/collectionrouter",collection)
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Đã xảy ra lỗi!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// MongoDB connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Kết nối với MongoDB thành công");
  } catch (error) {
    console.error("Không thể kết nối đến MongoDB:", error.message);
    throw error;
  }
};

mongoose.connection.on("error", (err) => {
  console.log("Không thể kết nối đến MongoDB:", err);
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  connect();
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
