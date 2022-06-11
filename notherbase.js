const path = require('path');
const notherbase = require("notherbase-fs");

const world = require("./world");

notherbase.start(world, path.resolve(__dirname, "pages"));