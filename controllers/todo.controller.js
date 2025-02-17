import { STATUS_CODES } from "../constants.js";
import Todo from "../models/todos.model.js";
import mongoose from "mongoose";

export const createTodo = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Title field is required" });
  }

  if (typeof title !== "string") {
    return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Title needs to be string value" });
  }

  try {
    const todo = new Todo({ title });
    await todo.save();

    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: "Todo created successfully", result: todo });
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
  }
};

export const getAllTodos = async (req, res) => {

  try {
    const todos = await Todo.find()
      .sort({ createdAt: -1 })
      .select(" -createdAt -updatedAt");

    if (todos.length == 0) {
      return res.status(STATUS_CODES.SUCCESS).json({ message: "No todos found", result: todos });
    }

    res.status(STATUS_CODES.SUCCESS).json({ message: "Todos found", result: todos });
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
  }
};

export const getTodoById = async (req, res) => {

  try {
  const { id } = req.params;

  //To validate id type
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Invalid ID format" });
  }

  //To fetch record from DB and eliminate createdAt and updatedAt keys from object
  const todo = await Todo.findById(id).select("-createdAt -updatedAt");

  if (!todo) {
    return res
      .status(STATUS_CODES.NOT_FOUND)
      .json({ message: "No record found for the specific ID" });
  }


    res.status(STATUS_CODES.SUCCESS).json({ message: "Todo found", result: todo });
  } catch (error) {
    console.error(`[getTodoById] Error: ${error.message}`, error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteAllTodos = async (req, res) => {
  try {
    const result = await Todo.deleteMany({});

    // Extract the count of deleted documents
    const deletedCount = result.deletedCount;

    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: "All Todos deleted successfully", deletedCount });
  } catch (error) {
    console.error(`[deleteAllTodos] Error: ${error.message}`, error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteTodoById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Invalid ID Format" });
    }

    const result = await Todo.findByIdAndDelete(id);
    
    if(!result){
      return res.status(STATUS_CODES.NOT_FOUND).json({message : "No record found for the specific ID"});
    }

    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: "Todo deleted successfully", result: result });
  } catch (error) {
    console.error(`[deleteTodoById] Error: ${error.message}`, error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};

export const updateTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const {title} = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Invalid ID Format" });
    }

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id },
      { title },
      {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators on update
      }
    );

    if(!updatedTodo){
      return res.status(STATUS_CODES.NOT_FOUND).json({message : "No record found for the specific ID"});
    }

    res.status(STATUS_CODES.SUCCESS).json({message : "Todo updated successfully",result : updatedTodo});

  } catch (error) {
    console.error(`[updateTodoById] Error: ${error.message}`, error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};
