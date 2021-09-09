const { explore, router } = require("notherbase-fs").from(__dirname);

explore("");

explore("lobby");

explore("kitchen");

explore("upstairs");

module.exports = router;