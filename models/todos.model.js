import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true,
    versionKey: false // This removes `__v`
   }
);

const Todo = mongoose.model('Todo',todoSchema);

export default Todo;
