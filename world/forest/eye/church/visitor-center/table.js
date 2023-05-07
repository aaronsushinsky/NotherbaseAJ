class Table {
    constructor(id) {
        this.$div = $(`.table#${id}`);
        this.$chairs = this.$div.find(".chair");
        this.$chairs.click(this.sit);

        this.sitters = {};
        this.spots = [];
    }

    sit = (chair, person = { type: "player", data: null }) => {
        chair = chair.target;
        if (this.sitters[chair.id]) {
            this.sitters[chair.id].data.removeFromSeat();
            this.clearChair(chair);
        }
        this.sitters[chair.id] = person;
        if (person.type === "player") {
            let $chair = $(chair);
            $chair.append(`<p>You</p>`);
            $chair.click()
        }
    }

    clearChair(chair) {
        $(chair).empty();
    }

    place(item, spot) {

    }

    grab(spot) {

    }
}