const { explore, router } = require("notherbase-fs").from(__dirname);

explore("", {
    styles: ["index", "nono"],
    scripts: ["nono"]
});

module.exports = router;