const express = require("express");
const router = express.Router();

// Import my Data
const Chat = require("../models").chat;

router.get("/", function(req, res) {
    res.render("chat/index", { style: "main" });
});

router.get("/new-messages/:lastMessage", async function(req, res) {
    try {
        let newChats = await Chat.find({ date: { $gt: req.params.lastMessage } }).sort('date').limit(50);

        //console.log(`Found ${newChats.length} new chats!`);

        res.status(200).send({ chats: newChats });
    }
    catch(err) {
        console.log(err);
    }
});

router.get("/new-messages/", async function(req, res) {
    try {
        let newChats = await Chat.find({}).sort('date').limit(100);

        //console.log(`Found ${newChats.length} new chats!`);

        res.status(200).send({ chats: newChats });
    }
    catch(err) {
        console.log(err);
    }
});

router.post("/", function(req, res) {
    Chat.create({
        name: req.body.name,
        text: req.body.text,
        date: Date.now()
    }, function() {
        res.status(200).end();
    });
});



module.exports = router;