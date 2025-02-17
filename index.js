import dotenv from "dotenv";
import app from "./app.js"
import cors from "cors";
import express from "express";
import databaseConnection from "./database/connection.js";


dotenv.config({
    path : "./env"
});

// Middleware
app.use(cors());
app.use(express.json());

databaseConnection()
.then(()=>{
    app.listen(process.env.PORT || 3000,()=> {
        console.log(`App is listening to port : ${process.env.PORT}`);
    });
}).catch((error)=>{
    console.log(`Mongo DB connection failed : ${error}`);
})

//Import Routes

import todoRoutes from "./routes/todo.routes.js"
import userRoutes from "./routes/user.routes.js";

app.use('/api/todo',todoRoutes);
app.use('/api/users',userRoutes);