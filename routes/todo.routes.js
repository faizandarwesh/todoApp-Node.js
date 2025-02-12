import express from "express";
import {createTodo, getAllTodos} from "../controllers/todo.controller.js";

const router = express.Router();

router.post('/add',createTodo);
router.get('/list',getAllTodos);

export default router;