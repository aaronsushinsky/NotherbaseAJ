let keeper = new Dialogue("keeper", 4000, (self) => {
    if (Dialogue.checkGlobalFlag("logged-in")) {
        return [
            Dialogue.createTextSlide(1, "Did you hear that?"),
            Dialogue.createTextSlide(1, "You've logged in successfully!"),
            Dialogue.createTextSlide(1, "Head on through the gate.")
        ]
    }
    else if (self.checkFlag("first-time")) {
        return [
            Dialogue.createTextSlide(1, "That's wonderful!"),
            Dialogue.createTextSlide(1, "You can register an account using the clipboard on your right."),
            Dialogue.createTextSlide(1, "Use the clipboard on your left to login."),
            Dialogue.createTextSlide(1, "After successfully logging in, you can enter NotherBase through the gate."),
            Dialogue.createTextSlide(1, "I can't wait to see you in NotherBase!")
        ]
    }
    else if (self.checkFlag("second-time")) {
        return [
            Dialogue.createTextSlide(1, "Then don't let me keep you. :)")
        ]
    }
    else {
        return [
            Dialogue.createTextSlide(1, "Hi! Welcome to NotherBase!"),
            Dialogue.createTextSlide(1, "Is it your first time?"),
            Dialogue.createButtonSlide(2, [
                Dialogue.createButton("Yes, it is actually.", "first-time"),
                Dialogue.createButton("No, I know the way.", "second-time")
            ])
        ];
    }
});
