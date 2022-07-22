const mongoose = require('mongoose')

const connectMongo = async () => mongoose.connect("mongodb://127.0.0.1:27017/school", (err) => {
    if (err) {
        console.log("err...");
    }
    console.log("connected successfully...");
})

export default connectMongo;


