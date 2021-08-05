const express = require("express");
require("./db/conn");
const Student = require("./models/students");
const studentRouter = require("./routers/student");
const app = express();
const port = process.env.PORT || 8000;

// YOU DO NOT NEED express.json() and express.urlencoded() for GET requests or DELETE requests. We only need it for POST and PUT request.
// express.json() is a method inbuilt in express to recognize the incoming request object as a JSON object. This method is called as a middleware in your application using the code: app.use(express.json());

app.use(express.json());

// Adding express router
// 3: we need to register our router
app.use(studentRouter); 

// Create a new student
// app.post("/students", (req, res) => {
//     console.log(req.body);
//     const user = new Student(req.body);

//     user.save().then(() => {
//         res.status(201).send(user);
//     }).catch((e) => {
//         res.status(400).send(e);
//     })
// });

app.listen(port, () => {
    console.log(`listening at port no. ${port}`);
});

