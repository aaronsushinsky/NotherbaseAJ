class NoteBrowser extends Browser {
    constructor(id) {
        let fields = new NBField({
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
        super(id, fields, true, "save-notes"); 
    }
}