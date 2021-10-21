// we used mongo atlas to link our databse online
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://nid:azerty123456789@cluster0.mqunp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
        );
        console.log("DataBase connected successfully");
    } catch (error) {
        console.log("couldn't connect", error);
    }
};
module.exports = connectDB;
