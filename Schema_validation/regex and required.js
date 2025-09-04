const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/Students')
.then(()=>{console.log("DB created")})
.catch(()=>{console.log("Cannot create DB")});

const userSchema = new mongoose.Schema({
    name :
    {
        type:String,
        required : true,
        minlength : 3,
        maxlength: 30
    },
    age:
    {
        type:Number,
        required:true,
        min:1,
        max:120,
    },
    email:
    {
        type:String,
        required:true,
        unique:true,
        match:/.+@.+\..+/
    },
    createAt:
    {
        type:Date,
        default:Date.now
    }
});

const user = mongoose.model("User",userSchema);

app.post('/user',async(req,res)=>
{
    try{
    const newuser = new user({
        name:req.body.name,
        age:req.body.age,
        email:req.body.email

    })
    await newuser.save();
    res.status(201).json(newuser);

    }
    catch(err){
        res.status(404).json("error ",err.message)

    }
})

app.get('/user',async(req,res)=>
{
    try{
    const all = await user.find();
    res.json(all);
    }
    catch(err){
        res.status(500).json("failed to fetch ",err.message)

    }
})

app.get('/user/:id',async(req,res)=>
{
    try{
    const one = await user.findById(req.params.id);
    if(!one)return res.status(404).json({ error: "User not found" });
    res.json(one);
    }
    catch(err){
        res.status(500).json("failed to fetch ",err.message)

    }
})

app.put('/user/:id',async(req,res)=>
{
    try{
    const one = await user.findByIdAndUpdate(req.params.id,
        {name:req.body.name,
        age:req.body.age,
        email:req.body.email},
        {
            new:true
        }
    );
    if(!one)return res.status(404).json({ error: "User not found" });
    res.json(one);
    }
    catch(err){
        res.status(500).json("failed to fetch ",err.message)

    }
})

app.delete('/user/:id',async(req,res)=>
{
    try{
    const one = await user.findByIdAndDelete(req.params.id);
    if(!one)return res.status(404).json({ error: "User not found" });
    res.json("deleted");
    }
    catch(err){
        res.status(500).json("failed to fetch ",err.message)

    }
})

app.listen(3000,()=>
{
    console.log("http://localhost:3000/user");
})
