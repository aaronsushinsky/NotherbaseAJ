const notesBrowser = new Browser("notes");

const notesSearch = new SearchBox("notes");

const fields = new NBField({
    name: "note",
    label: "Note: ",
    placeholder: "No Note",
    multiple: true
}, [
    new NBField({
        name: "title",
        label: "Title: ",
        placeholder: "No Title",
    }, "string"),
    new NBField({
        name: "content",
        label: "Content: ",
        placeholder: "No Content",
    }, "long-string")
]);

const metaNotes = new MetaBrowser("recipes", notesBrowser, fields, {
    $origin: $(".meta.buttons#notes"),
    label: "Notes Controls",
    editable: true,
    multiple: true,
    searchBox: notesSearch,
    toLoad: async () => {
        let res = await base.load("notes");
        return res;
    },
    toSave: async (item, which) => {
        await base.do("save-note", {
            item,
            which
        });
    }
});