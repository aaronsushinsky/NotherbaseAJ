const { explore, router } = require("notherbase-fs").from(__dirname);

explore("", {
    styles: [ "index", "borders" ]
});

explore("clothing-stall", {
    styles: [ "clothing-stall", "borders" ], 
    scripts: [ "clothing-stall" ]
});

explore("church", {
    styles: [ "borders" ]
});

module.exports = router;