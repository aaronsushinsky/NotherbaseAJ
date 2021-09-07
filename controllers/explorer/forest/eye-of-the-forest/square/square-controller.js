const { explore, router } = require("notherbase-fs").from(__dirname);

explore("");

explore("clothing-stall", [ "clothing-stall" ], [ "clothing-stall" ]);

explore("well");

module.exports = router;