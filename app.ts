import express, { Application } from "express";
import cors from "cors";
import router from "./Routes/user.routes";
import morgan from "morgan";


export default function appConfig(app: Application) {
    // Middlewares
    app.use(express.json())
    app.use(cors())
    app.use(morgan("dev"))

    // ROUTES:
    app.use("/api/auth", router)
}