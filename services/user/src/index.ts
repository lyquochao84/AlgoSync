import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: process.env.CLIENT_URL, 
  credentials: true, 
}));

// Convert data sent from body to json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Routes
app.use("/user", userRoutes);

app.listen(PORT, () => {
    console.log(`User service is running on port ${PORT}`);
});