class RecipeBrowser extends Browser {
    constructor(id) {
        super(id, [{
            name: Browser.field(String, "Recipe: ", "Recipe Name"),
            img: Browser.field(Image, "Image URL: ", "/img/food/default.jpg"),
            source: Browser.field(String, "From: ", "Recipe Source"),
            ingredients: Browser.field([{
                amount: Browser.field(),
                measure: Browser.field(String, "", "tbsp"),
                ingredient: Browser.field(String, "", "ingredient")
            }], "Ingredients: ", "No Ingredients"),
            directions: Browser.field([{
                direction: Browser.field(String, "", "Recipe Directions")
            }], "Directions: ", "No Directions")
        }], "save-stories");
    }
}