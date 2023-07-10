class Scheduler extends Browser {
    constructor(id) {
        let fields = new NBField({
            name: "task",
            label: "Task: ",
            placeholder: "No task",
            multiple: true
        }, [
            new NBField({
                name: "name",
                label: "Name: ",
                placeholder: "Name"
            }, "string"),
            new NBField({
                name: "date",
                label: "Date: ",
                placeholder: Date.now()
            }, "date"),
            new NBField({
                name: "time",
                label: "Time: ",
                placeholder: Date.now()
            }, "time"),
            new NBField({
                name: "recurring",
                label: "Recurring: ",
                placeholder: false
            }, "boolean"),
            new NBField({
                name: "frequency",
                label: "Recurs: ",
                placeholder: " ",
                options: [
                    " ",
                    "weekly",
                    "monthly",
                    "yearly"
                ]
            }, "options"),
            new NBField({
                name: "description",
                label: "Description: ",
                placeholder: "Description"
            }, "long-string")
        ]);
        super(id, fields, true, "save-schedule");
    }
}