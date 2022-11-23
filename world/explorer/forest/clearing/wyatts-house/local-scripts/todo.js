class Todo {
    constructor() {
        this.loaded = false;
        // {
        //     description: "",
        //     deadline: Date,
        //     complete: false
        // }
        this.tasks = [];

        this.$today = $(".todo.today ul");
        this.$todayTaskInput = $(".todo.today #task");
        this.$todayTimeInput = $(".todo.today #time");
        this.$todayTimeInput.prop("min", new Date().getHours() + 1);

        this.$week = $(".todo.week ul");
        this.$month = $(".todo.month ul");
        this.$year = $(".todo.year ul");        

        this.getTasks();
    }

    getTasks = async () => {
        let loaded = await memories.load("tasks");
        if (loaded) {
            this.tasks = loaded.tasks;
            for (let i = 0; i < this.tasks.length; i++) {
                this.tasks[i].deadline = new Date(this.tasks[i].deadline);
            }
        }

        console.log(this.tasks);
        this.renderFull();

        this.loaded = true;
    }

    saveTasks = async () => {
        let send = [];

        for (let i = 0; i < this.tasks.length; i++) {
            send.push({
                description: this.tasks[i].description,
                deadline: this.tasks[i].deadline.getTime(),
                complete: this.tasks[i].complete
            });
        }

        await memories.save("tasks", {
            tasks: send
        });
    }

    submitToday() {
        if (this.loaded) {
            let date = new Date();
            date.setHours(this.$todayTimeInput.val());
            console.log(date.getHours());
            
            let newTask = {
                description: this.$todayTaskInput.val(),
                deadline: date,
                complete: false
            }

            this.tasks.push(newTask);
            this.saveTasks();
            this.renderToday();
            this.flip("today");
        }
    }

    deleteTask(which) {
        this.tasks.splice(which, 1);
        this.saveTasks();
        this.renderFull();
    }

    renderFull() {
        this.renderToday();
        this.renderWeek();
        this.renderMonth();
        this.renderYear();
    }

    renderToday() {
        this.$today.empty();
        
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].deadline - Date.now() < 1000 * 60 * 60 * 24) {
                this.$today.append(`<li>
                ${this.tasks[i].deadline.getHours()}: ${this.tasks[i].description}
                <button onClick="todo.deleteTask(${i})">X</button>
                </li>`);
            }
        }
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

    flip(which) {
        let $mainCard = $(`.todo.${which} .main`);
        let $newCard = $(`.todo.${which} .new`);

        if ($mainCard.hasClass("invisible")) {
            $newCard.addClass("invisible");
            $mainCard.removeClass("invisible");
        }
        else {
            $mainCard.addClass("invisible");
            $newCard.removeClass("invisible");
        }
    }
}

const todo = new Todo();