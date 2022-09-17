class RecipeBrowser {
    constructor() {
        this.recipes = null;
        this.filter = "";

        //dom elements
        this.$searchList = $(".search ul");
        this.$searchResults = this.$searchList.find("li");
        this.$search = $(".search input");
        this.$viewing = $(".viewing");
        this.$content = $(".viewing .content");
        this.$read = this.$content.find(".read");
        this.$edit = this.$content.find(".edit");

        //read elements
        this.$readName = this.$read.find(".title h5");
        this.$readImage = this.$read.find(".title img");
        this.$readSource = this.$read.find(".title h6");
        this.$readIngredientList = this.$read.find(".ingredients");
        this.$readDirectionsList = this.$read.find(".directions");

        //edit inputs
        this.$editName = this.$edit.find("#name");
        this.$editImage = this.$edit.find("#img-url");
        this.$editSource = this.$edit.find("#source");
        this.$editIngredientList = this.$edit.find(".ingredients");
        this.$editDirectionsList = this.$edit.find(".directions");

        //entry buttons
        this.$saveButton = $(".buttons #save");
        this.$cancelButton = $(".buttons #cancel");
        this.$newButton = $(".buttons #new");
        this.$editButton = $(".buttons #edit");
        this.$deleteButton = $(".buttons #delete");

        //tabs
        this.tab = 0;
        this.tabRecipes = [-1];

        this.load();
    }

    load = async () => {
        //enable the search bar
        this.$search.on("input", (e) => {
            this.filterRecipes($(e.currentTarget).val());
            this.renderSearchResults();
        });

        //enable entry control buttons
        this.$saveButton.click(this.saveRecipe);
        this.$cancelButton.click(this.cancelRecipe);
        this.$newButton.click(this.newRecipe);
        this.$editButton.click(this.editRecipe);
        this.$deleteButton.click(this.deleteRecipe);

        //load recipes
        await $.get("/forest/eye-of-the-forest/library/recipes/load", (data) => {
            console.log(data);
            this.recipes = data.recipes;
            this.filteredRecipes = this.recipes;
        });
        if (!this.recipes) this.recipes = [];

        this.renderSearchResults();
    }

    renderSearchResults() {
        this.$searchList.empty();

        for (let i = 0; i < this.recipes.length; i++) {
            if (this.recipes[i].name.toLowerCase().includes(this.filter.toLowerCase())) {
                this.$searchList.append(`<li onclick="recipeBrowser.clickRecipe(this, ${i})">${this.filteredRecipes[i].name}</li>`);
            }
        };
        if (this.$searchList.find("li").length < 1) {
            this.$searchList.append(`<p>No Recipes</p>`);
        }
    }

    saveRecipe = async () => {
        //compile ingredients list
        let ing = [];
        let $ingredients = this.$editIngredientList.find("li");
        for (let i = 0; i < $ingredients.length; i++) {
            ing.push({
                amount: $($ingredients[i]).find("#amount").val(),
                measure: $($ingredients[i]).find("#measure").val(),
                ingredient: $($ingredients[i]).find("#ingredient").val()
            });
        }

        //compile directions list
        let dir = [];
        let $directions = this.$editDirectionsList.find("li input");
        for (let i = 0; i < $directions.length; i++) {
            dir.push($($directions[i]).val());
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

        console.log(this.recipes[currentRecipe]);

        try {
            //save to db
            await $.post("/forest/eye-of-the-forest/library/recipes/save", { recipes: this.recipes }, () => {
                console.log("Recipes Saved!");
                this.cancelRecipe();
                this.renderSearchResults();
            });
        } catch(err) {
            console.log(err);
        }
    }

    newRecipe = () => {
        this.tabRecipes[this.tab] = -1;
        this.$read.addClass("invisible");
        this.$edit.removeClass("invisible");

        this.$saveButton.removeClass("invisible");
        this.$cancelButton.removeClass("invisible");
        this.$newButton.addClass("invisible");
        this.$editButton.addClass("invisible");
        this.$deleteButton.addClass("invisible");
    }

    editRecipe = () => {
        this.$read.addClass("invisible");
        this.$edit.removeClass("invisible");

        this.$saveButton.removeClass("invisible");
        this.$cancelButton.removeClass("invisible");
        this.$newButton.addClass("invisible");
        this.$editButton.addClass("invisible");
        this.$deleteButton.addClass("invisible");
    }

    cancelRecipe = () => {
        this.$edit.addClass("invisible");
        this.$read.removeClass("invisible");

        this.$editName.val("");
        this.$editImage.val("");
        this.$editSource.val("");
        this.$editIngredientList.empty();
        this.$editIngredientList.append(`<h6>Ingredients:</h6>`);
        this.$editIngredientList.append(`<li class="new">
            <input type="number" id="amount" placeholder="1">
            <input type="text" id="measure" placeholder="tbsp">
            <input type="text" id="ingredient" placeholder="carrots">
            <button onclick="recipeBrowser.addIngredient()">+</button>
            <button onclick="recipeBrowser.deleteIngredient(0)">X</button>
        </li>`);
        this.$editDirectionsList.empty();
        this.$editDirectionsList.append(`<h6>Directions:</h6>`);
        this.$editDirectionsList.append(`<li class="new">
        <input type="text" placeholder="directions go here">
        <button onclick="recipeBrowser.addDirection()">+</button>
        <button onclick="recipeBrowser.deleteDirection(0)">X</button>
    </li>`);

        this.$saveButton.addClass("invisible");
        this.$cancelButton.addClass("invisible");
        this.$newButton.removeClass("invisible");
        this.$editButton.removeClass("invisible");
        this.$deleteButton.removeClass("invisible");
    }

    deleteRecipe = async () => {

    }

    readRecipe = (index) => {
        this.tabRecipes[this.tab] = index;
        let currentRecipe = this.getSelectedRecipe();
        this.$readName.text(currentRecipe.name);
        this.$readImage.attr("src", currentRecipe.img);
        this.$readSource.text("From " + currentRecipe.source);
        this.$readIngredientList.empty();
        this.$readIngredientList.append(`<h6>Ingredients:</h6>`);
        for (let i = 0; i < currentRecipe.ingredients.length; i++) {
            this.$readIngredientList.append(`<li>
                <p class="amount">${currentRecipe.ingredients[i].amount}</p>
                <p class="measure">${currentRecipe.ingredients[i].measure}</p>
                <p class="ingredient">${currentRecipe.ingredients[i].ingredient}</p>
            </li>`);
        }
        this.$readDirectionsList.empty();
        this.$readDirectionsList.append(`<h6>Directions:</h6>`);
        for (let i = 0; i < currentRecipe.directions.length; i++) {
            this.$readDirectionsList.append(`<li>${currentRecipe.directions[i]}</li>`);
        }
    }

    getSelectedRecipe() {
        if (this.tabRecipes[this.tab] < 0) return null;
        return this.recipes[this.tabRecipes[this.tab]];
    }

    // selectRecipe(index) {
    //     this.$searchResults = this.$searchList.find("li");
    //     this.$searchResults.removeClass("selected");

    //     if (index > -1) {
    //         $(this.$searchResults[index]).addClass("selected");
    //     }
    // }

    clickRecipe = (element, index) => {
        this.$searchResults = this.$searchList.find("li");
        this.$searchResults.removeClass("selected");

        if (index > -1) {
            $(element).addClass("selected");
            this.readRecipe(index);
        }
    }
}