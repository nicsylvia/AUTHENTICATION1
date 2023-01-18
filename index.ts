import express, { Application } from "express";
import appConfig from "./app";
import DBconnection from "./Config/DB";

const port: number = 4040;

const app: Application = express();

DBconnection(); 
appConfig(app);

const server = app.listen(port, () =>{
    console.log("")
    console.log("Server is listening to port", port)
});