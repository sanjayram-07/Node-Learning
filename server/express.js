const express = require('express');
const { log } = require('node:console');
const app = express();

app.get('/',(req, res)=>
{
    res.send('hello');

})

app.get('/home',(req,res)=>
{
    res.send('home');
})

app.get('/cart',(req,res)=>
{
    res.json(
        {
            name:"sanjay",
            num:5,
        }
    )
})

app.listen(3000, ()=>
{
    console.log("port on http://localhost:3000");
    
})
