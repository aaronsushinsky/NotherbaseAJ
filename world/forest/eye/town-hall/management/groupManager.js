console.log(EditBox.prototype.load);
// EditBox.prototype.load = function load(item = null) {
//     this.$div.empty();
//     this.$items = [];

//     this.renderHeader();

//     console.log("dscdhjn");

//     if (this.fields.settings.name === "name") {
//         if (this.fields.settings.readOnly) ReadBox.renderFieldTo(this.fields, this.$div, item, this.$items);
//         else this.set(item);
//     }
//     else if (this.fields.settings.name === "group") {
//         this.set(item);
//     }
//     else if (this.fields.settings.name === "description") {
//         this.set(item);
//     }
//     else if (this.fields.settings.name === "members") {
//         if (Array.isArray(item)) {
//             for (let i = 0; i < item.length; i++) {
//                 this.add(item[i]);
//             }
//         }
//     }
//     else if (this.fields.settings.name === "joinRequests") {
//         if (Array.isArray(item)) {
//             for (let i = 0; i < item.length; i++) {
//                 this.add(item[i]);
//             }
//         }
//     }
//     else if (this.fields.settings.name === "note") {
//         this.set(item);
//     }
//     else if (this.fields.settings.name === "settings") {
//         this.set(item);
//     }
//     else if (this.fields.settings.name === "memberLimit") {
//         this.set(item);
//     }
// }

class GroupManager extends Browser {
    constructor() {
        const fields = new NBField({
            name: "group",
            multiple: true,
            label: "Group: ",
            placeholder: "No Groups"
        }, [
            new NBField({
                name: "name",
                label: "Name: ",
                placeholder: "No Name"
            }, "string"),
            new NBField({
                name: "description",
                label: "Description: ",
                placeholder: "No Description"
            }, "long-string"),
            new NBField({
                name: "members",
                multiple: true,
                label: "Members: ",
                placeholder: "No Members"
            }, [
                new NBField({
                    name: "name",
                    label: "Name: ",
                    placeholder: "No Name",
                    readOnly: true
                }, "string")
            ]),
            new NBField({
                name: "joinRequests",
                multiple: true,
                label: "Join Requests: ",
                placeholder: "No Join Requests"
            }, [
                new NBField({
                    name: "name",
                    label: "Name: ",
                    placeholder: "No Name"
                }, "string"),
                new NBField({
                    name: "note",
                    label: "Note: ",
                    placeholder: "No Note"
                }, "long-string")
            ]),
            new NBField({
                name: "settings",
                label: "Settings: ",
                placeholder: "No Settings"
            }, [
                new NBField({
                    name: "memberLimit",
                    label: "Member Limit: ",
                    placeholder: 99
                }, "number")
            ])
        ]);
        super("groups", fields, true);
    }

    static getUserName(id) {
        let currentGroup = getSelectedItem();

        for (let i = 0; i < currentGroup.members.length; i++) {
            if (currentGroup.members[i].id === id) return currentGroup.members[i].name;
        }

        return null;
    }
}