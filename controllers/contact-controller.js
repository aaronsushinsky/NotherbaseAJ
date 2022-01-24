const express = require("express");
const router = express.Router();

const contact = require(process.cwd() + "/models/contact");

router.post("/", async function(req, res) {
    try {
        await contact.create({
            user: req.session.currentUser,
            location: req.body.location,
            content: req.body.content
        });

        res.status(200).end();
    }
    catch(err) {
        res.status(500).end();
        console.log(err);
    }
});

module.exports = router;