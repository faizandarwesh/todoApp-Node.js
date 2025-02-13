import { json } from "express";
import Todo from "../models/todos.model.js";
import mongoose from "mongoose";

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
    console.log(`getAllTodos : ${todos}`);  
    if(todos.length == 0){
      return res.status(200).json({message : "No todos found"});
    }

    res.status(200).json({message : "Todos found",todos});
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getTodoById = async (req, res) => {
  //If somethings comes in URL it is called params need to handle like req.params
  //If somethings came from body/payload need to handle like req.body
  const { id } = req.params;


  //This code snippet is checking the type of id
  //Because in mongo db we don't need to specify id 
  //It will auto generate it and the type of id is ObjectId 
  //So we need to make sure the type of id we receive from params 
  // also the same not string or integer
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  console.log("Todo Id : ", id);

  const todo = await Todo.findById(id);
  console.log("Todo Object", todo);

  if (!todo) {
    res.status(404).json({ error: "No record found for the specific Id" });
  }

  try {
    res.status(200).json(todo);
  } catch (error) {

    console.error(`[getTodoById] Error: ${error.message}`, error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const deleteAllTodos = async(req,res) => {

  try{
    const result = await Todo.deleteMany({});
    console.log(`deleteAllTodos : Result : ${result}`);

    // Extract the count of deleted documents
    const deletedCount = result.deletedCount;

    res.status(200).json({message : "All Todos deleted successfully",deletedCount});
  }catch(error){
    console.error(`[deleteAllTodos] Error: ${error.message}`, error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
}

export const deleteTodoById = async(req,res) => {
    try{
      const {id} = req.params;
      console.log("deleteTodoById Id : ",id);

      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "Invalid ID Format"})
      }

      const result = await Todo.findByIdAndDelete(id);
      console.log('Todo Object : ',result);
  
      res.status(200).json({message : "Todo deleted successfully",result});

    }catch(error){
      console.error(`[deleteTodoById] Error: ${error.message}`, error);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
}

export const updateTodoById = async(req,res) => {

  try{
    const {id} = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error : "Invalid ID Format"})
    }

    const todo = await Todo.findById(id);

  
  }catch(error){
    console.error(`[updateTodoById] Error: ${error.message}`, error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }

}