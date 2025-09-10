import { TransactionController } from "../controllers/transaction.controller.js";
import { Router, Request, Response } from "express";
import { AppError } from "../errors/app.errors.js";
import { authMiddleawre } from "../middlewares/authentication.js";

const transactionRouter = Router();

transactionRouter.post("/", authMiddleawre , async (req: Request, res: Response) => {
  try {
    const transact = await new TransactionController().transaction(req.body)
    console.log(transact)
    res.status(201).json(transact);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
})

export default transactionRouter;