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
    try {
        await $.post("/user/login", {
            email: $("#login-email").val(),
            password: $("#login-pass").val()
        }, (data) => {
            Dialogue.addGlobalFlag("logged-in");
            closeClipboard("for-login");
            keeper.interrupt();
        });
    } catch (error) {
        //console.log(error);
        if (error.status === 401) {
            $loginInfo.text("Login Error: Username or password incorrect!");
        }
        else if (error.status === 500) {
            $loginInfo.text("Server Error: Try again later!");
        }
    }
});

//try to register an account
$registerButton.on("click", async function () {
    try {
        await $.post("/user/register", {
            email: $("#register-email").val(),
            username: $("#register-user").val(),
            password: $("#register-pass").val(),
            confirmation: $("#register-confirmation").val()
        }, (data) => {
            $registerInfo.text("You hear a nod from deep within the shack. Your new account has been registered.");
        });
    } catch (error) {
        //console.log(error);
        if (error.status === 400) {
            $registerInfo.text("Registration Error: Username taken!");
        }
        else if (error.status === 500) {
            $registerInfo.text("Server Error: Try again later!");
        }
    }
});

$changeButton.on("click", function () {
    goToReset("");
});

$resetButton.on("click", async function () {
    try {
        await $.get("/user/password-reset", { email: $("#reset-email").val() });
        goToSet("");
    } 
    catch(err) {
        if (error.status === 401) {
            goToReset("Reset Error: Account with specified email not found!");
        }
        else if (error.status === 500) {
            goToReset("Server Error: Try again later!");
        }
    }
});

$setButton.on("click", async function () {
    try {
        let token = $("#change-token").val();

        await $.post(`/user/password-reset`, {
            token: token,
            password: $("#change-password").val(),
            confirmation: $("#change-confirmation").val()
        }, (data) => {
            goToLogin("Password changed successfully.");
        });
    } 
    catch(err) {
        if (err.status === 498) {
            goToReset("Change Error: Your reset code expired! Please request a new one.");
        }
        else if (err.status === 400) {
            goToSet("Change Error: Passwords must match!");
        }
        else if (err.status === 404) {
            goToSet("Change Error: Reset code not valid!");
        }
        else if (err.status === 500) {
            goToSet("Server Error: Try again later!");
        }
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