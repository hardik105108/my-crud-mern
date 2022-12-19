const express = require("express");
const router = express.Router();
const mydata = require("../models/Mydata");

router.post("/insert", async (req, res) => {
    const { uname, work, email, mobile, address } = req.body
    // if (!uname || !work || !email || !mobile || !address) {
    //     res.status(404).json("plz fill data");
    // }
    try {
        const preuser = await mydata.findOne({ email: email || !uname || !work || !email || !mobile || !address })
        console.log(preuser)
        if (preuser) {
            res.status(404).json("user already exist");
        } else {
            const adduser = new mydata({
                uname, work, email, mobile, address
            });
            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }
    } catch (error) {
        res.status(404).json(error)
    }

})
router.get("/read", async (req, res) => {
    try {
        const userdata = await mydata.find();
        res.status(201).json(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(404).json(error);
    }
})
router.get("/read/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const userindividual = await mydata.findById({ _id: id });
        console.log(userindividual);
        res.status(201).json(userindividual)
    } catch (error) {
        res.status(404).json(error);
    }
})
router.patch("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateduser = await mydata.findByIdAndUpdate(id, req.body, {new: true });
        console.log(updateduser);
        res.status(201).json(updateduser);
    } catch (error) {
        res.status(422).json(error);
    }
})
router.delete("/deleted/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletuser = await mydata.findByIdAndDelete({ _id: id })
        console.log(deletuser);
        res.status(201).json(deletuser);
    } catch (error) {
        res.status(404).json(error);
    }
})
module.exports = router;
