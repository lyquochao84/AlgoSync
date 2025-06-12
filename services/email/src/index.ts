import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/emailRoutes";

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

app.use('/api/email', routes);

app.listen(PORT, () => {
  console.log(`Email service running on port ${PORT}`);
});
