import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { AppError } from "../errors/app.errors.js";
import { Request, Response } from "express";
import { authMiddleawre } from "../middlewares/authentication.js";

const UserRouter = Router();

UserRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newUser = await new UserController().create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
})

UserRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const userController = new UserController();
    const user = await userController.getUser(id);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

UserRouter.get("/", async (req: Request, res: Response) => {
  try {
    const userController = new UserController();
    const users = await userController.getAll();
    res.status(200).json(users);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
})

UserRouter.delete("/:id", authMiddleawre, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const userController = new UserController();
    await userController.delete(id);

    return res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
});

UserRouter.put("/:id", authMiddleawre, async (req: Request, res: Response) => {
  try {
    const userUp = await new UserController().update(req.params.id, req.body);
    if (!userUp) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(userUp);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default UserRouter;