const { Router } =  require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db")
const {generateToken, hashPassword, comparePassword, authenticateAdmin }= require("../auth/auth");
const express = require("express");




adminRouter.post("/signup",async function(req,res){

try {
    const {email, password, firstName, lastName} = req.body;  // takes the signup data form req.body 
const existingUser = await adminModel.findOne({email});
if (existingUser){
    return res.status (400).json({
message: "Admin already exists with this email "
    });
}

//HASH PASSWORD 
const hashedpassword = await hashPassword(password);
//CREATE NEW ADMIN 
const newAdmin = await adminModel.create({
    email, 
    password: hashedpassword,
    firstName,
    lastName
});

//GENERATE TOKEN 

const token = generateToken({
    adminId: newAdmin._id,
    email: newAdmin.email, 
    type: 'admin' 
});
res.status(201).json({
    message: "Admin created successfully",
    token: token, // FIXED: was toekn
    admin: {
        id: newAdmin._id,
        email: newAdmin.email,
        firstName: newAdmin.firstName,
        lastName: newAdmin.lastName
    }
})

} catch ( error) {

    res.status(500).json({
        message: "ERROR CREATING ADMIN ",
        error: error.message
    });

}
  
});


adminRouter.post("/signin", async function(req,res){
try {
    const {email , password} = req.body;

//FINS ADMIN 
const admin = await adminModel.findOne({email});
if (!admin ){
    return res.status(400).json({
        message: "Invalid email ir password "
    });
}


//checks  password 


const isValidPassword = await comparePassword(password, admin.password);

if (!isValidPassword){
    return res.status(400).json({
        message: " Invalid email or password "

    });
}


const token = generateToken({
    adminId: admin._id,
    email: admin.email,
    type: 'admin'
});




res.json({
            message: "Admin signin successful",
            token: token,
            admin: {
                id: admin._id,
                email: admin.email,
                firstName: admin.firstName,
                lastName: admin.lastName
            }
        });
       }  catch (error){
        res.status(500).json({
            message: "Error in signing in ",
             error : error.message
        });
       }
    });
    




adminRouter.put("/course", authenticateAdmin, async function(req, res) {
    try {
        const { title, description, price, imageUrl } = req.body;
        const adminId = req.admin.adminId;
        const newCourse = await courseModel.create({
            title,
            description,
            price,
            imageUrl,
            creatorId: adminId // FIXED: was createrId
        });

        // Always send a response!
        res.status(201).json({
            message: "Course created successfully",
            course: newCourse
        });
    } catch (error) { // FIXED: added error parameter
        res.status(500).json({
            message: "Error creating course",
            error: error.message
        });
    }
});

// GET ADMIN'S COURSES (PROTECTED ROUTE)
adminRouter.get("/course/bulk", authenticateAdmin, async function(req, res) {
    try {
        const adminId = req.admin.adminId;
        const courses = await courseModel.find({ creatorId: adminId }); // FIXED: was createrId

        res.json({
            message: "Courses retrieved successfully",
            courses: courses
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching courses",
            error: error.message
        });
    }
});



module.exports = {
    adminRouter:adminRouter

};