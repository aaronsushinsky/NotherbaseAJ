let updateItems = async function updateItems() {
    $.get(`/item/all`, function(data) {
        $("#item-editor").empty();

        console.log(data);

        for (let i = 0; i < data.foundItems.length; i++) {
            $("#item-editor").append(`<p>[${data.foundItems[i].name}] ${data.foundItems[i].shortDescription}</p>`);
        };
    });
};

updateItems();