import express, { Express } from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import authRoutes from './routes/authRoutes';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true, 
}));

// Convert data sent from body to json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Parse the cookie data
app.use(cookieParser());

app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Auth service is running on port ${PORT}`);
});