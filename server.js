import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import orderRouter from "./routes/orderRoutes.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import { connectToDb } from "./config/db.js";

dotenv.config();
connectToDb();
const app = express();
app.use(cors());
app.use(express.json())

app.use("/api/prod", productRouter);
app.use("/api/user", userRouter);
app.use("/api/orders", orderRouter);


const port = process.env.PORT
app.listen(port, () => {
    console.log("app is listening on port " + port)
})

