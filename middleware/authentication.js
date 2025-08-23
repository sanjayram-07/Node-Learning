const express = require('express');
const app = express();
function logger(req,res,next)
{
    console.log(`resquest method ${req.url}`)
    next();
}
function authen(req,res,next)
{
    let logged = false;
    if(logged)
    {
        console.log("Authencation verified");
        next();
    }
    else{
        res.status(404).send("NO authentication");
    }

}

app.use(logger);

app.get('/server',authen,(req,res)=>
{
    res.send("this is after the middle ware");
}).listen(3000,()=>
{
    console.log("http://localhost:3000");
    
})
