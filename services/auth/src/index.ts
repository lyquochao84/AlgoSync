import express, { Express } from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import authRoutes from './routes/authRoutes';
import uploadAvatarRoutes from './routes/uploadAvatarRoutes';

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

// Parse the cookie data
app.use(cookieParser());

// Routes
app.use('/auth', authRoutes);
app.use('/upload', uploadAvatarRoutes);

app.listen(PORT, () => {
    console.log(`Auth service is running on port ${PORT}`);
});