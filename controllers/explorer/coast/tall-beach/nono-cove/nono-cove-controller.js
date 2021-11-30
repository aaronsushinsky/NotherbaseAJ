const { explore, router } = require("notherbase-fs").from(__dirname);

explore("", {
    styles: ["nono"]
});

module.exports = router;