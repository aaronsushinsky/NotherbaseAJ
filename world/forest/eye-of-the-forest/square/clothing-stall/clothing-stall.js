let height = 100;

$("#debris").on("click", function (event) {
    height -= 10;
    $("#debris").css("top", `${100 - height}%`);

    if (height <= 0) {
        $("h3").text("Thanks");

        Dialogue.addGlobalFlag("helped");
        playerInventory.change("Debris", 2);
        $(".merchant").removeClass("invisible");
    }
});