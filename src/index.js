// const express = require('express');
// const pasth = require("path");
// const bcrypt = require("bcrypt");
// const collection = require("./config");

// const app = express();

// //To convert data into json format
// app.use(express.json());

// app.use(express.urlencoded({extended: false})); 

// app.set('view engine', 'ejs');

// app.use(express.static("public"));

// app.get("/", (req, res) => {
//     res.render("login");
// });

// app.get("/signup", (req, res) => {
//     res.render("signup");
// });


// //Register User
// app.post("/signup", async (req, res) => {

//     const data = {
//         username: req.body.username,
//         password: req.body.password
//     }

//     //checking if username already exists
//     const existingUser = await collection.findOne({name: data.name});
//     if(existingUser) {
//         res.send("Username already exists. Please choose a different Username.");    
//     }
//     else {

//         //hashing the password using bcrypt
//         const saltRounds = 10; //Number of salt rounds for bcrypt
//         const hashedPassword = await bcrypt.hash(data.password, saltRounds);

//         data.password = hashedPassword; //Replace hash password with original password

//         const userdata = await collection.insertMany(data);
//         console.log(userdata);
//     } 
// });

// //Login User 
// app.post("/login", async (req, res) => {
//     try{
//         const check = await collection.findOne({name: req.body.username});
//         if(!check) {
//             res.send("Username does not exist!")
//         }

//         //Comparing hash password from DB with plain text
//         const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
//         if(isPasswordMatch) {
//             res.render("index.html");
//         }else {
//             req.send("Wrong Password!");
//         }
//     }catch{
//         res.send("Wrong Details!");
//     }
// })


// const port = 2300; 
// app.listen(port, () => {
//     console.log('Server running on Port: ${port}');
// })

//Surya's Code 
const express=require('express');
const path= require("path");
const bcrypt=require("bcrypt");
const collection=require("./config");
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine','ejs');
app.get("/",(req,res)=>{
    res.render("login");
});

app.get("/login",(req,res)=>{
    res.render("login");
});

app.get("/signup",(req,res)=>{
    res.render("signup");
});
app.use(express.static("public"));
app.get("/home",(req,res)=>{
    res.render("home");
});


//adding data to the database(through signup form)
app.post("/signup",async(req,res)=>{
    const {password,username}=req.body;
    const existingmail=await collection.findOne({mail:username});
    if(existingmail){
         res.status(400).send('<script>alert("Email already registered. Please login to your account."); window.location.href = "/login";</script>');
    }
    else{
    const hashedPassword = await bcrypt.hash(password, 10);
    const data={
        name:req.body.username,
        password:hashedPassword,
        mail:req.body.email
    }
    const userdata=await collection.insertMany(data);
    console.log(userdata);
    res.redirect("/home");
}
});

app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const emailexists=await collection.findOne({mail:username});
    if(!emailexists){
        res.status(400).send('<script>alert("Entered Email is incorrect or does not exist.");window.location.href="/login";</script>');
    }
    else{
        const match= await bcrypt.compare(password,emailexists.password);
        if (!match) {
             res.send('<script>alert("Password is incorrect! Please try again."); window.location.href="/login";</script>');
        }
        else{
            res.redirect("/home");
        }}
  
});

const port=process.env.port ||8010;
app.listen(port,()=>{
    console.log(`Server running on port: ${port}`);
});
