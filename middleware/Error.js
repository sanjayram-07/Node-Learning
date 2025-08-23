const express = require('express');
const app = express();

app.get('/',(req,res)=>
{
    throw new Error("something is wrong");
})

app.use((err,req,res,next)=>
{
    console.log(err.message);
    
    res.status(500).send("Page is not loading")
}).listen(3000,()=>
{
    console.log("http://localhost:3000");
    
})
