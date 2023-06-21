class Scheduler extends Browser {
    constructor(id) {
        super(id, [ 
            {
                type: String,
                name: "title",
                label: "Title",
                placeholder: "Task"
            },
            {
                type: Date,
                name: "date",
                label: "Date",
                placeholder: new Date()
            },
            {
                type: String,
                name: "desc",
                label: "Description",
                placeholder: "Description"
            },
            {
                type: Boolean,
                name: "complete",
                label: "Task Complete",
                placeholder: false
            }
        ], "save-schedule");
    }
}