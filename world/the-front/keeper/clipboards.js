let $clipboard = $(".clipboard");
let $loginButton = $("#login-button");
let $loginInfo = $("#login-info");
let $resetInfo = $("#reset-info");
let $setInfo = $("#set-info");
let $registerButton = $("#register-button");
let $registerInfo = $("#register-info");
let $resetForm = $("#reset-form");
let $setForm = $("#set-form");
let $loginForm = $("#login-form");
let $changeButton = $("#change-button");
let $resetButton = $("#reset-button");
let $setButton = $("#set-button");
let $returnButtons = $(".return-button");

//try to login
$loginButton.on("click", async (e) => {
    let response = await base.attemptLogin($("#login-email").val(), $("#login-pass").val());

    if (response.status === "success") {
        Dialogue.addGlobalFlag("logged-in");
        closeClipboard("for-login");
        keeper.interrupt();
    }
    else {
        $loginInfo.text(response.message);
    }
});

//try to register an account
$registerButton.on("click", async function () {
    let response = await base.attemptRegister(
        $("#register-email").val(),
        $("#register-user").val(),
        $("#register-pass").val()
    );

    if (response.status === "success") {
        $registerInfo.text("You hear a nod from deep within the shack. Your new account has been registered.");
    }
    else {
        $registerInfo.text(response.message);
    }
});

$changeButton.on("click", function () {
    goToReset("");
});

$resetButton.on("click", async function () {
    let response = await base.resetPassword($("#reset-email").val());

    if (response.status === "success") {
        $registerInfo.text("A reset token has been sent to your email.");
    }
    else {
        $registerInfo.text(response.message);
    }

    goToSet("");
});

$setButton.on("click", async function () {
    let response = await base.changePassword(
        $("#change-token").val(),
        $("#change-email").val(),
        $("#change-password").val(),
        $("#change-confirmation").val()
    );

    if (response.status === "success") {
        goToLogin("Password changed successfully.");
    }
    else {
        goToReset("Change Error: " + response.message);
    }
});

$returnButtons.on("click", function () {
    goToLogin("");
});

let goToLogin = function goToLogin(info) {
    $loginInfo.text(info);
    $resetForm.addClass("invisible");
    $setForm.addClass("invisible");
    $loginForm.removeClass("invisible");
}

let goToReset = function goToReset(info) {
    $resetInfo.text(info);
    $setForm.addClass("invisible");
    $loginForm.addClass("invisible");
    $resetForm.removeClass("invisible");
}

let goToSet = function goToSet(info) {
    $setInfo.text(info);
    $resetForm.addClass("invisible");
    $loginForm.addClass("invisible");
    $setForm.removeClass("invisible");
}

let clickClose = function clickClose(e) {
    e.stopPropagation();
    let $currentClipboard = $(e.currentTarget).parent();

    if (!$currentClipboard.hasClass("on-counter")) {
        $currentClipboard.addClass("on-counter");
        $currentClipboard.find(".scribbles").removeClass("invisible");
    }
}

let closeClipboard = function closeClipboard(which) {
    let $currentClipboard = $(`.${which}`);

    if (!$currentClipboard.hasClass("on-counter")) {
        $currentClipboard.addClass("on-counter");
        $currentClipboard.find(".scribbles").removeClass("invisible");
    }
}

//pick up a clipboard
$clipboard.on("click", function clickClipboard(e) {
    let $currentClipboard = $(e.currentTarget);

    if ($currentClipboard.hasClass("on-counter")) {
        $clipboard.addClass("on-counter");
        $clipboard.find(".scribbles").removeClass("invisible");
        $currentClipboard.removeClass("on-counter");
        $currentClipboard.find(".scribbles").addClass("invisible");
    }
});

//put down a clipboard
$(".close").on("click", clickClose);