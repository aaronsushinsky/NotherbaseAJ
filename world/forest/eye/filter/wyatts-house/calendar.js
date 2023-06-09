class Calendar {
    constructor(id) {
        this.id = id;
        this.$div = $(`.calendar#${this.id}`);
        this.$header = $(`<h4>${this.id} Calendar</h4>`).appendTo(this.$div);
        this.$grid = $(`<div class="grid"></div>`).appendTo(this.$div);
        this.$days = [];
        this.$ui = $(`<div></div>`).appendTo(this.$div);
        this.$toggle = $(`<button>#</button>`).appendTo(this.$ui);
        this.$toggle.click(this.toggleMenu);
        this.$menu = $(`<div class="invisible">Options</div>`).appendTo(this.$ui);

        this.menuIsOpen = false;

        this.setMonth();
    }

    openMenu = () => {
        this.$menu.removeClass("invisible");
        this.menuIsOpen = true;
    }

    closeMenu = () => {
        this.$menu.addClass("invisible");
        this.menuIsOpen = false;
    }

    setMonth = (month = null, year = null) => {
        this.$grid.empty();
        this.$days = [];

        let currentDate = new Date();
        if (!month) month = currentDate.getMonth();
        if (!year) year = currentDate.getFullYear();
        
        let daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < daysInMonth; i++) {
            let newDay = $(`<div class="day">${i + 1}</div>`).appendTo(this.$grid);
            this.$days.push(newDay);
        }
    }
}