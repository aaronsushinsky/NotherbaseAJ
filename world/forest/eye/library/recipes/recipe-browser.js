class RecipeBrowser extends Browser {
    constructor(id) {
        let fields = NBField({
            name: "recipe",
            label: "",
            placeholder: "No Recipe",
            multiple: true
        }, [
            NBField({
                name: "name",
                label: "Recipe: ",
                placeholder: "Recipe Name"
            }, "string"),
            NBField({
                name: "img",
                label: "Image URL: ",
                placeholder: "/img/food/default.jpg"
            }, "img"),
            NBField({
                name: "source",
                label: "From: ",
                placeholder: "Recipe Source"
            }, "string"),
            NBField({
                name: "recipe",
                label: "Recipe: ",
                placeholder: "Recipe Name",
                multiple: true
            }, [
                NBField({
                    name: "amount",
                    label: "From: ",
                    placeholder: 0
                }, "number"),
                NBField({
                    name: "measure",
                    label: "From: ",
                    placeholder: "tbsp"
                }, "string"),
                NBField({
                    name: "ingredient",
                    label: "From: ",
                    placeholder: "ingredient"
                }, "string")
            ]),
            NBField({
                name: "recipe",
                label: "Recipe: ",
                placeholder: "Recipe Name",
                multiple: true
            }, "string") 
        ]);
        
        super(id, fields, true, "save-recipes");
    }
}