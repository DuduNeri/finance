import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import UserRouter from './routes/user.routes.js';
import loginRoute from './routes/login.route.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", UserRouter)
app.use("/api", loginRoute)

export default app;