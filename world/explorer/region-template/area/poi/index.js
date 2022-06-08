module.exports = {
    name: "poi", // the name of this poi that will be used in the url
    dirname: __dirname, //always include
    options: {},
    details: [
        {
            name: "", // the name of this detail that will be used in the url
            options: {}
        },
        {
            name: "/detail",
            options: {
                styles: ["detail", "style"],
                externalStyles: [],
                localScripts: ["example"],
                serverScripts: [],
                requiredItems: [],
                needsKey: "",
                dropOff: ""
            }
        }
    ]
};