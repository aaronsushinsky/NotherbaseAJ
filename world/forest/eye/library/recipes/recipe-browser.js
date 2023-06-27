class RecipeBrowser extends Browser {
    constructor(id) {
        let fields = [ 
            NBField("Recipe Browser", { //rb1
                name: NBField("Recipe: ", "string", "Recipe Name"),
                img: NBField("Image URL: ", "string", "/img/food/default.jpg"),
                source: NBField("From: ", "string", "Recipe Source"),
                ingredients: NBField("Ingredients: ", [ { //rb2 nested
                    amount: NBField("", "number", 0),
                    measure: NBField("", "string", "tbsp"),
                    ingredient: NBField("", "string", "ingredient")
                }], "No Ingredients"),
                directions: NBField("Directions: ", [ {
                    direction: NBField("", "string", "Recipe Directions")
                }], "No Directions") 
            }, "No Recipe") 
        ];
        super(id, fields, true, "save-recipes");
    }
}