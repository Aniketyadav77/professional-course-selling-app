const mongoose = require("mongoose");

console.log("connected to mongo ")
const Schema = mongoose.Schema;
mongoose.connect ("mongodb+srv://aniketyadav:johnsnow6969@markcluster1.wsbzgej.mongodb.net/course-selling-app")
 const ObjectId = mongoose.Types.ObjectId;

 const userSchema =  new Schema({
    email: {type : String, unique: true },
    password : String,
    firstName : String,
    lastName : String ,
 });

 const adminSchema = new  Schema({
    email : { type : String , unique: true },
    password : String, 
    firstName : String,
     lastName : String,
 });
const courseSchema = new  Schema({
     title: String,
     description: String,
     price: String, 
     imageUrl: String,
     creatorId: ObjectId
});




const purchaseSchema = new Schema ({
    userId: ObjectId,
    courseId: ObjectId
});


const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);


module.exports = {
    userModel, 
    adminModel, 
    courseModel,
    purchaseModel
}