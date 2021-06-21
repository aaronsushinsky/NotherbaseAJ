const express = require("express");
const router = express.Router();

// Import my Data
const Chat = require("./models").chat;
const User = require("../user/models").user;

router.get("/new-messages/:lastMessage", async function(req, res) {
    try {
        let newChats = await Chat.find({ date: { $gt: req.params.lastMessage } }).sort('date').limit(50);

        res.status(200).send({ chats: newChats });
    }
    catch(err) {
        console.log(err);
    }
});

router.get("/new-messages/", async function(req, res) {
    try {
        let newChats = await Chat.find({}).sort('date').limit(100);

        res.status(200).send({ chats: newChats });
    }
    catch(err) {
        console.log(err);
    }
});

router.post("/", async function(req, res) {
    try {
        const foundAccount = await User.findOne({ _id: req.session.currentUser });

        if (foundAccount) {
            Chat.create({
                name: foundAccount.username,
                text: req.body.text,
                date: Date.now()
            }, function() {
                res.status(200).end();
            });
        }
        else {
            res.redirect("user/login");
        }
    }
    catch(err) {
        console.log(err);
    }
});

module.exports = router;