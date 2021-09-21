const { explore, router } = require("notherbase-fs").from(__dirname);

explore("");

explore("inside", [ "inside" ]);

module.exports = router;