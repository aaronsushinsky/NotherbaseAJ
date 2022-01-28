let updateItems = async function updateItems() {
    $.get(`/item/all`, function(data) {
        $("#item-list").empty();

        for (let i = 0; i < data.foundItems.length; i++) {
            $("#item-list").append(`<p>[${data.foundItems[i].name}] ${data.foundItems[i].shortDescription}</p>`);
        };

        let $itemsInList = $("#item-list p");
        $itemsInList.on("click", function (e) {
            $itemsInList.removeClass("selected");
            $(e.currentTarget).addClass("selected");
        });
    });
};

$(".new").on("click", function () {
    $.post("/item", {
        name: $(".name").val(),
        shortDescription: $(".short-desc").val(),
        fullDescription: $(".full-desc").val(),
    });

    updateItems();
});


updateItems();


let updateUsers = async function updateItems() {
    $.get(`/user/all`, function(data) {
        $("#user-list").empty();

        for (let i = 0; i < data.foundUsers.length; i++) {
            $("#user-list").append(`<p>${data.foundUsers[i].username}: ${data.foundUsers[i].authLevels}</p>`);
        };

        let $usersInList = $("#user-list p");
        $usersInList.on("click", function (e) {
            $usersInList.removeClass("selected");
            $(e.currentTarget).addClass("selected");
        });

        $("#population").text(`Population: ${data.foundUsers.length}`);
    });
};

updateUsers();