class Browser {
    constructor(browserOptions, spiritOptions) {
        this.initBrowserOptions = {
            header: "Browser",
            subheader: "",
            id: ""
        }
        this.browserOptions = {
            ...this.initBrowserOptions,
            ...browserOptions
        }

        this.initSpiritOptions = {
            service: "default",
            scope: "local",
            parent: null,
            route: location.pathname,
            data: {
                default: String
            }
        }
        this.spiritOptions = {
            ...this.initSpiritOptions,
            ...spiritOptions
        }

        this.items = [];
        this.searchFilter = "";

        this.selected = 0;
    }

    render() {

    }

    renderSearchResults() {
        this.$searchList.empty();

        for (let i = 0; i < this.recipes.length; i++) {
            if (this.recipes[i].name.toLowerCase().includes(this.filter.toLowerCase())) {
                this.$searchList.append(`<li onclick="recipeBrowser.clickRecipe(this, ${i})">
                    ${this.recipes[i].name}
                </li>`);
            }
        };
        if (this.$searchList.find("li").length < 1) {
            this.$searchList.append(`<p>No Recipes</p>`);
        }
    }

    load = async () => {
        //load recipes
        let load = await base.load(this.spiritOptions.service, this.spiritOptions.scope);
        if (!load.items) this.items = [];
        else this.items = load.items;

        this.renderSearchResults();

        //enable the search bar
        this.$search.on("input", (e) => {
            this.filter = $(e.currentTarget).val();
            this.renderSearchResults();
        });
    }

    save = async () => {
        //compile ingredients list
        let ing = [];
        let $ingredients = this.$editIngredientList.find("li");
        for (let i = 0; i < $ingredients.length; i++) {
            if ($($ingredients[i]).find("#ingredient").val() != "") {
                ing.push({
                    amount: $($ingredients[i]).find("#amount").val(),
                    measure: $($ingredients[i]).find("#measure").val(),
                    ingredient: $($ingredients[i]).find("#ingredient").val()
                });
            }
        }

        //compile directions list
        let dir = [];
        let $directions = this.$editDirectionsList.find("li input");
        for (let i = 0; i < $directions.length; i++) {
            if ($($directions[i]).val() != "") dir.push($($directions[i]).val());
        }

        //update recipe
        let currentRecipe = this.tabRecipes[this.tab];
        if (currentRecipe < 0) {
            currentRecipe = this.recipes.length;
            this.recipes.push({
                name: this.$editName.val(),
                source: this.$editSource.val(),
                img: this.$editImage.val(),
                ingredients: ing,
                directions: dir
            });
        }
        else {
            this.recipes[currentRecipe] = {
                name: this.$editName.val(),
                source: this.$editSource.val(),
                img: this.$editImage.val(),
                ingredients: ing,
                directions: dir
            };
        }

        await base.do("save-recipes", {
            recipes: this.recipes
        });
        
        this.cancelRecipe();
        this.renderSearchResults();
    }

    read = async () => {
        this.tabRecipes[this.tab] = index;
        let currentRecipe = this.getSelectedRecipe();

        this.$readIngredientList.empty();
        this.$readIngredientList.append(`<h6>Ingredients:</h6>`);
        this.$readDirectionsList.empty();
        this.$readDirectionsList.append(`<h6>Directions:</h6>`);

        if (currentRecipe) {
            this.$readName.text(currentRecipe.name);
            this.$readImage.attr("src", currentRecipe.img);
            this.$readSource.text("From " + currentRecipe.source);
            for (let i = 0; i < currentRecipe.ingredients.length; i++) {
                this.$readIngredientList.append(`<li>
                    <p class="amount">${currentRecipe.ingredients[i].amount}</p>
                    <p class="measure">${currentRecipe.ingredients[i].measure}</p>
                    <p class="ingredient">${currentRecipe.ingredients[i].ingredient}</p>
                </li>`);
            }
            for (let i = 0; i < currentRecipe.directions.length; i++) {
                this.$readDirectionsList.append(`<li>${currentRecipe.directions[i]}</li>`);
            }
        }
        else {
            this.$readName.text("No Recipe");
            this.$readImage.attr("src", "/img/food/default.jpg");
            this.$readSource.text("No Chef");
        }
    }

    edit = async () => {
        this.$read.addClass("invisible");
        this.$edit.removeClass("invisible");

        if (this.tabRecipes[this.tab] >= 0) {
            this.$editName.val(this.recipes[this.tabRecipes[this.tab]].name);
            this.$editImage.val(this.recipes[this.tabRecipes[this.tab]].img);
            this.$editSource.val(this.recipes[this.tabRecipes[this.tab]].source);
            
            this.renderEditIngredients(this.recipes[this.tabRecipes[this.tab]].ingredients);
            this.renderEditDirections(this.recipes[this.tabRecipes[this.tab]].directions);
        }
    }

    delete = async () => {
        this.recipes.splice(which, 1);

        await base.do("save-recipes", {
            recipes: this.recipes
        });
        
        this.tabRecipes[this.tab] = -1;
        this.cancelRecipe();
        this.renderSearchResults();
    }

    new = async () => {
        this.tabRecipes[this.tab] = -1;
        
        this.editRecipe();
    }

    select (element, index) {
        this.$searchResults = this.$searchList.find("li");
        this.$searchResults.removeClass("selected");

        if (index > -1) {
            $(element).addClass("selected");
            this.readRecipe(index);
        }
    }
}