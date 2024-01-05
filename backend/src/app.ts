import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import washroomRouter from "./routes/washroomRoutes";
import { errorHandler } from "./middleware/errorMiddleware";
import { connectDB } from "./config/db";

connectDB();

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", washroomRouter);

app.use(errorHandler);

// app.get("/test", (req, res) => {
//   res.json({ message: "Connected to backend successfully!" });
// });

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
