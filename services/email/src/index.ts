import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import emailRoutes from "./routes/emailRoutes";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/email', emailRoutes);

app.listen(PORT, () => {
  console.log(`Email service running on port ${PORT}`);
});
