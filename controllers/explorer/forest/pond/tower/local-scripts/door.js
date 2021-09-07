$("#knock").on("click", function knock() {
    $("#extra").text("You knocked on the tower's door. Surely you've been heard.");
    $("#knock").toggleClass("invisible");
});