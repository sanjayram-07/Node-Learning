const express = require('express');
const app = express();

let users = [{i:1,name:"sanjay"}];

app.use(express.json());

app.get('/user',(req,res)=>  //all user
{
    res.json(users);
});

app.get('/user/:id',(req,res)=>  // get one user
{
    const user = users.find(u => u.i === Number(req.params.id))
    if(!user)
        return(res.status(404).send("Not Found"));
    res.json(user);
})

app.post('/user',(req,res)=> //post one user
{
    const newuser = {i : users.length+1,name:req.body.name}
    users.push(newuser);
    res.send("pushed")
})

app.put('/user/:id',(req,res)=> //edit
{
    const user = users.find(u => u.i === Number(req.params.id))
    if(!user)
        return(res.status(404).send("Not Found"));
    user.i = req.params.id;
    user.name = req.body.name;
    res.json(users);
})

app.delete('/user/:id',(req,res)=>
{
    users = users.filter(u => u.i != Number(req.params.id))
    res.send("deleted");
})

app.listen(3000,()=>
{
    console.log("http://localhost:3000");
    
})
