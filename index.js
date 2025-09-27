const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

app.post("/signup", async function(req, res){


    res.json({message: "you are signed up"});
    
});

app.post("/signin", async function(req, res){

    
    res.json({message: "you are signed in"});
    
});


app.post("/course/purchace", async function(req, res){

    res.json({message: "signup endpoint"})
});

app.get("/courses", async function(req, res){

    res.json({message: "signup endpoint"})
});


app.post("/user/purchases", async function(req, res){

    res.json({message: "signup endpoint"})
});





