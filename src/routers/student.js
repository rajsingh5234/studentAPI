const express = require("express");
const Student = require("../models/students");

// 1: Create a new router
const router = new express.Router();

// 2: we need to define the router
router.get("/raj", (req, res) => {
    res.send("hello whatsup guys");
});

router.post("/students", async (req, res) => {
    try {
        const user = new Student(req.body);
        const createUser = await user.save();
        // const createUser = await Student.insertMany([user]);
        res.status(201).send(createUser);
    } catch (e) {
        res.status(400).send(e);
    }
})

// read the data of registered students
router.get("/students", async (req, res) => {
    try {
        const studentsData = await Student.find();
        res.send(studentsData);
    } catch (e) {
        res.status(500).send(e);
    }
})

// get the individual student data by id
// router.get("/students/:id", async (req, res) => {
//     try {
//         const _id = req.params.id;
//         // const studentData = await Student.find({ _id });
//         const studentData = await Student.findById(_id);
//         if (!studentData) {
//             return res.status(404).send();
//         } else {
//             return res.send(studentData);
//         }

//     } catch (e) {
//         res.status(500).send(e);
//     }
// })

// get the individual student data by name
router.get("/students/:name", async (req, res) => {
    try {
        const name = req.params.name;
        const studentData = await Student.find({ name });
        if (!studentData) {
            return res.status(404).send();
        } else {
            return res.send(studentData);
        }

    } catch (e) {
        res.status(500).send(e);
    }
})

// update the students by its id
// router.patch("/students/:id", async (req, res)=>{
//     try {
//         const _id = req.params.id;
//         const updateStudent = await Student.findByIdAndUpdate(_id, req.body, {
//             new: true,
//         });
//         res.send(updateStudent);
//     } catch (e) {
//         res.status(404).send(e);
//     }
// })

// update the students by its name
router.patch("/students/:name", async (req, res) => {
    try {
        const name = req.params.name;
        const updateStudent = await Student.updateOne({ name }, { $set: req.body });
        res.send(updateStudent);
    } catch (e) {
        res.status(404).send(e);
    }
})

// delete student by its id
router.delete("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const deleteStudent = await Student.findByIdAndDelete(_id);
        if (!_id) {
            return res.status(400).send();
        } else {
            return res.send(deleteStudent);
        }
    } catch (e) {
        res.status(500).send(e);
    }
})

module.exports = router;