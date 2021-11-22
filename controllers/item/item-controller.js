const express = require("express");
const router = express.Router();

// Import my Data
const items = require(process.cwd() + "/models/item");

router.get("/all", async function(req, res) {
    try {
        let foundItems = await items.find({});

        res.status(200).send({ foundItems: foundItems });
    }
    catch(err) {
        res.status(500).end();
        console.log(err);
    }
});

router.get("/findOne", async function(req, res) {
    try {
        let foundItem = await items.findOne({name: req.query.name});

        if (!foundItem) res.status(500).end();
        else res.status(200).send({ foundItem: foundItem });
    }
    catch(err) {
        res.status(500).end();
        console.log(err);
    }
});

router.post("/", async function(req, res) {
    try {
        await items.create({
            name: req.body.name,
            shortDescription: req.body.shortDescription,
            fullDescription: req.body.fullDescription
        });

        res.status(200).end();
    }
    catch(err) {
        res.status(500).end();
        console.log(err);
    }
});


module.exports = router;