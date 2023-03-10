class Browser {
    constructor(id) {
        this.id = id;
        this.items = [];
        this.filter = "";
        this.selected = -1;
        this.lastSearch = 0;

        this.$div = $(`.browser#${id}`);
        this.$search = this.$div.find(".search input");
        this.$search.on("input", (e) => {
            return this.setFilter(e.currentTarget.value);
        });
        this.$searchList = this.$div.find(".search ul");

        this.$read = {
            div: this.$div.find(".read"),
            title: this.$div.find(".read h4"),
            image: this.$div.find(".read img"),
            source: this.$div.find(".read h6"),
            content: this.$div.find(".read p"),
        };

        this.$edit = {
            div: this.$div.find(".edit"),
            title: this.$div.find(".edit #title"),
            image: this.$div.find(".edit #image"),
            source: this.$div.find(".edit #source"),
            content: this.$div.find(".edit #content"),
        };
    }

    renderSearchResults = () => {
        this.$searchList.empty();

        for (let i = 0; i < this.items.length; i++) {
            let label = this.items[i].name || this.items[i].title || this.items[i].header || this.items[i].whenSearched || Object.values(this.items[i])[0];
            if (label.toLowerCase().includes(this.filter.toLowerCase())) {
                this.$searchList.append(`<li id="${i}" onclick="browser.select(${i})">
                    ${label}
                </li>`);
            }
        };
        if (this.items.length < 1) {
            this.$searchList.append(`<p>No Items</p>`);
        }
    }

    setFilter = (filter) => {
        if (Date.now() - this.lastSearch > 500) {
            this.lastSearch = Date.now();
            this.filter = filter;
            this.renderSearchResults();
        }
    }

    load = (res) => {
        if (res?.items?.length) {
            this.items = res.items;
            this.renderSearchResults();
        }
        else console.log(res);
    }

    save = async () => {
        let newItem = {
            title: this.$edit.title.val(),
            source: this.$edit.source.val(),
            img: this.$edit.image.val(),
            content: this.$edit.content.val()
        };

        if (this.selected < 0) this.items.push(newItem);
        else this.items[this.selected] = newItem;

        await base.do("save-stories", {
            items: this.items
        });
        
        this.cancel();
        this.renderSearchResults();
        this.select(this.items.length - 1);
    }

    read = async () => {
        this.cancel();

        if (this.selected > -1) {
            let item = this.items[this.selected];
            this.$read.title.text(item.title);
            this.$read.image.attr("src", item.img);
            this.$read.source.text("From: " + item.source);
            this.$read.content.text(item.content);
        }
        else {
            this.$read.title.text("No Story");
            this.$read.image.attr("src", "/img/food/default.jpg");
            this.$read.source.text("No Source");
            this.$read.content.text("No Content");
        }
    }

    edit = () => {
        this.$read.div.addClass("invisible");
        this.$edit.div.removeClass("invisible");

        if (this.selected >= 0) {
            let item = this.items[this.selected];
            this.$edit.title.val(item.title);
            this.$edit.image.val(item.img);
            this.$edit.source.val(item.source);
            this.$edit.content.val(item.content);
        }
        else {
            this.$edit.title.val("New Story");
            this.$edit.image.val("/img/food/default.jpg");
            this.$edit.source.val("New Source");
            this.$edit.content.val("New Content");
        }
    }

    cancel = () => {
        this.$edit.div.addClass("invisible");
        this.$read.div.removeClass("invisible");
    }

    delete = async () => {
        if (this.selected > -1) {
            this.items.splice(this.selected, 1);
    
            await base.do("save-stories", {
                items: this.items
            });
            
            this.renderSearchResults();
            this.cancel();
            this.select(-1);
        }
    }

    new = () => {
        this.selected = -1;
        
        this.edit();
    }

    select = (which) => {
        this.selected = which;
        let $searchResults = this.$searchList.find("li");
        $searchResults.removeClass("selected");

        if (which > -1) {
            $searchResults.find(`#${which}`).addClass("selected");
        }
        
        this.read();
    }
}