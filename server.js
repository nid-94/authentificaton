// require express
const express = require("express");

// creation of instance
const app = express();

// require connecetion db
const connectDB = require("./config/connectDB");
connectDB();

require("dotenv").config();
// creation of port
const PORT = process.env.PORT;

//routing
// middleware global
app.use(express.json());
//global route
app.use("/api/user", require("./route/user"));

//server creation
app.listen(PORT, (error) => {
    error
        ? console.error(error)
        : console.log(`app is running on port: ${PORT}`);
});
