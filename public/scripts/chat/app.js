let messages = [];

const updateMessages = function() {
    let maxMessages = 50;
    $.get(`/chat/new-messages/${maxMessages}`, function(data) {
        $(".chat-log").empty();
        messages = data.chats;
        for (let i = messages.length - 1; i >= 0; i--) {
            let time = new Date(messages[i].date);
            $(".chat-log").append(`<p>[${time.toLocaleTimeString('en-US')}] ${messages[i].name}: ${messages[i].text}</p>`);
        };
    });
}

const sendMessage = function() {
    let entry = $(".chat-entry");
    if (entry.val() !== ""){
        $.post("/chat", {
            name: $(".name-entry").val(),
            text: entry.val()
        }, function() {
            entry.val("");
            updateMessages();
        });
    }
}


setInterval(() => { updateMessages(); }, 250);

$(".chat-send").on("click", sendMessage);
$(".chat-entry").on("keyup", function(e) {
    if (e.keyCode == 13) sendMessage();
});