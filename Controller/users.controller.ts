import userModels from "../Models/user.models";
import bcrypt from "bcrypt";

import { Request, Response } from "express";


// register:
export const register = async(req: Request, res: Response): Promise<Response> =>{
    try {
       const {fullname, email, password, stack, isAdmin} = req.body; 
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
        const {email, password} = req.body;
        const user = await userModels.findOne({email});
        if (!email) {
            return res.status(400).json({
                status: "Please enter an email"
            })
        }
        if (!password) {
            return res.status(400).json({
                status: "Please enter your password"
            })
        }
        if (!user) {
            return res.status(401).json({
                status: "User not found, does not exist",
            })
        }
        const checkPassword = await bcrypt.compare(password, user!.password)
        if (!checkPassword) {
            return res.status(401).json({
                status: "Either email or password is not correct",
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
        const user = await userModels.find().sort({createdAt: -1});
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
