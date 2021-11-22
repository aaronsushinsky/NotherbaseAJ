const express = require("express");
const router = express.Router();

// Import my Data
const inventory = require(process.cwd() + "/models/inventory");
const item = require(process.cwd() + "/models/item");

router.get("/", async function(req, res) {
    try {
        if (req.session.currentUserFull) {
            let foundInventory = await inventory.find({user: req.session.currentUser}).populate("items.item");

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
            let foundInventory = (await inventory.find({user: req.session.currentUser}))[0];

            for (let i = 0; i < req.body.changes.length; i++) {
                let holding = false;

                for (let j = 0; j < foundInventory.items.length; j++) {
                    if (foundInventory.items[j].item == req.body.changes[i].item) {
                        foundInventory.items[j].amount += Math.floor(req.body.changes[i].amount);
                        holding = true;
                    }
                }
                
                if (!holding && req.body.changes[i].amount > 0) {
                    let foundItem = await item.findById(req.body.changes[i].item);

                    foundInventory.items.push({
                        item: foundItem._id,
                        amount: req.body.changes[i].amount
                    });
                };
            }

            await inventory.updateOne({ user: req.session.currentUser }, 
                { items: foundInventory.items });

            res.status(200).end();
        }
        else {
            res.status(401).end();
        }
    }
    catch(err) {
        res.status(500).end();
        console.log(err);
    }
});


module.exports = router;