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
                styles: [ "wizard-tower" ], 
                localScripts: [ "inside" ], 
                needsKey: "Wizard Tower Key", 
                dropOff: "/forest/pond/tower"
            }
        }
    ]
};