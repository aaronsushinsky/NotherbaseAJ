class Button {
    constructor(id, settings) {
        this.settings = {
            onClick: null,
            label: null,
            ...settings
        };

        this.id = id;

        this.$div = $(`<button id=${id}>${this.settings.label ? this.settings.label : "="}</button>`);
        if (this.settings.onClick) this.$div.click(() => {
            this.settings.onClick();
        });
    }

    hide = () => {
        this.$div.addClass("invisible");
    }

    show = () => {
        this.$div.removeClass("invisible");
    }
}

class Buttons {
    constructor(id, buttons, settings) {
        this.settings = {
            $origin: null,
            isTabs: false,
            label: null,
            ...settings
        };

        Buttons.attemptStyle();

        this.buttons = {};
        for (let i = 0; i < buttons.length; i++) {
            this.buttons[buttons[i].id] = buttons[i];
        }

        if (!this.settings.$origin) this.$div = $(`<div class="buttons ${this.settings.isTabs ? "tabs" : ""}" id="${id}"></div>`);
        else this.$div = this.settings.$origin;

        this.$div.click(this.click);

        this.render();
    }

    static styled = false;

    static attemptStyle() {
        if (!Buttons.styled) {
            $("head").append(`<link href='/styles/buttons.css' rel='stylesheet' />`);
            Buttons.styled = true;
        }
    }

    render = () => {
        this.$div.empty();
        
        if (this.settings.label) this.$header = $(`<h4>${this.settings.label}</h4>`).appendTo(this.$div);

        let keys = Object.keys(this.buttons);

        for (let i = 0; i < keys.length; i++) {
            this.$div.append(this.buttons[keys[i]].$div);
        }
    }

    addButton = (button) => {
        this.buttons[button.id] = button;

        this.$div.append(button.$div);
    }

    hide = (which = null) => {
        if (which) this.buttons[which].hide();
        else {
            let keys = Object.keys(this.buttons);

            for (let i = 0; i < keys.length; i++) {
                this.buttons[keys[i]].hide();
            }
        }
    }

    show = (which) => {
        if (which) this.buttons[which].show();
        else {
            let keys = Object.keys(this.buttons);

            for (let i = 0; i < keys.length; i++) {
                this.buttons[keys[i]].show();
            }
        }
    }
}