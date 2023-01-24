class Todo {
    constructor() {
        this.periodTypes = ["today", "week", "month", "year"]
        this.tasks = {};
        this.$div = {};

        for (let i = 0; i < this.periodTypes.length; i++) {
            this.$div[this.periodTypes[i]] = {
                loading: $(`.todo.${this.periodTypes[i]} .loading`),
                main: $(`.todo.${this.periodTypes[i]} .main`),
                new: $(`.todo.${this.periodTypes[i]} .new`),
                ul: $(`.todo.${this.periodTypes[i]} ul`),
                task:  $(`.todo.${this.periodTypes[i]} #task`)
            }
            this.$div[this.periodTypes[i]].task.keyup((e) => {
                if (e.which == 13) todo.submit(this.periodTypes[i]);
            });
        }

        this.getTasks();
    }

    getTasks = async () => {
        for (let i = 0; i < this.periodTypes.length; i++) {
            this.flipToLoading(this.periodTypes[i]);
        }
        
        let loaded = await base.load("todo");

        if (loaded.tasks) {
            this.tasks = loaded.tasks;
        }
        else {
            this.tasks = {};

            for (let i = 0; i < this.periodTypes.length; i++) {
                this.tasks[this.periodTypes[i]] = [];
            }
        }

        this.renderFull();

        for (let i = 0; i < this.periodTypes.length; i++) {
            this.flipToMain(this.periodTypes[i]);
        }
    }

    saveTasks = async () => {
        await base.do("save-tasks", {
            tasks: this.tasks
        });
    }

    submit = (period) => {
        this.flipToLoading(period);
        this.tasks[period].push(this.$div[period].task.val());
        
        this.saveTasks();
        this.render(period);
        this.flipToMain(period);
    }

    deleteTask(period, which) {
        this.flipToLoading(period);
        this.tasks[period].splice(which, 1);
        this.saveTasks();
        this.render(period);
        this.flipToMain(period);
    }

    renderFull() {
        for (let i = 0; i < this.periodTypes.length; i++) {
            this.render(this.periodTypes[i]);
        }
    }

    render(period) {
        this.$div[period].ul.empty();
        
        for (let i = 0; i < this.tasks[period].length; i++) {
            this.$div[period].ul.append(`<li>
                ${this.tasks[period][i]}
                <button onClick="todo.deleteTask('${period}', ${i})">X</button>
            </li>`);
        }
    }

    flipToMain(period) {
        this.$div[period].loading.addClass("invisible");
        this.$div[period].new.addClass("invisible");
        this.$div[period].main.removeClass("invisible");
        this.$div[period].task.val("");
    }

    flipToNew(period) {
        this.$div[period].loading.addClass("invisible");
        this.$div[period].new.removeClass("invisible");
        this.$div[period].main.addClass("invisible");
        this.$div[period].task.focus();
    }

    flipToLoading(period) {
        this.$div[period].main.addClass("invisible");
        this.$div[period].new.addClass("invisible");
        this.$div[period].loading.removeClass("invisible");
    }
}

const todo = new Todo();