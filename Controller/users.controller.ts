import userModels from "../Models/user.models";

import {Request, Response} from "express";

// register:
export const register = async(req: Request, res: Response): Promise<Response> =>{
    try {
       const {fullname, email, password, stack, isAdmin} = req.body; 
       const user = await userModels.create({
        fullname,
        email,
        password,
        stack,
        isAdmin,
       })
       if (!user) {
        return res.status(401).json({
            status: "Please fill in the required field",
        })
       }
       return res.status(201).json({
        status: "Successfully created a user",
        data: user
       })
    } catch (error) {
        return res.status(400).json({
            status: "An error occured, could not create users",
            data: error
        })
    }
}

// Login:
export const login = async(req: Request, res: Response): Promise<Response> =>{
    try {
        const {email} = req.body;
        const user = await userModels.findOne({email});
        if (!email) {
            return res.status(400).json({
                status: "Please enter an email"
            })
        }
        if (!user) {
            return res.status(401).json({
                status: "User not found",
            })
        }
        return res.status(200).json({
            status: "USERS login successful",
            data: user
        })
    } catch (error) {
        return res.status(400).json({
            status: "An error occured in login user",
            data: error
        })
    }
}

// getall:
export const getUsers = async(req: Request, res: Response): Promise<Response> =>{
    try {
        const user = await userModels.find();
        return res.status(200).json({
            status: `Successfuly got ${user.length} user(s)`,
            data: user
        })
    } catch (error) {
        return res.status(400).json({
            status: "An error occured in getting all users",
            data: error
        })
    }
}

// deleteone: