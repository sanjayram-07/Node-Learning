const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/student')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("Error:", err));

const mongoschema = new mongoose.Schema(
    {
        name:String,
        age:Number,
    }
);

const details = mongoose.model('details',mongoschema);

app.post('/user',async(req,res)=>
{
    try{
        const newuser = new details({
            name:req.body.name,
            age : req.body.age
        })
        await newuser.save();
        res.status(201).json(newuser);

    }
    catch(err){
        res.status(404).send("data is invalid || not inserted",err.message);
    }
})

app.get('/user',async(req,res)=>
{
    const detail = await details.find();

    res.json(detail);

})

app.listen(3000,()=> { console.log("http://localhost:3000/user"); })
