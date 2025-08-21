const express = require('express');
const app = express();
app.use((req,res,next)=>
{
    console.log("This is middleware");
    next();

});

app.use('/home',(req,res,next)=>//This home endpoint has two middeleware
{
    console.log("hi");
    next();
})
app.get('/',(req,res)=>
{
    res.send("After middleware");
}
)

app.get('/home',(req,res)=>
{
    res.send("home middleware");
})

app.listen(3000,()=>
{
    console.log("http://localhost:3000");
})

