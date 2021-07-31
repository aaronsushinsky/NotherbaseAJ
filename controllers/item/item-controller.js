const express = require("express");
const router = express.Router();

// Import my Data
const items = require("../../global/models/inventory").item;

router.get("/all", async function(req, res) {
    try {
        let foundItems = await items.find({});

        res.status(200).send({ foundItems: foundItems });
    }
    catch(err) {
        console.log(err);
    }
});


module.exports = router;