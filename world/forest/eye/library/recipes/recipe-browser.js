const browser = new Browser("recipes");
const search = new SearchBox("recipes");

const metaRecipes = new MetaBrowser("recipes", browser, search, "Your Recipes");
metaRecipes.addService("recipes", {
    fields: new NBField({
        name: "recipe",
        label: "Recipe: ",
        placeholder: "No Recipe",
        multiple: true
    }, [
        new NBField({
            name: "name",
            label: "Name: ",
            placeholder: "Recipe Name"
        }, "string"),
        new NBField({
            name: "img",
            label: "Image: ",
            placeholder: "/img/food/default.jpg"
        }, "image"),
        new NBField({
            name: "source",
            label: "From: ",
            placeholder: "Recipe Source"
        }, "string"),
        new NBField({
            name: "ingredients",
            label: "Ingredients: ",
            placeholder: "No Ingredients",
            multiple: true
        }, [
            new NBField({
                name: "amount",
                label: "",
                placeholder: 0
            }, "number"),
            new NBField({
                name: "measure",
                label: "",
                placeholder: "tbsp"
            }, "string"),
            new NBField({
                name: "ingredient",
                label: "",
                placeholder: "ingredient"
            }, "string")
        ]),
        new NBField({
            name: "directions",
            label: "Directions: ",
            placeholder: "No Directions",
            multiple: true
        }, "long-string") 
    ]),
    label: "Recipes",
    editable: true,
    multiple: true,
    toLoad: async () => {
        return await base.load("recipes");
    },
    toSave: async (item, which) => {
        await base.do("save-recipe", { item, which });
    }
});