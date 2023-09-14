const storyBrowser = new Browser("stories");
const storySearch = new SearchBox("stories");

const fields = new NBField({
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
]);
const metaStories = new MetaBrowser("stories", storyBrowser, fields, {
    $origin: $(".meta.buttons#stories"),
    label: "Story Controls",
    editable: true,
    multiple: true,
    searchBox: storySearch,
    toLoad: async () => {
        let res = await base.load("stories");
        return res;
    },
    toSave: async (item, which) => {
        await base.do("save-story", {
            item,
            which
        });
    }
});