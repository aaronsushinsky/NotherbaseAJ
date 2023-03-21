class Navigation {
    constructor () {
        this.state = "welcome";
    }

    switch = (to) => {
        if (this.state !== to) {
            $("section").addClass("invisible");
            $(`section#${to}`).removeClass("invisible");

            $("nav button").removeClass("selected");
            $(`nav button#${to}`).addClass("selected");

            this.state = to;
        }
    }
}

const navigation = new Navigation();