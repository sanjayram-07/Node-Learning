const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/student')
.then(() => console.log(" MongoDB Connected"))
.catch(err => console.log(" Error:", err));


const mongoschema = new mongoose.Schema({
    name: String,
    age: Number,
});


const Details = mongoose.model('details', mongoschema);

app.post('/user', async (req, res) => {
    try {
        const newuser = new Details({
            name: req.body.name,
            age: req.body.age
        });
        await newuser.save();
        res.status(201).json(newuser);
    } catch (err) {
        res.status(400).json({ error: "Data is invalid, not inserted", message: err.message });
    }
});



app.get('/user', async (req, res) => {
    try {
        const detail = await Details.find();
        res.json(detail);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});


app.get('/user/:id', async (req, res) => {
    try {
        const user = await Details.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: "Invalid ID format" });
    }
});


app.put('/user/:id', async (req, res) => {
    try {
        const updatedUser = await Details.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name, age: req.body.age },
            { new: true } 
        );
        if (!updatedUser) return res.status(404).json({ error: "User not found" });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: "Update failed", message: err.message });
    }
});


app.delete('/user/:id', async (req, res) => {
    try {
        const deletedUser = await Details.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ error: "User not found" });
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: "Delete failed", message: err.message });
    }
});

app.listen(3000, () => { 
    console.log("🚀 Server running at http://localhost:3000/user"); 
});
