module.exports = {
    name: "wyatts-house",
    dirname: __dirname,
    options: {},
    details: [
        {
            name: "",
            options: {}
        },
        {
            name: "backyard",
            options: { 
                styles: [ "backyard" ],
                requiredItems: [ "Weed", "Wood"]
            }
        },
        {
            name: "livingroom",
            options: { styles: [ "livingroom" ] }
        },
        {
            name: "laylas-room",
            options: { styles: [ "laylas-room", "toy-box" ] }
        },
        {
            name: "upstairs",
            options: { styles: [ "upstairs" ] }
        }
    ]
};