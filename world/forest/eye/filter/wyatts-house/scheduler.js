class Scheduler extends Browser {
    constructor(id) {
        super(id, [ 
            {
                type: String,
                label: "Title",
                placeholder: "Task"
            },
            {
                type: Date,
                label: "Date",
                placeholder: new Date()
            },
            {
                type: String,
                label: "Description",
                placeholder: "Description"
            },
            {
                type: Boolean,
                label: "Task Complete",
                placeholder: false
            }
        ], "save-schedule");
    }
}