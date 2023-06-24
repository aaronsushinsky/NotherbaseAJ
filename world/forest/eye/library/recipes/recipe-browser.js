class RecipeBrowser extends Browser {
    constructor(id) {
        super(id, [{
            name: Browser.str("Recipe: ", "Recipe Name"),
            img: Browser.img("Image URL: ", "/img/food/default.jpg"),
            source: Browser.str("From: ", "Recipe Source"),
            ingredients: [{
                amount: Browser.num(),
                measure: Browser.str("", "tbsp"),
                ingredient: Browser.str("", "ingredient")
            }],
            directions: [{
                direction: Browser.str("", "Recipe Directions")
            }]
        }], true, "save-recipes");
    }
}