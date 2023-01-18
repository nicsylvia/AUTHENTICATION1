import mongoose, { Schema, model, Document } from "mongoose";

interface usersData {
    fullname: string;
    email: string;
    password: string;
    stack: string;
    isAdmin: string;
}

interface iUsersData extends usersData, Document{};

const userSchema = new Schema({
    fullname: {
        type: String,
        required: [true, "Please enter your fullname"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Please enter a strong password"],
        minlength: 6,
    },
    stack: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

},{
    timestamps: true
});

const userModels = model<iUsersData>("AuthUsers", userSchema);

export default userModels;