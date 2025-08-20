const http = require('http');
http.createServer((req,res)=>
{
    res.end("1st server ");
}).listen(3000,()=>{
    console.log("runs at http://localhost:3000");}
    );


http.createServer((req,res)=>
{
    res.end("2nd server ");
}).listen(4000,()=>{
    console.log("runs at http://localhost:4000");
}    );
