const { explore, router } = require("notherbase-fs").from(__dirname);

explore("");

explore("livingroom", [ "livingroom" ]);

explore("laylas-room", [ "laylas-room", "toy-box" ]);

explore("upstairs", [ "upstairs" ]);

module.exports = router;