import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { AppError } from "../errors/app.errors.js";

const UserRouter = Router();

UserRouter.post("/", async (req, res) => {
  try {
    const newUser = await new UserController().create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    if (error) {
      new AppError(400, "Erro ao cadastrar usuário")
    }
    res.status(500).json({ message: "Internal server error" });
  }
})

UserRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userController = new UserController();
    const user = await userController.getUser(id);
    res.status(200).json(user);
  } catch (error) {
    if (error) {
      new AppError(400, "Erro ao buscar usuário")
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

UserRouter.get("/", async (req, res) => {
  try {
    const userController = new UserController();
    const users = await userController.getAll();
    res.status(200).json(users);
  } catch (error) {
    if (error) {
      new AppError(400, "Erro ao buscar usuários")
    }
    res.status(500).json({ message: "Internal server error" });
  }
})

UserRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const userController = new UserController();
    const user = await userController.delete(id)
    res.status(200).json(user)
  } catch (error) {
    if (error) {
      new AppError(400, "Erro ao deletar usuário")
    }
    res.status(500).json({ message: "Internal server error" })
  }
})

export default UserRouter;