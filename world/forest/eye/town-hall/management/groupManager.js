const startPromote = (e) => {
    let $promote = $(e.currentTarget);
    $promote.addClass("invisible");

    let $ul = $promote.parent();

    let $demote = $ul.find(`#demote`);
    $demote.addClass("invisible");
    let $cancel = $ul.find(`#cancel-promote`);
    $cancel.removeClass("invisible");

    let $li = $(`<li id="new-promote"></li>`).appendTo($ul);
    let $input = $(`<input type="text"></input>`).appendTo($li);
    let $submit = $(`<button>Promote</button>`).appendTo($li);
    $submit.on("click", (element) => {
        promote(element, $input);
    });

    $cancel.on("click", (element) => {
        cancelPromote(element);
    });
}

const cancelPromote = (e) => {
    let $cancel = $(e.currentTarget);
    $cancel.addClass("invisible");
    
    let $ul = $cancel.parent();

    let $demote = $ul.find(`#demote`);
    $demote.removeClass("invisible");
    let $promote = $ul.find(`#promote`);
    $promote.removeClass("invisible");
    
    $ul.find("#new-promote").remove();
}

const promote = (e, $input) => {
    let $ul = $(e.currentTarget).parent().parent().parent();
    let userID = $ul.find(".read.id").text();

    base.do("save-auth", { 
        title: $input.val(), 
        userID, 
        groupID: metaGroups.serving.data[metaGroups.serving.selected].id 
    }).then((res) => { 
        metaGroups.reload(); 
        switch (res.data) {
            case "auth-error":
                metaGroups.setAlert("You are unauthorized to promote members!")
                break;
            case "login-error":
                metaGroups.setAlert("You are not logged in!")
                break;
            case "promoted":
                metaGroups.setAlert("Promoted!")
                break;
            case "redundant":
                metaGroups.setAlert("Promotion already given!")
                break;
        }
    });
}

const startDemote = (e) => {
    let $demote = $(e.currentTarget);
    $demote.addClass("invisible");

    let $ul = $demote.parent();

    let $promote = $ul.find(`#promote`);
    $promote.addClass("invisible");
    let $cancel = $ul.find(`#cancel-demote`);
    $cancel.removeClass("invisible");

    let $lis = $ul.find("li");
    $lis.addClass("click-me");
    $lis.on("click", (element) => {
        demote(element);
    });

    $cancel.on("click", (element) => {
        cancelDemote(element);
    });
}

const cancelDemote = (e) => {
    let $cancel = $(e.currentTarget);
    $cancel.addClass("invisible");
    
    let $ul = $cancel.parent();

    let $demote = $ul.find(`#demote`);
    $demote.removeClass("invisible");
    let $promote = $ul.find(`#promote`);
    $promote.removeClass("invisible");
    
    let $lis = $ul.find("li");
    $lis.removeClass("click-me");
    $lis.off();
}

const demote = (e) => {
    let $li = $(e.currentTarget);
    let $ul = $li.parent().parent();
    let userID = $ul.find(".read.id").text();

    base.do("save-auth", { 
        title: $li.find("p").text(), 
        userID, 
        demote: true, 
        groupID: metaGroups.serving.data[metaGroups.serving.selected].id 
    }).then((res) => { 
        metaGroups.reload(); 
        switch (res.data) {
            case "auth-error":
                metaGroups.setAlert("You are unauthorized to demote members!")
                break;
            case "login-error":
                metaGroups.setAlert("You are not logged in!")
                break;
            case "self-error":
                metaGroups.setAlert("You cannot demote yourself unless there are other Leaders!")
                break;
            case "leader-count-error":
                metaGroups.setAlert("You cannot demote another Leader unless there are other Leaders!")
                break;
            case "demoted":
                metaGroups.setAlert("Demoted!")
                break;
        }
    });
}

const startRemove = (e) => {
    let $lis = metaGroups.browser.$div.find(".read.members>li");
    $(`#remove`).addClass("invisible");
    $(`#cancel-remove`).removeClass("invisible");
    $(`.read.members>li .read.auth`).addClass("invisible");
    
    for (let i = 0; i < $lis.length; i++) {
        let $li = $($lis[i]);
        $li.addClass("click-me");
        $li.on("click", (element) => {
            remove(element);
        });
    }
}

const cancelRemove = (e) => {
    let $lis = metaGroups.browser.$div.find(".read.members>li");
    $(`#cancel-remove`).addClass("invisible");
    $(`#remove`).removeClass("invisible");
    $(`.read.members>li .read.auth`).removeClass("invisible");
    
    for (let i = 0; i < $lis.length; i++) {
        let $li = $($lis[i]);
        $li.removeClass("click-me");
        $li.off();
    }
}

const remove = (e) => {
    let $li = $(e.currentTarget);
    let $ul = $li.parent();
    let userID = $li.find(".read.id").text();

    base.do("remove-member", {
        userID,
        groupID: metaGroups.serving.data[metaGroups.serving.selected].id
    }).then((res) => { 
        metaGroups.reload(); 
        switch (res.data) {
            case "auth-error":
                metaGroups.setAlert("You are unauthorized to remove members!")
                break;
            case "login-error":
                metaGroups.setAlert("You are not logged in!")
                break;
            case "self-error":
                metaGroups.setAlert("You cannot remove yourself if you are a Leader!")
                break;
            case "removed":
                metaGroups.setAlert("Removed!")
                break;
        }
    });
}

const startAccept = (e) => {
    let $accept = $(e.currentTarget);
    $accept.addClass("invisible");

    let $ul = $accept.parent();

    let $reject = $ul.find(`#reject`);
    $reject.addClass("invisible");
    let $cancel = $ul.find(`#cancel-accept`);
    $cancel.removeClass("invisible");

    let $lis = $ul.find("li");
    $lis.addClass("click-me");
    $lis.on("click", (element) => {
        accept(element);
    });

    $cancel.on("click", (element) => {
        cancelAccept(element);
    });
}

const cancelAccept = (e) => {
    let $cancel = $(e.currentTarget);
    $cancel.addClass("invisible");
    
    let $ul = $cancel.parent();

    let $reject = $ul.find(`#reject`);
    $reject.removeClass("invisible");
    let $accept = $ul.find(`#accept`);
    $accept.removeClass("invisible");
    
    let $lis = $ul.find("li");
    $lis.removeClass("click-me");
    $lis.off();
}

const accept = (e) => {
    let $li = $(e.currentTarget);
    let $ul = $li.parent().parent();
    let userID = $li.find(".read.id").text();

    base.do("save-joins", {
        userID,
        groupID: metaGroups.serving.data[metaGroups.serving.selected].id 
    }).then((res) => { 
        metaGroups.reload(); 
        switch (res.data) {
            case "auth-error":
                metaGroups.setAlert("You are unauthorized to accept join requests!")
                break;
            case "login-error":
                metaGroups.setAlert("You are not logged in!")
                break;
            case "accepted":
                metaGroups.setAlert("Accepted!")
                break;
            case "redundant":
                metaGroups.setAlert("User already joined!")
                break;
            case "not-found-error":
                metaGroups.setAlert("Join request not found!")
                break;
        }
    });
}

const startReject = (e) => {
    let $reject = $(e.currentTarget);
    $reject.addClass("invisible");

    let $ul = $reject.parent();

    let $accept = $ul.find(`#accept`);
    $accept.addClass("invisible");
    let $cancel = $ul.find(`#cancel-reject`);
    $cancel.removeClass("invisible");

    let $lis = $ul.find("li");
    $lis.addClass("click-me");
    $lis.on("click", (element) => {
        reject(element);
    });

    $cancel.on("click", (element) => {
        cancelReject(element);
    });
}

const cancelReject = (e) => {
    let $cancel = $(e.currentTarget);
    $cancel.addClass("invisible");
    
    let $ul = $cancel.parent();

    let $accept = $ul.find(`#accept`);
    $accept.removeClass("invisible");
    let $reject = $ul.find(`#reject`);
    $reject.removeClass("invisible");
    
    let $lis = $ul.find("li");
    $lis.removeClass("click-me");
    $lis.off();
}

const reject = (e) => {
    let $li = $(e.currentTarget);
    let $ul = $li.parent().parent();
    let userID = $li.find(".read.id").text();

    base.do("save-joins", {
        userID,
        groupID: metaGroups.serving.data[metaGroups.serving.selected].id,
        reject: true
    }).then((res) => { 
        metaGroups.reload(); 
        switch (res.data) {
            case "auth-error":
                metaGroups.setAlert("You are unauthorized to reject join requests!")
                break;
            case "login-error":
                metaGroups.setAlert("You are not logged in!")
                break;
            case "rejected":
                metaGroups.setAlert("Rejected!")
                break;
            case "not-found-error":
                metaGroups.setAlert("Join request not found!")
                break;
        }
    });
}

const groupsBrowser = new Browser();
const groupsSearch = new SearchBox();

let removeButton = new Button("remove", {
    onClick: startRemove,
    label: "Remove"
});

let cancelRemoveButton = new Button("cancel-remove", {
    onClick: cancelRemove,
    label: "Cancel Remove",
    hidden: true
});

let demoteButton = new Button("demote", {
    onClick: startDemote,
    label: "Demote"
});

let cancelDemoteButton = new Button("cancel-demote", {
    onClick: null,
    label: "Cancel Demote",
    hidden: true
});

let promoteButton = new Button("promote", {
    onClick: startPromote,
    label: "Promote"
});

let cancelPromoteButton = new Button("cancel-promote", {
    onClick: null,
    label: "Cancel Promote",
    hidden: true
});

let acceptButton = new Button("accept", {
    onClick: startAccept,
    label: "Accept"
});

let cancelAcceptButton = new Button("cancel-accept", {
    onClick: null,
    label: "Cancel Accept",
    hidden: true
});

let rejectButton = new Button("reject", {
    onClick: startReject,
    label: "Reject"
});

let cancelRejectButton = new Button("cancel-reject", {
    onClick: null,
    label: "Cancel Reject",
    hidden: true
})

const metaGroups = new MetaBrowser("Your Groups", groupsBrowser, groupsSearch);
metaGroups.addService("groups", {
    fields: new NBField({
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
            name: "id",
            placeholder: null,
            hidden: true
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
            placeholder: "No Members",
            buttons: [ removeButton, cancelRemoveButton]
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
                multiple: true,
                buttons: [ demoteButton, cancelDemoteButton, promoteButton, cancelPromoteButton ]
            }, "string"),
            new NBField({
                name: "id",
                hidden: true,
                placeholder: null
            }, "string")
        ]),
        new NBField({
            name: "joinRequests",
            multiple: true,
            label: "Join Requests: ",
            placeholder: "No Join Requests",
            buttons: [ acceptButton, cancelAcceptButton, rejectButton, cancelRejectButton ]
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
            }, "long-string"),
            new NBField({
                name: "id",
                hidden: true,
                placeholder: null
            }, "string")
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
    ]),
    label: "Groups",
    multiple: true,
    toLoad: async () => {
        let data = (await base.do("load-groups")).data;
        return data;
    }
});