const maxMessages = 50;
let messages = [];
let lastMessageDate = "";

const updateMessages = function() {
    $.get(`/chat/new-messages/${lastMessageDate}`, function(data) {
        $(".chat-log").empty();

        console.log(`Got ${data.chats.length} new messages!`);

        messages = messages.concat(data.chats);

        if (messages.length > maxMessages) {
            messages = messages.slice( messages.length - maxMessages, -1)
        }

        if (messages.length > 0) {
            lastMessageDate = messages[messages.length - 1].date;
        }

        for (let i = 0; i < messages.length; i++) {
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
                //updateMessages();
            });
    }
}


setInterval(() => { updateMessages(); }, 250);

$(".chat-send").on("click", sendMessage);
$(".chat-entry").on("keyup", function(e) {
    if (e.keyCode == 13) sendMessage();
});