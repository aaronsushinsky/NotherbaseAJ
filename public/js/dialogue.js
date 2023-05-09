class Dialogue {
    constructor(name, beatFrequency, tree, portrait = "/img/npcs/anon.png") {
        if (typeof name === 'string') this.name = name;
        else console.log("Dialogue requires a string for name");
        this.$div = $(`.dialogue#${name}`);
        this.$div.empty();
        this.$portrait = $(`<img src="${portrait}" class="portrait">`).appendTo(this.$div);
        this.$heart = $('<div class="heart"></div>').appendTo(this.$div);
        this.$content = $('<div class="content"></div>').appendTo(this.$div);

        if (typeof beatFrequency === 'number') this.beatFrequency = beatFrequency;
        else console.log("Dialogue requires a number for beat frequency");
        this.remainingBeats = 0;
        this.queue = [];

        this.flags = [];

        if (typeof tree === 'function') this.tree = tree;
        else console.log("Dialogue requires a tree function");

        this.beat();
        setInterval(() => {this.beat();}, this.beatFrequency);
    }

    static globalFlags = [];

    static buttonPressed = {
        name: "",
        flag: "",
        global: false
    }

    static checkGlobalFlag(flag) {
        return this.globalFlags.includes(flag);
    }

    static addGlobalFlag(flag) {
        if (!this.checkGlobalFlag(flag)) this.globalFlags.push(flag);
    }

    static removeGlobalFlag(flag) {
        for (let i = 0; i < this.globalFlags.length; i++) {
            if (this.globalFlags[i] === flag) {
                this.globalFlags.splice(i, 1);
                return true;
            }
        }

        return false;
    }

    static createTextSlide(beats, text) {
        return {
            type: "text",
            beats: beats,
            text: text
        }
    }
    
    static createButtonSlide(beats, buttons) {
        return {
            type: "buttons",
            beats: beats,
            buttons: buttons
        }
    }

    static createButton(text, flag, global = false) {
        return {
            text: text,
            flag: flag,
            global: global
        }
    }

    static clickButton(name, which, flag, global) {
        this.buttonPressed = {
            name: name,
            flag: flag,
            global: global
        }

        let $dialogueContent = $(`.dialogue#${name} .content`)
        let $selected = $dialogueContent.find(`button#${which}`).clone();
        $dialogueContent.empty();
        $selected.addClass("selected");
        $dialogueContent.append($selected);
    }

    checkButtonClick() {
        if (Dialogue.buttonPressed.name === this.name) {
            if (Dialogue.buttonPressed.global) Dialogue.addGlobalFlag(Dialogue.buttonPressed.flag);
            else this.addFlag(Dialogue.buttonPressed.flag);

            Dialogue.buttonPressed = {
                name: "",
                flag: "",
                global: false
            }

            return true;
        }
        else return false;
    }

    checkFlag(flag) {
        return this.flags.includes(flag);
    }

    addFlag(flag) {
        if (!this.checkFlag(flag)) this.flags.push(flag);
    }

    removeFlag(flag) {
        for (let i = 0; i < this.flags.length; i++) {
            if (this.flags[i] === flag) {
                this.flags.splice(i, 1);
                return true;
            }
        }

        return false;
    }

    clearContent() {
        this.$content.empty();
    }

    setContent(slide) {
        this.clearContent();

        if (slide.type === "text") {
            this.$content.append(`<p>${slide.text}</p>`);
        }
        else if (slide.type === "buttons") {
            for (let i = 0; i < slide.buttons.length; i++) {
                this.$content.append(`<button id="${i}" onClick="Dialogue.clickButton('${this.name}', '${i}', '${slide.buttons[i].flag}', ${slide.buttons[i].global})">${slide.buttons[i].text}</button>`);
            }
        }
    }

    addToQueue(slides) {
        for (let i = 0; i < slides.length; i++) {
            this.queue.push(slides[i]);
        }
    }

    goToNextSlide() {
        if (this.queue.length > 0) {
            let nextSlide = this.queue.shift();
            this.remainingBeats = nextSlide.beats;
            this.setContent(nextSlide);
        }
    }

    beat() {
        this.$heart.animate({
            height: "10%",
            opacity: 0
        }, 3*this.beatFrequency/4, () => {
            this.$heart.animate({
                height: "100%",
                opacity: 100
            }, this.beatFrequency/4);
        });

        this.remainingBeats--;

        if (this.checkButtonClick()) {
            this.queue = [];
            this.addToQueue(this.tree(this));

            this.goToNextSlide();
        }
        else if (this.remainingBeats <= 0) {
            if (this.queue.length <= 0) {
                this.addToQueue(this.tree(this));
            }
            
            this.goToNextSlide();
        }
    }

    interrupt() {
        this.remainingBeats = 0;
        this.queue = [];
        this.addToQueue(this.tree(this));
    }
}