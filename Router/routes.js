const express = require('express');
const app = express();


app.use(express.json());

const userRouter = express.Router();


userRouter.get('/', (req, res) => {
    res.send("Get all users");
});


userRouter.post('/', (req, res) => {
    const { name, role } = req.body;
    console.log("New user:", name, role);
    res.send(`User ${name} with role ${role} registered successfully!`);
});


userRouter.get('/:id', (req, res) => {
    res.send(`Get user with id ${req.params.id}`);
});

app.use('/users', userRouter);

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000/users");
});
