const express = require('express');
const app = express();

let users = [
  { id: 1, name: "Sanjay", role: "Learner" },
  { id: 2, name: "Ram", role: "Teacher" },
  { id: 3, name: "Alex", role: "Admin" }
];

app.get('/users', (req, res) => {
    const role = req.query.role; 
    const user = users.find(u=> u.role === role)
    if (!user) {
        res.status(404).send("Not found data");
    }
    res.json(user); 
});

app.listen(3000, () => {
    console.log("http://localhost:3000");
});
