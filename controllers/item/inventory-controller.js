const express = require("express");
const router = express.Router();

// Import my Data
const inventory = require(process.cwd() + "/models/inventory");
const item = require(process.cwd() + "/models/item");

router.get("/", async function(req, res) {
    try {
        if (req.session.currentUserFull) {
            let foundInventory = await inventory.findOne({user: req.session.currentUser}).populate("items.item");

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
            let foundInventory = await inventory.findOne({user: req.session.currentUser}).populate("items.item");

            let holding = false;

            for (let j = 0; j < foundInventory.items.length; j++) {
                if (foundInventory.items[j].item._id.equals(req.body.change.item)) {
                    holding = true;

                    if (foundInventory.items[j].amount >= -Math.floor(req.body.change.amount)) {
                        foundInventory.items[j].amount += Math.floor(req.body.change.amount);

                        if (foundInventory.items[j].amount === 0) {
                            let itemToEmpty = foundInventory.items[j].item._id;

                            foundInventory.items.splice(j, 1);
                            await foundInventory.save();
    
                            res.status(200).send({
                                item: {
                                    _id: itemToEmpty
                                },
                                amount: 0
                            });
                        }
                        else {
                            await foundInventory.save();
    
                            res.status(200).send(foundInventory.items[j]);
                        }
                    }
                    else {
                        console.log("subtract from too few", req.body.change);
                        res.status(304).send(
                            `Unable to remove ${req.body.change.amount} ${req.body.change.item} 
                            from inventory because the inventory has only ${foundInventory.items[j].amount}.`
                        );
                    }

                    break;
                }
            }
            
            if (!holding) {
                if (req.body.change.amount > 0) {
                    let foundItem = await item.findById(req.body.change.item);
    
                    foundInventory.items.push({
                        item: foundItem._id,
                        amount: req.body.change.amount
                    });

                    await foundInventory.save();

                    await inventory.populate(foundInventory, "items.item");

                    res.status(200).send(foundInventory.items[foundInventory.items.length - 1]);
                }
                else {
                    console.log("subtract from none", req.body.change);
                    res.status(304).send(
                        `Unable to remove ${req.body.change.amount} ${req.body.change.item} 
                        from inventory because the inventory has none.`
                    );
                }
            };
        }
        else {
            res.status(401).send("User not logged in!");
        }
    }
    catch(err) {
        res.status(500).end();
        console.log(err);
    }
});


module.exports = router;