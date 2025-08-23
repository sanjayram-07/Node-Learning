const express = require('express');
const app = express();

app.get('/',(req,res,next)=>
{
    try{
        let a = 10/0;
        throw new Error("cant divide this");
    }
    catch(err){
        next(err);
    }

})  

app.use((err,req,res,next)=>
{
     console.log(`Error ${err.message}`);
     res.status(500).send(`Error : ${res.message}`)
     
})
app.listen(3000,()=>
{
    console.log("http://localhost:3000");
    
})
