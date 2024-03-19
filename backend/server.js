const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const bcrypt=require("bcrypt");

const app = express();
app.use(cors());
//middleware
app.use(express.json());

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    port: "3307", // You should use the port property instead of "port"
    password: "1234", // Typo in "password"
    database: "amirpet"
});

app.post('/register',async(req,res)=>{
    const {fname,lname,uname,email,password,cpassword}=req.body;
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    db.query("insert into signup (fname,lname,uname,email,password,cpassword) values (?,?,?,?,?,?)",[fname,lname,uname,email,hashedPassword,cpassword],
        (err,result)=>{
            if(err){
                console.log(err);
                res.status(500).send("error registering user!");
            }else{
                res.status(200).send("registration sucessful!")
            }
        }
    )
})

app.listen(8081, () => {
    console.log("Server listening on port 8081"); // Corrected the console.log message
});
