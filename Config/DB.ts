import mongoose from "mongoose";

const DB_URL = "mongodb://localhost/authclass";

const DBconnection = async(): Promise<void> => {
    try {
        const dbconnect = await mongoose.connect(DB_URL);
        console.log(`DB is connected to ${dbconnect.connection.host}`)
    } catch (error) {
        console.log(error)
    }
};

export default DBconnection