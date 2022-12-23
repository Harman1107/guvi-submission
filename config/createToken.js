const jwt = require("jsonwebtoken");

module.exports = (data) =>{
    return jwt.sign(data, "dfsnfasdnf",{expiresIn:"7d"});
}