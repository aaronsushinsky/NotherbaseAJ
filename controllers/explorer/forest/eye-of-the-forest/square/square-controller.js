const { explore, router } = require("notherbase-fs").from(__dirname);

explore("");

explore("clothing-stall", {
    styles: [ "clothing-stall" ], 
    scripts: [ "clothing-stall" ]
});

explore("well");

module.exports = router;