const express = require("express");
const router = express.Router();

// Import my Data
const inventory = require(process.cwd() + "/models/inventory");

router.get("/", async function(req, res) {
    try {
        if (req.session.currentUserFull) {
            let foundInventory = await inventory.find({user: req.session.currentUser});

            res.status(200).send({ foundInventory: foundInventory });
        }
        else {
            res.status(401).end();
        }
    }
    catch(err) {
        console.log(err);
    }
});

router.post("/", async function(req, res) {
    try {
        if (req.session.currentUserFull) {
            let foundInventory = await inventory.find({user: req.session.currentUser});

            foundInventory = {...foundInventory, ...req.body.inventoryUpdate};
            await foundInventory.save();

            res.status(200).end();
        }
        else {
            res.status(401).end();
        }
    }
    catch(err) {
        console.log(err);
    }
});


module.exports = router;