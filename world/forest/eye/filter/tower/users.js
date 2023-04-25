class UserFloor {
    constructor() {
        this.$userList = $("#user-list");
        this.$users = $("#user-list p");
        this.$population = $("#population");

        this.$read = $(".user-info .read");
        this.$readName = $(".user-info .read .name");
        this.$readCoin = $(".user-info .read .coin");
        this.$readAuth = $(".user-info .read .auth");
        this.$readHome = $(".user-info .read .home");
        this.$readLocation = $(".user-info .read .location");
        this.$readAttributes = $(".user-info .read .attributes");
        this.$readEmail = $(".user-info .read .email");

        this.$edit = $(".user-info .edit");
        this.$editName = $(".user-info .edit .name");
        this.$editCoin = $(".user-info .edit .coin");
        this.$editAuth = $(".user-info .edit ul");

        this.users = [];
        this.selectedUser = -1;
        this.state = "read";

        this.update();
    }

    async update() {
        let users = await base.do("get-users");

        this.$userList.empty();
        this.users = users.data;

        for (let i = 0; i < this.users.length; i++) {
            this.$userList.append(`<li onClick="userFloor.select(${i})">${this.users[i].username}</li>`);
        }

        this.$users = $("#user-list li");

        this.$population.text(`Population: ${this.users.length}`);

        this.select(this.selectedUser);
    };

    select(which) {
        if (which < 0 || this.$users.length < 1) {
            this.selectedUser = -1;
            this.$users.removeClass("selected");
        }
        else {
            if (which > this.$users.length - 1) {
                this.selectedUser = this.$users.length - 1;
            }
            else this.selectedUser = which;
            
            this.$users.removeClass("selected");
            $(this.$users[this.selectedUser]).addClass("selected");
        }

        this.read();
    }

    read() {
        this.state = "read";
        this.$read.removeClass("invisible");
        this.$edit.addClass("invisible");

        if (this.selectedUser < 0) {
            this.$readName.html(`Username: -`);
            this.$readCoin.html(`Coin: -`);
            this.$readAuth.html(`Auth: -`);
            this.$readHome.html(`Home: -`);
            this.$readLocation.html(`Location: -`);
            this.$readAttributes.html(`Attributes: -`);
            this.$readEmail.html(`Email: -`);
        }
        else {
            this.$readName.html(`Username: ${this.users[this.selectedUser].username}`);
            this.$readCoin.html(`Coin: ${this.users[this.selectedUser].coin}`);
            this.$readAuth.html(`Auth: ${this.users[this.selectedUser].authLevels}`);
            this.$readHome.html(`Home: ${this.users[this.selectedUser].home}`);
            this.$readLocation.html(`Location: ${this.users[this.selectedUser].location}`);
            this.$readAttributes.html(`Attributes: ${this.users[this.selectedUser].attributes}`);
            this.$readEmail.html(`Email: ${this.users[this.selectedUser].email}`);
        }
    }

    edit() {
        this.state = "edit";
        this.$edit.removeClass("invisible");
        this.$read.addClass("invisible");

        if (this.selectedUser >= 0 && this.selectedUser < this.users.length) {
            this.$editAuth.empty();
            
            for (let i = 0; i < this.users[this.selectedUser].authLevels.length; i++) {
                this.$editAuth.append(`<li id="${i}">
                    <input value="${this.users[this.selectedUser].authLevels[i]}">
                    <button onclick="userFloor.removeAuth(${i})">X</button>
                </li>`);
            }
        }
    }

    removeAuth(which) {
        if (this.state === "edit") {
            this.$editAuth.children()[which].remove();
        }
    }

    addAuth() {
        if (this.state === "edit") {
            this.$editAuth.append(`<li id="${this.$editAuth.children().length}">
                    <input value="${this.$editAuth.children().length}">
                    <button onclick="userFloor.removeAuth(${this.$editAuth.children().length})">X</button>
                </li>`);
        }
    }

    save = async () => {
        let newAuth = [];
        let $newAuth = $(".user-info .edit ul li input");

        for (let i = 0; i < $newAuth.length; i++) {
            newAuth.push($($newAuth[i]).val());
        }
        console.log($newAuth);

        let save = await base.do("save-user", {
            email: this.users[this.selectedUser].email,
            authLevels: newAuth
        });

        console.log(save);
        this.users[this.selectedUser] = save.data;

        this.read();
    }

    cancel() {
        this.read();
    }
}

let userFloor = new UserFloor();