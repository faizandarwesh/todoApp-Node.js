import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const databaseConnection = async ()=> {
  try{
    const database = await mongoose.connect(`${process.env.MONGO_DB_URL}/${DB_NAME}`);
    console.log(`Database connected : ${database.connection.host}`)
  }
  catch(error){
    process.exit(1);
  }
} 

export default databaseConnection;