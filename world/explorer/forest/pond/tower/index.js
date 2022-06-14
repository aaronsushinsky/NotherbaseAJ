module.exports = {
    name: "tower",
    dirname: __dirname,
    options: {},
    details: [
        {
            name: "",
            options: { 
                localScripts: [ "door" ] 
            }
        },
        {
            name: "inside",
            options: {
                styles: [ 
                    "wizard-tower",
                    "items-floor",
                    "user-floor",
                    "frog-floor"
                ], 
                localScripts: [ 
                    "inside",
                    "items"
                 ], 
                needsKey: "Wizard Tower Key", 
                dropOff: "/forest/pond/tower"
            }
        }
    ]
};