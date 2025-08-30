import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { AppError } from "../errors/app.errors.js";

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

UserRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id; 
    const userController = new UserController();
    const user = await userController.getUserById(id); 
    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default UserRouter;