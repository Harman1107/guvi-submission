const bcrypt = require("bcryptjs");

const User = require("../models/User");
const tokenGenerator = require("../config/createToken");
const { findByIdAndUpdate } = require("../models/User");

const registerController = async (req, res) =>{
    const {name, email, password} = req.body
    
    if(!name || !email || !password){
       return  res.status(400).json({success: false, msg:"Please fill in all fields"});
    }

    if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)){
        return res.status(400).json({success: false, msg:"Please enter valid Email"});
    }

    if(password.length<8){
        return res.status(400).json({success: false, msg:"Password lenght should be atleast 8"});
    }

    const oldUser = await User.findOne({email});

    if(oldUser){
        return res.status(403).json({success:true, msg:"This email is already registered"});
    }

    bcrypt.genSalt(12, (err, salt) =>{
        bcrypt.hash(password, salt, async (err, hash) =>{
            const hashedpassword = hash;
            const newUser = new User({
                name, 
                email,
                password:hashedpassword
            })

            await newUser.save();
            res.status(201).json({success:true, msg:"Registered Succesfully"});
        })
    })
    
}

const loginController = async (req, res) =>{
    const {email, password} = req.body;
    if( !email || !password){
        return  res.status(400).json({success: false, msg:"Invalid Email/Password"});
     }

     const oldUser = await User.findOne({email});

     if(!oldUser){
        return  res.status(400).json({success: false, msg:"Invalid Email/Password"});
     }

     //comparing password
     const comparePassword = await bcrypt.compare(password, oldUser.password);

     if(!comparePassword){
        return  res.status(400).json({success: false, msg:"Invalid Email/Password"});
     }

     //generate token
     const token = tokenGenerator({email: oldUser.email,name:oldUser.name, _id:oldUser._id});

     return res.status(200).json({success:true, token, msg:"logged in successfully"})
}


const updateController = async (req, res) =>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        dob:req.body.dob,
        age:req.body.age,
        mobile:req.body.mobile,
        gender:req.body.gender
    }
    console.log(req.body);

    const user = await User.findOneAndUpdate({email:req.body.email}, newUserData, {new:true, useFindandModify:false});
    
    res.status(200).json({success:true , msg:"Profile Updated Successfully"});

}
module.exports = {registerController, loginController, updateController};