let keeper = new Dialogue("keeper", 2000, function () {
    if (Dialogue.checkGlobalFlag("logged-in")) {
        return [
            Dialogue.textSlide("Did you hear that?"),
            Dialogue.textSlide("You've logged in successfully!"),
            Dialogue.textSlide("Head on through the gate.")
        ]
    }
    else if (this.checkFlag("first-time")) {
        return [
            Dialogue.textSlide("That's wonderful!"),
            Dialogue.textSlide("You can register an account using the clipboard on your right."),
            Dialogue.textSlide("Use the clipboard on your left to login."),
            Dialogue.textSlide("After successfully logging in, you can enter NotherBase through the gate."),
            Dialogue.textSlide("I can't wait to see you in NotherBase!")
        ]
    }
    else if (this.checkFlag("second-time")) {
        return [
            Dialogue.textSlide("Then don't let me keep you. :)")
        ]
    }
    else {
        return [
            Dialogue.textSlide("Hi! Welcome to NotherBase!"),
            Dialogue.textSlide("Is it your first time?"),
            Dialogue.buttonSlide([
                Dialogue.button("Yes, it is actually.", "first-time"),
                Dialogue.button("No, I know the way.", "second-time")
            ])
        ];
    }
});
