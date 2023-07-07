class StoryBrowser extends Browser {
    constructor(id) {
        let fields = new NBField({
            name: "story",
            label: "Story: ",
            placeholder: "No Story",
            multiple: true
        }, [
            new NBField({
                name: "title",
                label: "Title: ",
                placeholder: "Story Title"
            }, "string"),
            new NBField({
                name: "img",
                label: "",
                placeholder: "/img/food/default.jpg"
            }, "image"),
            new NBField({
                name: "source",
                label: "Source: ",
                placeholder: "Recipe Name"
            }, "string"),
            new NBField({
                name: "content",
                label: "Content: ",
                placeholder: "Recipe Name"
            }, "string")
        ]);
        super(id, fields, true, "save-stories");
    }
}
