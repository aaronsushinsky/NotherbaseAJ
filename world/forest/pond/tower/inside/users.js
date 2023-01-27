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

        this.updateUsers();
    }

    async updateUsers() {
        let users = await base.do("get-users");

        this.$userList.empty();
        this.users = users.data;

        for (let i = 0; i < this.users.length; i++) {
            this.$userList.append(`<li onClick="userFloor.selectUser(${i})">${this.users[i].username}</li>`);
        }

        this.$users = $("#user-list li");

        this.$population.text(`Population: ${this.users.length}`);

        this.selectUser(this.selectedUser);
    };

    selectUser(which) {
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

        this.readSelectedUser();
    }

    readSelectedUser() {
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

    editSelectedUser() {
        
    }

    saveSelectedUser() {
        
    }

    cancelEdit() {
        
    }
}

let userFloor = new UserFloor();