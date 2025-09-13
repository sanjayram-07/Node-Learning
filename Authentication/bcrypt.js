const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/Students')
.then(()=>{console.log("DB created")})
.catch(()=>{console.log("Cannot create DB")});

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        minlength:3,
        maxlength:30
    },
    email: {
        type:String,
        required:true,
        unique:true,
        match:/.+@.+\..+/
    },
    password: {
        type:String,
        required:true
    },
    createAt: {
        type:Date,
        default:Date.now
    }
});

const User = mongoose.model("User", userSchema);


app.post('/signup', async (req, res) => {
    try {
        const mail = await User.findOne({ email: req.body.email });
        if (mail) return res.status(400).json("Email already exists");

        const hashpass = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashpass,
        });

        await newUser.save();
        res.status(201).json("Registered successfully");
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.post('/login', async (req, res) => {
    try {
        const a = await User.findOne({ email: req.body.email });
        if (!a) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(req.body.password, a.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign(
            { id: a._id, email: a.email },
            "mysecretkey",
            { expiresIn: "1h" }
        );

        res.json({ message: "Login successful", token });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1]; 
    jwt.verify(token, "mysecretkey", (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = user; 
        next();
    });
}

app.get('/dashboard', authMiddleware, (req, res) => {
    res.json({ message: `Welcome ${req.user.email}, this is your dashboard.` });
});
app.listen(3000, () => {
    console.log("http://localhost:3000");
});
