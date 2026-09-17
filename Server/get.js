import express from "express";

const app = express();

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

app.get("/users", (req, res) => {
    res.json(users);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});