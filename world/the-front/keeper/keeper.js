let keeper = new Dialogue("keeper", 2000, function () {
    //if logged in
    if (Dialogue.checkGlobalFlag("logged-in")) {
        Dialogue.removeGlobalFlag("logged-in");

        return [
            Dialogue.textSlide("Did you hear that?", 1),
            Dialogue.textSlide("You've logged in successfully!"),
            Dialogue.textSlide("Head on in through the gate.")
        ]
    }
    // about nb
    else if (this.checkFlag("what-kind")) {
        this.removeFlag("what-kind");
        this.removeFlag("about-nb");
        this.addFlag("human")

        return [
            Dialogue.textSlide("Oh, I love this question!"),
            Dialogue.textSlide("NotherBase has a variety of web apps and games."),
            Dialogue.textSlide("You can even interact with other humans in certain places.")
        ]
    }
    else if (this.checkFlag("who-made")) {
        this.removeFlag("who-made");
        this.removeFlag("about-nb");

        return [
            Dialogue.textSlide("Uh- well, God did.", 3),
            Dialogue.textSlide("Same as the way every other place was made, right?"),
            Dialogue.textSlide("Wait, you mean to ask who made the fence and buildings within?"),
            Dialogue.textSlide("That's just Nother.", 1),
            Dialogue.textSlide("But, I think they're still working for God.")
        ]
    }
    else if (this.checkFlag("how-big")) {
        this.removeFlag("how-big");
        this.removeFlag("about-nb");

        return [
            Dialogue.textSlide("How big?", 1),
            Dialogue.textSlide("Um..."),
            Dialogue.textSlide("I'm really not sure to be honest."),
            Dialogue.textSlide("I think it's pretty big, though. Should be.")
        ]
    }
    else if (this.checkFlag("about-nb")) {
        return [
            Dialogue.buttonSlide([
                Dialogue.button("What kind of website is this?", "what-kind"),
                Dialogue.button("Who made this place?", "who-made"),
                Dialogue.button("How big is NotherBase?", "how-big")
            ])
        ]
    }
    // about account
    else if (this.checkFlag("why-account")) {
        this.removeFlag("why-account");
        this.removeFlag("about-account");

        return [
            Dialogue.textSlide("Registering an account allows NotherBase to indentify you."),
            Dialogue.textSlide("This way, NotherBase can provide features like game saves synced across all your devices.")
        ]
    }
    else if (this.checkFlag("why-email")) {
        this.removeFlag("why-email");
        this.removeFlag("about-account");

        return [
            Dialogue.textSlide("Your email is needed in for account recovery."),
            Dialogue.textSlide("My boss said he didn't want everyone calling him when they forget their passwords.")
        ]
    }
    else if (this.checkFlag("what-info")) {
        this.removeFlag("what-info");
        this.removeFlag("about-account");

        return [
            Dialogue.textSlide("Only information about you that has been generated on NotherBase will be saved.", 4),
            Dialogue.textSlide("For example, imagine you are choosing an alias for a game."),
            Dialogue.textSlide("NotherBase servers will save that info in order to sync across your devices.")
        ]
    }
    else if (this.checkFlag("about-account")) {
        return [
            Dialogue.buttonSlide([
                Dialogue.button("Why is an account needed?", "why-account"),
                Dialogue.button("Why is my email address needed?", "why-email"),
                Dialogue.button("What information is saved about me?", "what-info")
            ])
        ]
    }
    //about self
    else if (this.checkFlag("about-self")) {
        this.removeFlag("about-self");

        return [
            Dialogue.textSlide("Oh we don't need to talk about little 'ol me."),
            Dialogue.textSlide("I'm no important person.", 1)
        ]
    }
    //about self
    else if (this.checkFlag("poke")) {
        this.removeFlag("poke");

        return [
            Dialogue.textSlide("It's true that you can interact with other people like myself, but..."),
            Dialogue.textSlide("You already knew that.", 1),
            Dialogue.textSlide("I was just trying to emphasize that you can interact with others like yourself, too.")
        ]
    }
    //start
    else if (this.checkFlag("greeted")) {
        if (this.checkFlag("human")) return [
            Dialogue.textSlide("Let me know if you have any questions."),
            Dialogue.buttonSlide([
                Dialogue.button("About NotherBase...", "about-nb"),
                Dialogue.button("About Accounts...", "about-account"),
                Dialogue.button("Why did you say other humans and not other people?", "poke")
            ])
        ];
        else return [
            Dialogue.textSlide("Let me know if you have any questions.", 1),
            Dialogue.buttonSlide([
                Dialogue.button("About NotherBase...", "about-nb"),
                Dialogue.button("About Accounts...", "about-account"),
                Dialogue.button("About Yourself...", "about-self")
            ])
        ];
    }
    else {
        this.addFlag("greeted");

        return [
            Dialogue.textSlide("Hi!", 1),
            Dialogue.textSlide("Welcome to NotherBase!", 2)
        ]
    }
});
