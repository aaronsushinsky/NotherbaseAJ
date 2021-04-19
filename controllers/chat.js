const express = require("express");
const router = express.Router();

// Import my Data
const Chat = require("../models/chat/chat.js")

// GET Routes
router.get("/", function(req, res) {
    res.render("chat/index");
});

module.exports = router;