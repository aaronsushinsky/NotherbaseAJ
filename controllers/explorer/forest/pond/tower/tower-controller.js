const { explore, router } = require("notherbase-fs").from(__dirname);

explore("", [], [ "door" ]);

explore("inside", [ "wizard-tower" ], [ "inside" ], "Wizard Tower Key", "/forest/pond/tower");

module.exports = router;