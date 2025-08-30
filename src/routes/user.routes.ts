import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const UserRouter = Router();

UserRouter.post("/", async (req, res) => {
  try {
    const newUser = await new UserController().create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

export default UserRouter;