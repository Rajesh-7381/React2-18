const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
// const fileupload=require("express-fileupload");
const path=require("path");
const multer = require('multer');
const moment=require("moment");
const { error } = require("console");
const fs=require("fs");
// stripe secret key 
// Import the `stripe` module and initialize it with your secret key
const stripe = require("stripe")("sk_test_51O4a72SHw6r4P7p3nVu4b3NwuzCys6zP2GTFRsVDglopUnRfE5Ih3QxOP5dKmKbtSrYvZtfWTjqQAOxbeZdXIkIb00WJX3O60b")

const app = express();
app.use(cors());
//middleware
app.use(express.json());
// /middleware to handle fileuploads
// app.use(fileupload())


// const upload = multer({ storage: storage });

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

  try {
    // First, fetch the image filename from the database
    const query = "SELECT image FROM signup WHERE id = ?";
    db.query(query, id, (err, result) => {
      if (err) {
        console.error("Error fetching image filename:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      // If the query was successful
      const filename = result[0].image;

      // If a filename exists, attempt to delete the corresponding file
      if (filename) {
        fs.unlink(`./uploads/${filename}`, (err) => {
          if (err) {
            console.error("Error deleting image file:", err);
            return res.status(500).json({ message: "Error deleting image file" });
          }

          // If the file is deleted successfully, proceed to delete the record from the database
          deleteRecordFromDatabase(id, res);
        });
      } else {
        // If no filename was found in the database, proceed to delete the record from the database directly
        deleteRecordFromDatabase(id, res);
      }
    });
  } catch (error) {
    console.error("Error deleting data:", error);
    return res.status(500).json({ message: "Error deleting data" });
  }
});

// Function to delete record from the database
function deleteRecordFromDatabase(id, res) {
  const sql = "DELETE FROM signup WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting data:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    // Data deleted successfully
    res.status(200).json({ message: "Data deleted successfully" });
  });
}


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

// for image insert
// Set up multer storage
const imgconfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Destination folder for storing images
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`);
  }  
});
const isimage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(null, Error("Only images are allowed!")); // Changed message
  }
}

var upload=multer({
  storage:imgconfig,
  fileFilter:isimage
})

// updateform data

app.put('/updateData/:id', upload.single('photo'), async (req, res) => {
  const id = req.params.id;
  const { fname, lname, uname, email, gender } = req.body;
  const filename = req.file.filename; // Corrected: Retrieve filename from req.file

  if (!fname || !lname || !uname || !email || !gender || !filename) {
    return res.status(422).json({ status: 422, message: "Fill all details!" }); // Return added
  }

  try {
    let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
    const sql = "UPDATE signup SET fname=?, lname=?, uname=?, email=?, gender=?, image=? WHERE id=?";
    // Corrected db.query call
    db.query(sql, [fname, lname, uname, email, gender, filename, id], (err, result) => {
      if (err) {
        console.error("Error updating data:", err);
        return res.status(500).json({ message: "Error updating data" });
      } else {
        // console.log("Data updated successfully");
        return res.status(200).json({ message: "Data updated successfully" });
      }
    });
  } catch (error) {
    console.error("Error updating data:", error);
    return res.status(500).json({ message: "Error updating data" });
  }
});

// for acessing image to shown in frontend
app.use("/uploads",express.static("./uploads"));

// payment

// Update the `/api/create-checkout-session` endpoint to handle the request
app.post("/api/create-checkout-session", async (req, res) => {
  const { products } = req.body;
  console.log(products)

  const lineItems = products.map((item) => ({
    price_data: {
      currency: 'usd', // Update currency if needed
      product_data: {
        name: item.dish, // Replace with the appropriate property for product name
      },
      unit_amount: item.price * 100, // Convert price to cents
    },
    quantity: item.qnty, // Assuming each item has a quantity property
  }));
  
  

  try {
    // Create a new checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success", // Update success URL
      cancel_url: "http://localhost:3000/cancel" // Update cancel URL
    });

    // Return the session ID to the client
    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(8081, () => {
  console.log("Server listening on port 8081"); // Corrected the console.log message
});
