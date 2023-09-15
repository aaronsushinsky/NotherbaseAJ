const taskBrowser = new Browser("scheduler");
const taskSearch = new SearchBox("scheduler");

const metaScheduler = new MetaBrowser("scheduler", taskBrowser, taskSearch, "Your Schedule");
metaScheduler.addService("schedule", {
    fields: new NBField({
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
                label: "Group: ",
                placeholder: "No Group",
                readOnly: true
            }, "string"),
            new NBField({
                name: "shared",
                label: "Shared: ",
                placeholder: false
            }, "boolean")
        ])
    ]),
    label: "Your Tasks",
    editable: true,
    multiple: true,
    toLoad: async () => {
        return (await base.do("load-schedule")).data;
    },
    toSave: async (item, which) => {
        await base.do("save-task", { item, which });
    }
});

metaScheduler.addService("shared-schedule", {
    fields: new NBField({
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
                label: "Group: ",
                placeholder: "No Group",
                readOnly: true
            }, "string")
        ])
    ]),
    label: "Tasks Shared with You",
    multiple: true,
    toLoad: async () => {
        return (await base.do("load-shared-schedule")).data;
    }
});