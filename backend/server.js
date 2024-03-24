const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
// const fileupload=require("express-fileupload");
const path=require("path");
const multer = require('multer');


const app = express();
app.use(cors());
//middleware
app.use(express.json());
// /middleware to handle fileuploads
// app.use(fileupload())

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // Destination folder for storing images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  port: "3307", // You should use the port property instead of "port"
  password: "1234", // Typo in "password"
  database: "amirpet",
});

app.post("/register", async (req, res) => {
  const { fname, lname, uname, email, password, cpassword } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  db.query(
    "insert into signup (fname,lname,uname,email,password,cpassword) values (?,?,?,?,?,?)",
    [fname, lname, uname, email, hashedPassword, cpassword],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("error registering user!");
      } else {
        res.status(200).send("registration sucessful!");
      }
    }
  );
});

app.post("/login", async (req, res) => {
  const {email, password,rememberMe} = req.body;
  const sql = "select * from signup where email=?";
  try {
    db.query(sql, [email], async (err, data) => {
      if (err) {
        console.error("error fetching user!", err);
        return res.status(500).json({ error: "internal server error" });
      } else {
        if (data.length > 0) {
          const user = data[0];
          const passwordmatch = await bcrypt.compare(password, user.password);
          if (passwordmatch) {
            // Passwords match, user authenticated
            // You can generate a JWT token here and send it back to the client for further authentication
            // here Amirpet is my secret key
            const token=jwt.sign({email:user.email},'Amirpet',{expiresIn:rememberMe? '7d' : '1d'})
            res.json({ message: "Login successful!" ,token});
          } else {
            // Passwords don't match
            res.status(401).json({ error: "Invalid email or password" });
          }
        }
      }
    });
  } catch (error) {
    console.error("Error querying database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// fetch all data
app.get('/alldata',(req,res)=>{
  const sql="select * from signup";
  db.query(sql,(err,data)=>{
    if(err){
      return res.json({message:"internal server error"});
    }
    return res.json(data);
  })
})

// delete data
app.get('/deletedata/:id', async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM signup WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting data:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    // Data deleted successfully
    res.status(200).json({ message: "Data deleted successfully" });
  });
});

// getSingleData
app.get('/getSingleData/:id',async(req,res)=>{
  const id=req.params.id;
  const sql="select * from signup where id = ?";
  db.query(sql,[id],(err,result)=>{
    if(err){
      console.error("error fetching data",err);
      return res.status(500).json({message:"internal server error"});
    }
    if(result.length===0){
      return res.status(404).json({message:"data not found"});
    }
    res.status(200).json({message:"data fetched successfully!",data:result[0]});
  })
})

// /updateData to fetch
app.get('/updateData/:id',async(req,res)=>{
  const id=req.params.id;
  const sql="select * from signup where id = ?";
  db.query(sql,[id],(err,result)=>{
    if(err){
      console.error("error fetching data",err);
      return res.status(500).json({message:"internal server error"});
    }
    if(result.length===0){
      return res.status(404).json({message:"data not found"});
    }
    res.status(200).json({message:"data get sucessfully",data:result[0]});
  })
})

// updateform data
app.put('/updateData/:id', upload.single('image'), async (req, res) => {
  const { fname, lname, uname, email, gender } = req.body;
  const id = req.params.id;
  let imageFileName = null;

  // if (req.file) {
  //   const image = req.files.image;
  //   imageFileName = `${id}_${image.name}`;
  //   await image.mv(path.join(__dirname, '../frontend/public/images', imageFileName));

  // }

  const sql = "UPDATE signup SET fname=?, lname=?, uname=?, email=?, gender=?, image=? WHERE id=?";
  
  try {
    await db.promise().query(sql, [fname, lname, uname, email, gender, imageFileName, id]);
    res.status(200).json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: "Error updating data" });
  }
});

app.listen(8081, () => {
  console.log("Server listening on port 8081"); // Corrected the console.log message
});
