import { json } from "express";
import Todo from "../models/todos.model.js";

export const createTodo = async (req, res) => {
  console.log(`Request body : `, req.body);

  const { title } = req.body;

  console.log(`Title : ${title}`);

  if (!title) {
    return res.status(400).json({ error: "Title field is required" });
  }

  try {
    const todo = new Todo({ title });
    await todo.save();

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
