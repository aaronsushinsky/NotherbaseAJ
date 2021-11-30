const { explore, router } = require("notherbase-fs").from(__dirname);

explore("");

explore("backyard", { 
    styles: [ "backyard" ] 
});

explore("livingroom", { 
    styles: [ "livingroom" ] 
});

explore("laylas-room", { 
    styles: [ "laylas-room", "toy-box" ] 
});

explore("upstairs", { 
    styles: [ "upstairs" ] 
});

module.exports = router;