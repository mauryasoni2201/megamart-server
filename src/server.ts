import express, { Application } from "express";
const app: Application = express();
import cors from "cors";

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectDb from "./db/db";
connectDb();

import morgan from "morgan";
import orderRouter from "./route/route";

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/orders", orderRouter);

app.listen(process.env.PORT, () => {
    console.log(`App running at ${process.env.PORT}!`);
});
