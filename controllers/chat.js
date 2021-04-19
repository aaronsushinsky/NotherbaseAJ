const express = require("express");
const router = express.Router();

// Import my Data
const Chat = require("../models").chat;

router.get("/", function(req, res) {
    Chat.find({}).sort('-date').limit(50).exec(function(err, chats){
        res.render("chat/index", { chats: chats });
    });
});

router.post("/", function(req, res) {
    Chat.create({
        text: req.body.text,
        date: Date.now()
    }, function() {
        Chat.find({}).sort('-date').limit(50).exec(function(err, chats){
            res.render("chat/index", { chats: chats });
        });
    });
});

module.exports = router;