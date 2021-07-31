const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// Import my Data
const User = require("./models.js").user;
const inventory = require("../../global/models/inventory").inventory;

const authCheck = require("../authCheck");

router.get("/register", function(req, res) {
    res.render(`${__dirname}/views/register`,
    {
        siteTitle: "NotherBase | Register",
        info: "",
        color: "green"
    });
});

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
    
            res.redirect("/");
        }
        else {
            res.render(`${__dirname}/views/register`,
            {
                siteTitle: "NotherBase | Register",
                info: "Registration Failed: Username taken!",
                color: "red"
            });
        }
    }
    catch(err) {
        console.log(err);

        res.render(`${__dirname}/views/register`,
        {
            siteTitle: "NotherBase | Register",
            info: "Registration Failed: Database error!",
            color: "red"
        });
    }
});

router.get("/login", function(req, res) {
    res.render(`${__dirname}/views/login`, 
    { 
        siteTitle: "NotherBase | Login",
        info: "",
        color: "green" 
    });
});

router.post("/login", async function(req, res) {
    try {
        const foundAccount = await User.findOne({ username: req.body.username });

        if (foundAccount) {
            if (await bcrypt.compare(req.body.password, foundAccount.password)) {
                req.session.currentUser = { _id: foundAccount._id };

                const foundInventory = await inventory.findOne({ user: req.session.currentUser });
                if (!foundInventory) {
                    await inventory.create({
                        user: req.session.currentUser,
                        items: []
                    });
                }

                res.redirect("/");
            }
            else {
                res.render(`${__dirname}/views/login`,
                {
                    siteTitle: "NotherBase | Login",
                    info: "Login Failed: Password incorrect!",
                    color: "red"
                });
            }
        }
        else {
            res.render(`${__dirname}/views/login`,
            {
                siteTitle: "NotherBase | Login",
                info: "Login Failed: Account does not exist!",
                color: "red"
            });
        }
    }
    catch(err) {
        console.log(err);

        res.render(`${__dirname}/views/login`,
        {
            siteTitle: "NotherBase | Login",
            info: "Login Failed: Database error!",
            color: "red"
        });
    }
});

router.get("/logout", authCheck, async function(req, res) {
    try {
        await req.session.destroy();

        res.redirect(`${__dirname}/views/login`);
    }
    catch {
        console.log(err);
    }
});

router.get("/", authCheck, async function(req, res) {
    try {
        const foundAccount = await User.findOne({ _id: req.session.currentUser });

        if (foundAccount) {
            res.render(`${__dirname}/views/show`, {
                siteTitle: "NotherBase | Account",
                cash: foundAccount.cash,
                color: "green",
                info: ""
            });
        }
        else {
            console.log("User not found! Can't show!");
            res.redirect("/user/login");
        }
    }
    catch {
        console.log(err);
    }
});

router.delete("/", authCheck, async function(req, res) {
    try {
        const found = await User.findByIdAndDelete(req.session.currentUser);

        if (!found) console.log("Could not find account. No deletion!");

        await req.session.destroy();

        res.redirect("/user/login");
    }
    catch {
        console.log(err);
    }
});

module.exports = router;

