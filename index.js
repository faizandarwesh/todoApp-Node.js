import dotenv from "dotenv";
import app from "./app.js"

dotenv.config({
    path : "./env"
});

console.log(`Testing env : ${process.env.API_KEY}`);

app.listen(process.env.PORT || 3000,()=> {
    console.log(`App is listening to port : ${process.env.PORT}`);
});