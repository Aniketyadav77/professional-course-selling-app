const express = require("express");
const {Router} = require ("express");
const { userModel } = require("../db")
const userRouter = Router();
const {generateToken, hashPassword, comparePassword, authenticateUser } = require ("../auth/auth");

userRouter.use(express.json());

userRouter.post("/signup", async function(req, res){
    try {
           const {email, password , firstName, lastName} = req.body;
           const existingUser = await userModel.findOne({email});
          if (existingUser){
            return res.status(400).json({
                message: "User already exists with this email"
            });
          }
          
            const hashedPassword = await hashPassword(password);

           const newuser = await userModel.create({
           password : hashedPassword,
           email,
          firstName,
            lastName
            });

            const token = generateToken({ 
           userId: newuser._id,
            email: newuser.email,
             type: 'user'
           });
           res.status(201).json({
             message: "User created successfully",
         token : token ,
           user: {
            id : newuser._id,
            email: newuser.email,
           firstName: newuser.firstName,
             lastName: newuser.lastName
             }
            });
        }           
        catch (error){
            res.status(500).json({
                message: "Error creating user",
                error : error.message
            });
        }
});

userRouter.post("/signin", async function(req, res){ 
try {
    const {email, password}= req.body;

    const  user = await userModel.findOne({email});
if (!user){
    return res.status (400).json ({
        message: "Invalid email or password"
    });
}

 const isValidPassword = await comparePassword(password, user.password);
 if (!isValidPassword)
 {
    return res.status(400).json({
        message: "Invalid email or password"
    });
 }

 const token = generateToken ({
    userId : user._id,
    email: user.email,
    type: 'user'
 });

    res.json ({
    message: "Signin successful",
    token : token,
    user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    }
});
}
catch (error){
    res.status(500).json({
        message: "Error signing in",
        error : error.message
    });
}
});

userRouter.get("/purchases", authenticateUser, async function (req,res){
    try{
        const userId = req.user.userId
        res.json({
            message: "User purchases retrieved successfully",
            userId: userId,
            purchases: []
        });
    }  catch (error){
        res.status(500).json({
            message: "Error fetching purchases",
            error: error.message
        });
    }
});

module.exports = {
    userRouter: userRouter
};













    // "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGU2ZTFhNGJkMWQ1M2ZlNmQ4NDBiNzEiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJ0eXBlIjoidXNlciIsImlhdCI6MTc1OTk2MTUwOCwiZXhwIjoxNzYwMDQ3OTA4fQ.MNT_qsXLsIrtBrHDs6VmuxMpp8harsndMJFwfPbXqPM",
