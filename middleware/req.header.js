const express = require('express');
const app = express();
app.get('/check', (req, res) => {
    console.log(req.headers); 
    res.send(`Your browser is: ${req.headers['user-agent']}`);
});


app.listen(3000,()=>
{
    console.log("http://localhost:3000");
})

