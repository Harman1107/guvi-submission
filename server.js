require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const dbConnect = require("./config/dbConnect");


const User = require("./models/User");

const authAPI = require("./apis/authAPI");

dbConnect().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("listening for requests");
    })
});

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, "/build")));


const port  = process.env.PORT || 5000;

app.use("/api/auth", authAPI); 

app.get("/", (req, res) => {
    res.send(path.join(__dirname, "/build/index.html"));
})

app.listen(port, () => console.log(`server is running on port ${port}`))