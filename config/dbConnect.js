const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const connect =  () =>{
    mongoose.connect(process.env.MONGO_URI, {}, (err) =>{
        if(err){
            console.log(err);
        }
        console.log("database connected");
    })
}

module.exports = connect;