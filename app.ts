import express, { Application } from "express";
import cors from "cors";


export default function appConfig(app: Application) {
    // Middlewares
    app.use(express.json())
    app.use(cors())

    // ROUTES:
    // app.use("/api/auth", router)
}