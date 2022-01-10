const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// Import my Data
const User = require("./models.js").user;
const inventory = require("../../models/inventory");

const authCheck = require("../authCheck");

router.post("/register", async function(req, res) {
    try {
        const foundAccount = await User.findOne({ username: req.body.username });

        if (!foundAccount) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);

            let qAuth = await User.create({
                username: req.body.username,
                password: hash,
                email: "temp@example.com",
                coin: 0,
                home: "/",
                authLevels: [ "Basic" ]
            });

            await inventory.create({
                user: qAuth._id,
                items: []
            });
    
            res.status(200).send("Registration Successful!");
        }
        else {
            res.status(400).send("Registration Failed: Username taken!");
        }
    }
    catch(err) {
        console.log(err);

        res.status(500).send("Registration Failed: Database error!");
    }
});

router.post("/login", async function(req, res) {
    try {
        const foundAccount = await User.findOne({ username: req.body.username });

        if (foundAccount) {
            if (await bcrypt.compare(req.body.password, foundAccount.password)) {
                req.session.currentUser = { _id: foundAccount._id };
                req.session.currentUserFull = foundAccount;

                res.status(200).send("Login successful!");
            }
            else {
                res.status(401).send("Login Failed: Password incorrect!");
            }
        }
        else {
            res.status(401).send("Login Failed: Username not found!");
        }
    }
    catch(err) {
        console.log(err);

        res.status(500).send("Login Failed: Database error!");
    }
});

router.get("/logout", authCheck, async function(req, res) {
    try {
        await req.session.destroy();

        res.redirect(`/`);
    }
    catch {
        console.log(err);
    }
});

router.get("/all", authCheck, async function(req, res) {
    try {
        let foundUsers = await User.find({}, 'username coin home authLevels location');

        res.status(200).send({ foundUsers: foundUsers });
    }
    catch(err) {
        res.status(500).end();
        console.log(err);
    }
});

router.delete("/", authCheck, async function(req, res) {
    try {
        const found = await User.findByIdAndDelete(req.session.currentUser);

        if (!found) console.log("Could not find account. No deletion!");

        await req.session.destroy();

        res.redirect("/");
    }
    catch {
        console.log(err);
    }
});

module.exports = router;

