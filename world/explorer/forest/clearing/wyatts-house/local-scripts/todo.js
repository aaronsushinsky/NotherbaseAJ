class Todo {
    constructor() {
        // {
        //     description: "",
        //     deadline: Date,
        //     complete: false
        // }
        this.tasks = [];

        this.$today = $(".todo.today ul");
        this.$todayTaskInput = $(".todo.today #task");
        this.$todayTimeInput = $(".todo.today #time");

        this.$week = $(".todo.week ul");
        this.$month = $(".todo.month ul");
        this.$year = $(".todo.year ul");        

        this.getTasks();
        this.renderFull();
    }

    getTasks() {
        this.tasks = pathLoader.get("tasks");
    }

    saveTasks = async () => {
        console.log(await pathLoader.save("tasks", this.tasks));
    }

    submitToday() {
        let date = new Date(this.$todayTimeInput.attr("valueAsDate"));
        console.log(date);

        let newTask = {
            description: this.$todayTaskInput.val(),
            deadline: date,
            complete: false
        }

        this.tasks.push(newTask);
        this.saveTasks();
    }

    renderFull() {
        this.renderToday();
        this.renderWeek();
        this.renderMonth();
        this.renderYear();
    }

    renderToday() {
        this.$today.empty();
    }

    renderWeek() {
        this.$week.empty();
    }

    renderMonth() {
        this.$month.empty();
    }

    renderYear() {
        this.$year.empty();
    }

    renderListItem(task, deadline) {

    }

    flip(which) {
        let $mainCard = $(`.todo.${which} .main`);
        let $newCard = $(`.todo.${which} .new`);

        if ($mainCard.hasClass("invisible")) {
            $newCard.addClass("invisible");
            $mainCard.removeclass("invisible");
        }
        else {
            $mainCard.addClass("invisible");
            $newCard.removeclass("invisible");
        }
    }
}

const todo = new Todo();