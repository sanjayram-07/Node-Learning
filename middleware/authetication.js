const express = require('express');
const app = express();
function authenticate(req,res,next)
{
    let loged = false;
    if(loged)
    {
        console.log("Authorized");
        next();
    }
    else
    {
        console.log("unauthorized");
        res.send('NOT Authorized')
    }

    

}

app.get('/',authenticate,(req,res)=>
{
    res.send("TOP SECRET");
})

app.listen(3000,()=>
{
    console.log("http://localhost:3000");
})

