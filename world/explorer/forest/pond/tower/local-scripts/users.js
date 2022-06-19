class UserFloor {
    constructor() {
        this.$userList = $("#user-list");
        this.$users = $("#user-list p");
        this.$population = $("#population");

        this.$read = $(".user-info .read");
        this.$readName = $(".user-info .read .name");
        this.$readCoin = $(".user-info .read .coin");
        this.$readAuth = $(".user-info .read ul");

        this.$edit = $(".user-info .edit");
        this.$editName = $(".user-info .edit .name");
        this.$editCoin = $(".user-info .edit .coin");
        this.$editAuth = $(".user-info .edit ul");

        this.users = [];
        this.selectedUser = -1;

        this.updateUsers();
    }

    async updateUsers() {
        try {
            await $.get(`/user/all`, (data) => {
                this.$userList.empty();
                this.users = data.foundUsers;
        
                for (let i = 0; i < this.users.length; i++) {
                    this.$userList.append(`<p onClick="userFloor.selectUser(${i})">${this.users[i].username}: ${this.users[i].authLevels}</p>`);
                }
        
                this.$users = $("#user-list p");
        
                this.$population.text(`Population: ${this.users.length}`);

                this.selectUser(this.selectedUser);
            });
        } 
        catch(err) {
            console.log(err);
        }
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
    }

    readSelectedUser() {

    }

    editSelectedUser() {
        
    }

    saveSelectedUser() {
        
    }

    cancelEdit() {
        
    }
}

let userFloor = new UserFloor();