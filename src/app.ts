import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import UserRouter from './routes/user.routes.js';
import loginRoute from './routes/login.route.js';
import transactionRouter from './routes/transaction.route.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", UserRouter)
app.use("/api/users/login", loginRoute)
app.use("/api/users/transaction", transactionRouter)

export default app;