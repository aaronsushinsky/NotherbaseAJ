const { explore, router } = require("notherbase-fs").from(__dirname);

explore("");

explore("inside", {
    styles: [ "inside" ]
});

module.exports = router;