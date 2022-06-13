module.exports = {
    name: "square",
    dirname: __dirname,
    options: {},
    details: [
        {
            name: "",
            options: { styles: [ "index", "borders" ] }
        },
        {
            name: "clothing-stall",
            options: { 
                styles: [ "clothing-stall", "borders" ], 
                localScripts: [ "clothing-stall" ],
                requiredItems: ["Gold Coin"]
            }
        },
        {
            name: "church",
            options: { styles: [ "borders" ] }
        }
    ]
};