import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/middleware.js";
import transactionRoutes from "./routes/transactionsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import path from "path";
import cors from "cors";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/transactions", transactionRoutes);
app.use("/api/user", userRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(__dirname, "frontend", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log("Port running on 5001"));
