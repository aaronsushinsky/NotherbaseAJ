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
            }, "long-string"),
            new NBField({
                name: "sharing",
                label: "Sharing: ",
                placeholder: "None",
                multiple: true,
                lockLength: true
            }, [
                new NBField({
                    name: "id",
                    hidden: true
                }, "string"),
                new NBField({
                    name: "name",
                    label: "Share task with: ",
                    placeholder: "No Group",
                    readOnly: true
                }, "string"),
                new NBField({
                    name: "shared",
                    label: "",
                    placeholder: false
                }, "boolean")
            ])
        ]);
        super(id, fields, true, "save-schedule");
    }
}

class SharedScheduler extends Browser {
    constructor(id) {
        let fields = new NBField({
            name: "task",
            label: "Task Shared with You: ",
            placeholder: "No task",
            multiple: true
        }, [
            new NBField({
                name: "name",
                label: "Name: ",
                placeholder: "Name"
            }, "string"),
            new NBField({
                name: "from",
                label: "From: ",
                placeholder: "other"
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
        super(id, fields, false);
    }
}