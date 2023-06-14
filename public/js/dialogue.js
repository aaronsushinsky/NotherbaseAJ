class Dialogue {
    /**
     * 
     * @param {String} name The id of the div.dialogue element.
     * @param {Number} beatCooldown Milliseconds per beat.
     * @param {Function} tree A function that returns slide objects.
     * @param {String} portrait A url to the portrait image.
     */
    constructor(name, beatCooldown, tree, portrait = "/img/npcs/anon.png") {
        if (typeof name === 'string') {
            this.name = name;
            this.properName = name[0].toUpperCase() + name.slice(1, name.length);
        }
        else console.log("Dialogue requires a string for name");
        this.$div = $(`.dialogue#${name}`);
        this.$header = $(`<h4></h4>`).appendTo(this.$div);
        this.$portrait = $(`<img src="${portrait}" class="portrait">`).appendTo(this.$header);
        this.$heart = $('<div class="heart"></div>').appendTo(this.$header);
        this.$name = $(`<p>${this.properName}</p>`).appendTo(this.$header);
        this.$content = $('<div class="content"></div>').appendTo(this.$div);

        if (typeof beatCooldown === 'number') this.beatCooldown = beatCooldown;
        else console.log("Dialogue requires a number for beat frequency");
        this.remainingBeats = 0;
        this.queue = [];

        this.flags = [];
        this.buttonPressed = {
            flag: "",
            global: false
        }

        if (typeof tree === 'function') this.tree = tree;
        else console.log("Dialogue requires a tree function");

        this.beat();
        setInterval(this.beat, this.beatCooldown);
    }

    static globalFlags = [];

    /**
     * Checks for a global flag.
     * @param {String} flag The flag to check for.
     * @returns True if the flag was found. False otherwise.
     */
    static checkGlobalFlag(flag) {
        return this.globalFlags.includes(flag);
    }

    /**
     * Adds a global flag.
     * @param {String} flag The flag to add.
     */
    static addGlobalFlag(flag) {
        if (!this.checkGlobalFlag(flag)) this.globalFlags.push(flag);
    }

    /**
     * Removes a global flag.
     * @param {String} flag The flag to remove.
     * @returns True if the flag was found. False otherwise.
     */
    static removeGlobalFlag(flag) {
        for (let i = 0; i < this.globalFlags.length; i++) {
            if (this.globalFlags[i] === flag) {
                this.globalFlags.splice(i, 1);
                return true;
            }
        }

        return false;
    }

    /**
     * Creates a text slide.
     * @param {String} text The text to render.
     * @param {Number} beats Number of beats to persist for.
     * @returns A slide object.
     */
    static textSlide(text, beats = 2) {
        return {
            type: "text",
            beats: beats,
            text: text
        }
    }
    
    /**
     * Creates a dialogue slide.
     * @param {Array} buttons An array of button objects.
     * @param {Number} beats Number of beats to persist for.
     * @returns A slide object.
     */
    static buttonSlide(buttons, beats = 4) {
        return {
            type: "buttons",
            beats: beats,
            buttons: buttons
        }
    }

    /**
     * Creates a button object for button slides.
     * @param {String} text Text to render in the button.
     * @param {String} flag Flag to add.
     * @param {Boolean} global Whether the flag affects all dialogues.
     * @returns A button object.
     */
    static button(text, flag, global = false) {
        return {
            text: text,
            flag: flag,
            global: global
        }
    }

    click(which, flag, global) {
        this.buttonPressed = {
            flag: flag,
            global: global
        }

        let $selected = this.$content.find(`button#${which}`).clone();
        this.clearContent();
        $selected.addClass("selected");
        this.$content.append($selected);
    }

    checkClick() {
        if (this.buttonPressed.flag) {
            if (this.buttonPressed.global) Dialogue.addGlobalFlag(this.buttonPressed.flag);
            else this.addFlag(this.buttonPressed.flag);

            this.buttonPressed = {
                flag: null,
                global: null
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
                let button = $(`<button id="${i}">${slide.buttons[i].text}</button>`).appendTo(this.$content);
                button.click(() => {
                    this.click(i, slide.buttons[i].flag, slide.buttons[i].global);
                });
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

    beat = () => {
        this.$heart.animate({
            height: "10%",
            opacity: 0
        }, 3*this.beatCooldown/4, () => {
            this.$heart.animate({
                height: "100%",
                opacity: 100
            }, this.beatCooldown/4);
        });

        this.remainingBeats--;

        if (this.checkClick()) {
            this.queue = [];
            this.addToQueue(this.tree(this));

            this.goToNextSlide();
        }
        else if (this.remainingBeats <= 0) {
            if (this.queue.length <= 0) {
                this.addToQueue(this.tree());
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