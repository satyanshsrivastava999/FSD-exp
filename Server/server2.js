// POST API - Create User
// app.post("/api/users", (req, res) => {

//     const user = req.body;

//     console.log(user);

//     res.json({
//         message: "User received successfully",
//         user: user
//     });

// }); 
// // POST API - Create User End

const express = require("express");

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log("Server running on port 3000");
});