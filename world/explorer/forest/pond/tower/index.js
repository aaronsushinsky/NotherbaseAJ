module.exports = {
    name: "tower",
    dirname: __dirname,
    options: {},
    details: [
        {
            name: "",
            options: { scripts: [ "door" ] }
        },
        {
            name: "inside",
            options: {
                styles: [ "wizard-tower" ], 
                scripts: [ "inside" ], 
                needsKey: "Wizard Tower Key", 
                dropOff: "/forest/pond/tower"
            }
        }
    ]
};