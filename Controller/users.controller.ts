import userModels from "../Models/user.models";
import bcrypt from "bcrypt";
import { asyncHandler } from "../Utils/AsyncHandler";
import { HttpCode, AppError } from "../Utils/AppError";
import { NextFunction, Request, Response } from "express";
import {IData} from "../Interfaces/AllInterfaces"


// register:
export const register = asyncHandler(
    async(req: Request<{}, {}, IData>,
         res: Response,
         next: NextFunction
         ): Promise<Response> =>{
        
           const {fullname, email, password, stack, isAdmin} = req.body || {}; 
        //    Password bcyrpt:
        const salt: string = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);
    
           const user = await userModels.create({
            fullname,
            email,
            password: hashedpassword,
            stack,
            isAdmin,
           })
           if (!user) {
            next(
                new AppError({
                    message: "Account not Created",
                    httpCode: HttpCode.BAD_REQUEST,
                    isOperational: true
                })
            )
           }
           return res.status(201).json({
            user
           });
        }    
)

// Login:
export const login = asyncHandler(
    async(
        req: Request, 
        res: Response,
        next: NextFunction
        ): Promise<Response> =>{
            const {email, password} = req.body;
            const user = await userModels.findOne({email});
            if (!user) {
                next(
                    new AppError({
                        message: "User not found",
                        httpCode: HttpCode.NOT_FOUND,
                        isOperational: true,
                    })
                );
            }
            const checkPassword = await bcrypt.compare(password, user!.password)
            if (!checkPassword) {
                next(
                    new AppError({
                        message: "Email or password not correct",
                        httpCode: HttpCode.UNAUTHORIZED,
                        isOperational: true,
                    })
                )
            }
            return res.status(200).json({
                status: `Welcome ${user!.fullname}`
            })
    }
)

// getall:
export const getUsers = asyncHandler(
    async(
        req: Request,
        res: Response,
        next: NextFunction
        ): Promise<Response> =>{
        
            const user = await userModels.find().sort({createdAt: -1});
            return res.status(200).json({
                status: `Successfuly got ${user.length} user(s)`,
                data: user
            })
       
    }
)

// deleteone:
