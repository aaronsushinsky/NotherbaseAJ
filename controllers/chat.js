const express = require("express");
const router = express.Router();

// Import my Data
const Chat = require("../models").chat;

router.get("/", function(req, res) {
    res.render("chat/index", { style: "main" });
});

router.get("/new-messages/:amount", function(req, res) {
    Chat.find({}).sort('-date').limit(parseInt(req.params.amount)).exec(function(err, chats){
        res.status(200).send({ chats: chats });
    });
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