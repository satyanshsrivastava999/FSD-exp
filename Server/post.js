import express from "express";

const app = express();

app.use(express.json());

const users = [
    {
        id: 1,
        name: "Satyansh"
    },
    {
        id: 2,
        name: "Rahul"
    }
];


// GET API
app.get("/users", (req, res) => {
    res.json(users);
});


// POST API
app.post("/users", (req, res) => {

    const newUser = req.body;

    users.push(newUser);

    res.status(201).json({
        message: "User added successfully",
        user: newUser
    });

});


app.listen(5000, () => {
    console.log("Server running on port 5000");
});