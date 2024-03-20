const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
//middleware
app.use(express.json());

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
  const {email, password} = req.body;
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
            res.json({ message: "Login successful!" });
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


app.listen(8081, () => {
  console.log("Server listening on port 8081"); // Corrected the console.log message
});
