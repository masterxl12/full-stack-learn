import mongoose from "mongoose"

export const connectMongo = async () => {
    if (mongoose.connection.readyState >= 1) {
        return
    }

    return mongoose.connect("mongodb://127.0.0.1:27017/school", (err) => {
        if (err) {
            console.log("err...");
        }
        console.log("connected successfully...");
    })
}