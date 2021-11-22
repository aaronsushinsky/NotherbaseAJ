let updateItems = async function updateItems() {
    $.get(`/item/all`, function(data) {
        $("#item-editor").empty();

        for (let i = 0; i < data.foundItems.length; i++) {
            $("#item-editor").append(`<p>[${data.foundItems[i].name}] ${data.foundItems[i].shortDescription}</p>`);
        };

        let $itemsInList = $("#item-editor p");
        $itemsInList.on("click", function (e) {
            $(e.currentTarget).toggleClass("selected");
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