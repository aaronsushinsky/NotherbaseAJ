const { explore, router } = require("notherbase-fs").from(__dirname);

explore("", { scripts: [ "door" ] });

explore("inside", {
    styles: [ "wizard-tower" ], 
    scripts: [ "inside" ], 
    needsKey: "Wizard Tower Key", 
    dropOff: "/forest/pond/tower"
});

module.exports = router;