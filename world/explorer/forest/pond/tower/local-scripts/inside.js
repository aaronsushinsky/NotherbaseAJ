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

let updateMafiaGames = function updateMafiaGames() {
    $.get(`/game/all`, { name: "mafia" }, function(data) {
        $(".mafia .game-selector").empty();

        console.log(data);

        for (let i = 0; i < data.foundGames.length; i++) {
            $(".mafia .game-selector").append(`<p>${data.foundGames[i].name}: ${data.foundGames[i].winner}</p>`);
        };

        let $gamesInList = $(".mafia .game-selector p");
        $gamesInList.on("click", function (e) {
            $gamesInList.removeClass("selected");
            $(e.currentTarget).addClass("selected");

            
        });
    });
}

updateMafiaGames();

$(".floor#4 #new").on("click", function () {
    $.post("/game", {
        name: "mafia",
        dateStarted: Date.now(),
        winner: "",
        maxPlayers: 20,
        players: [],
        maxTurns: 20,
        turn: 0,
        turns: [],
        autoTurns: false,
        hour: 0
    }, function () {
        updateMafiaGames();
    })
});


$(".floor button#toggle").on("click", function (e) {
    $(e.target.parentElement).find(".content").toggleClass("invisible");
});