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
                placeholder: new Date()
            }, "date-time"),
            new NBField({
                name: "recurring",
                label: "Recurring: ",
                placeholder: "false"
            }, "string"),
            new NBField({
                name: "description",
                label: "Description: ",
                placeholder: "Description"
            }, "string")
        ]);
        super(id, fields, true, "save-schedule");
    }
}