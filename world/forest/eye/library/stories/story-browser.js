class StoryBrowser extends Browser {
    constructor(id) {
        super(id, [
            {
                name: "title",
                type: String,
                label: "Title",
                placeholder: "Story Title"
            }, 
            {
                name: "img",
                type: String,
                label: "Image",
                placeholder: "/img/default.jpg"
            }, 
            {
                name: "source",
                type: String,
                label: "Source",
                placeholder: "Story Source"
            }, 
            {
                name: "content",
                type: String,
                label: "Content",
                placeholder: "Your Story Here"
            }
        ], "save-stories");
    }
}
