const storyBrowser = new Browser("stories");
const storySearch = new SearchBox("stories");

const metaStories = new MetaBrowser("stories", storyBrowser, storySearch, "Your Stories");
metaStories.addService("recipes", {
    fields: new NBField({
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
            label: "Image: ",
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
        }, "long-string")
    ]),
    label: "Stories",
    editable: true,
    multiple: true,
    toLoad: async () => {
        return await base.load("stories");
    },
    toSave: async (item, which) => {
        await base.do("save-story", { item, which });
    }
});