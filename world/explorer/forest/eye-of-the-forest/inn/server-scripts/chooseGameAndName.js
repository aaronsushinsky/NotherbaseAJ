module.exports = async function chooseGameAndName(db) {
    let colors = ["Red", "Green", "Blue", "Yellow", "Orange", "Pink", "Purple", "Brown", "White", "Black", "Grey"];
    let animals = ["fox", "bear", "bird", "fish", "lizard", "bug", "microbe", "horse", "cat", "dog", "snipe", "cow"];

    let foundGames = await db.game.find({name: "mafia", registration: "open"});

    if (foundGames.length > 0) {
        let gameInfo = foundGames[Math.floor(Math.random() * foundGames.length)];
    
        let checkName = function checkName(name, game) {
            for (let i = 0; i < game.players.length; i++) {
                if (name === game.players[i].nickname) return true;
            }
    
            return false;
        }
    
        let nickname = "";
    
        do {
            nickname = colors[Math.floor(Math.random() * colors.length)];
            nickname = nickname + animals[Math.floor(Math.random() * animals.length)];
        } while (checkName(nickname, gameInfo));
    
        return {
            nickname: nickname,
            game: gameInfo
        };
    }
    else {
        return {
            nickname: "No Games",
            game: null
        };
    }
}