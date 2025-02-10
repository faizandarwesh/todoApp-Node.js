import dotenv from "dotenv";

dotenv.config({
    path : "./env"
});

app.listen(process.env.PORT || 3000,()=> {
    console.log(`App is listening to port :  ${process.env.PORT}`);
});