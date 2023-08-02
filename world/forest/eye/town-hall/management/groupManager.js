editBoxLoadOverride = function(item = null) {
    this.renderHeader();

    switch (this.fields.settings.name) {
        case "memberLimit":
        case "settings":
        case "note":
        case "description":
        case "group":
            this.set(item);
            break;
        case "name":
            if (this.fields.settings.readOnly) ReadBox.renderFieldTo(this.fields, this.$div, item, this.$items);
            else this.set(item);
            break;
        case "members":
            if (Array.isArray(item)) {
                for (let i = 0; i < item.length; i++) {
                    this.$items.push([]);
                    let $domCapture = this.$items[this.$items.length - 1];
                    let $newLI = $(`<li id="${this.$items.length - 1}"></li>`).appendTo(this.$div);
    
                    for (let j = 0; j < this.fields.children.length; j++) {
                        let toLoad = null;
                        if (item[i]) toLoad = item[i][this.fields.children[j].settings.name];
    
                        let newBox = new EditBox(this.fields.children[j], true, this.loadOverride, { member: i });
                        newBox.render().appendTo($newLI);
                        newBox.load(toLoad);
                        $domCapture.push(newBox);
                    }
    
                    let $remove = $(`<button>Remove Member</button>`).appendTo($newLI);
                    //let which = this.$items.length - 1;
                    $remove.click(() => { groupManager.removeMember(i); });
                }
            }
            break;
        case "joinRequests":
            if (Array.isArray(item)) {
                for (let i = 0; i < item.length; i++) {
                    this.$items.push([]);
                    let $domCapture = this.$items[this.$items.length - 1];
                    let $newLI = $(`<li id="${this.$items.length - 1}"></li>`).appendTo(this.$div);
    
                    for (let j = 0; j < this.fields.children.length; j++) {
                        let toLoad = null;
                        if (item[i]) toLoad = item[i][this.fields.children[j].settings.name];
    
                        let newBox = new EditBox(this.fields.children[j], true, this.loadOverride, { member: i });
                        newBox.render().appendTo($newLI);
                        newBox.load(toLoad);
                        $domCapture.push(newBox);
                    }
    
                    let $accept = $(`<button>Accept</button>`).appendTo($newLI);
                    $accept.click(() => { groupManager.acceptJoin(i); });
                    let $remove = $(`<button>Decline</button>`).appendTo($newLI);
                    $remove.click(() => { groupManager.declineJoin(i); });
                }
            }
            break;
        case "auth":
            if (Array.isArray(item)) {
                for (let i = 0; i < item.length; i++) {
                    this.$items.push([]);
                    let $domCapture = this.$items[this.$items.length - 1];
                    let $newLI = $(`<li id="${this.$items.length - 1}"></li>`).appendTo(this.$div);

                    EditBox.renderFieldTo(this.fields, $newLI, item[i], $domCapture);

                    let $remove = $(`<button class="remove">X</button>`).appendTo($newLI);
                    $remove.click(() => { groupManager.demote(this.extraData.member, item[i]); });
                }
            }
            this.$newAuth = $(`<input type="text" placeHolder="New Auth"></input>`).appendTo(this.$div);
            this.$add = $(`<button>Promote</button>`).appendTo(this.$div);
            this.$add.click(() => { groupManager.promote(this.extraData.member, this.$newAuth.val()); });
            break;
    }
}

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
                }, "string"),
                new NBField({
                    name: "auth",
                    label: "Auth: ",
                    placeholder: "No Auth",
                    multiple: true
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
                    placeholder: "No Name",
                    readOnly: true
                }, "string"),
                new NBField({
                    name: "note",
                    label: "Note: ",
                    placeholder: "No Note",
                    readOnly: true
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
        super("groups", fields, true, null, {
            editBoxLoadOverride: editBoxLoadOverride,
            disableCreate: true,
            disableSave: true,
            disableDelete: true
        });

        this.$toEdit.text("Unlock");
        this.$cancel.text("Lock");

        this.load();
    }

    static getUserName(id) {
        let currentGroup = getSelectedItem();

        for (let i = 0; i < currentGroup.members.length; i++) {
            if (currentGroup.members[i].id === id) return currentGroup.members[i].name;
        }

        return null;
    }

    load = async () => {
        await base.do("load-groups").then((res) => {
            console.log(res);

            this.items = res.data;
    
            if (!Array.isArray(this.items)) {
                this.items = [];
                console.log("items overridden due to multiple");
            }

            this.renderSearchResults();
            this.select(this.selected);
        });
    }

    removeMember = (which) => {
        base.do("remove-member", {
            userID: this.items[this.selected].members[which].id,
            groupID: this.items[this.selected].id
        }).then((res) => {
            if (res.status == "success") {
                if (res.data == "removed") {
                    this.cancel();
                    this.load();
                }
                else if (res.data == "self-error") {
                    this.alert("Cannot remove self.");
                }
                else if (res.data == "auth-error") {
                    this.alert("You are not authorized.");
                }
                else {
                    this.alert("Unknown server error.");
                }
            }
            else console.log(res);
        });
    }

    promote = async (which, level) => {
        let auth = this.items[this.selected].members[which].auth;
        if (!Array.isArray(auth)) auth = [];
        if (!auth.includes(level)) auth.push(level);

        await base.do("save-auth", {
            userID: this.items[this.selected].members[which].id,
            auth: auth,
            groupID: this.items[this.selected].id
        });

        this.cancel();
        await this.load();
    }

    demote = async (which, level) => {
        let auth = this.items[this.selected].members[which].auth;
        if (!Array.isArray(auth)) auth = [];
        for (let i = 0; i < auth.length; i++) {
            while (auth[i] === level) auth.splice(i, 1);
        }

        await base.do("save-auth", {
            userID: this.items[this.selected].members[which].id,
            auth: auth,
            groupID: this.items[this.selected].id
        });

        this.cancel();
        await this.load();
    }

    acceptJoin = (which) => {
        base.do("accept-join", {
            userID: this.items[this.selected].joinRequests[which].id,
            groupID: this.items[this.selected].id
        }).then((res) => {
            if (res.status == "success") {
                if (res.data == "accepted") {
                    this.cancel();
                    this.load();
                }
                else if (res.data == "not-found-error") {
                    this.alert("Error: Request not found.");
                }
                else {
                    this.alert("Unknown server error.");
                }
            }
            else console.log(res);
        });
    }

    declineJoin = (which) => {
        base.do("decline-join", {
            userID: this.items[this.selected].joinRequests[which].id,
            groupID: this.items[this.selected].id
        }).then((res) => {
            if (res.status == "success") {
                if (res.data == "declined") {
                    this.cancel();
                    this.load();
                }
                else if (res.data == "not-found-error") {
                    this.alert("Error: Request not found.");
                }
                else {
                    console.log(res.data);
                    this.alert("Unknown server error.");
                }
            }
            else console.log(res);
        });
    }
}