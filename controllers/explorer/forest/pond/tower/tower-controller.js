// This allows us to use routers
const router = require("express").Router();

const inventory = require("../../../../../global/models/inventory").inventory;
const item = require("../../../../../global/models/inventory").item;

// This is where all the routes for sub-pois go.
router.get("/", async function(req, res) {
    try {
        const foundInventory = await inventory.findOne({ user: req.session.currentUser }).populate("items.item");
        
        let hasKey = false;

        if (foundInventory) {
            for (let i = 0; i < foundInventory.items.length; i++) {
                if (foundInventory.items[i].item.name === "Wizard Tower Key") hasKey = true;
            }
        }
    
        res.render(`${__dirname}/views/index`, 
        {
            siteTitle: "NotherBase",
            hasKey: hasKey,
            inventory: foundInventory
        });
    }
    catch(err) {
        console.log(err);
    }
});

router.get("/inside", async function(req, res) {
    try {
        const foundInventory = await inventory.findOne({ user: req.session.currentUser });
        
        let hasKey = false;

        if (foundInventory) {
            const foundItem = await item.findOne({ name: "Wizard Tower Key" });
            
            for (let i = 0; i < foundInventory.items.length; i++) {
                if (foundItem._id.equals(foundInventory.items[i].item)) hasKey = true;
            }

            if (hasKey) {
                res.render(`${__dirname}/views/inside`, 
                {
                    siteTitle: "NotherBase",
                    hasKey: hasKey
                });
            }
            else {
                res.redirect("/forest/pond/tower");
            }
            
        }
        else {
            res.redirect("/forest/pond/tower");
        }
    }
    catch(err) {
        console.log(err);
    }
});

// This exports the router
module.exports = router;