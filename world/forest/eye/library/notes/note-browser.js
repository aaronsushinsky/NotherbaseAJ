const notesBrowser = new Browser("notes");
const notesSearch = new SearchBox("notes");

const metaNotes = new MetaBrowser("notes", notesBrowser, notesSearch, "Your Notes");
metaNotes.addService("notes", {
    fields: new NBField({
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
    ]),
    label: "Notes",
    editable: true,
    multiple: true,
    toLoad: async () => {
        return await base.load("notes");
    },
    toSave: async (item, which) => {
        await base.do("save-note", { item, which });
    }
});