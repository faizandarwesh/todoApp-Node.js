import express from "express";
import {
  createTodo,
  deleteAllTodos,
  deleteTodoById,
  getAllTodos,
  getTodoById,
  updateTodoById,
} from "../controllers/todo.controller.js";

const router = express.Router();

router.post("/add", createTodo);
router.get("/list", getAllTodos);
router.get("/:id", getTodoById);
router.put("/:id", updateTodoById);
router.delete("/:id", deleteTodoById);
router.delete("/", deleteAllTodos);

export default router;
