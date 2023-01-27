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

        //tabs
        this.tab = 0;
        this.tabRecipes = [-1];

        this.load();
    }

    load = async () => {
        //load recipes
        let loadedData = await base.load("recipes");
        if (!loadedData.recipes) this.recipes = [];
        else this.recipes = loadedData.recipes;

        this.renderSearchResults();

        //enable the search bar
        this.$search.on("input", (e) => {
            this.filter = $(e.currentTarget).val();
            this.renderSearchResults();
        });
    }

    renderSearchResults() {
        this.$searchList.empty();

        for (let i = 0; i < this.recipes.length; i++) {
            if (this.recipes[i].name.toLowerCase().includes(this.filter.toLowerCase())) {
                this.$searchList.append(`<li onclick="recipeBrowser.clickRecipe(this, ${i})">
                    ${this.recipes[i].name}
                    <button onclick="recipeBrowser.deleteRecipe(${i})">X</button>
                </li>`);
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

    newRecipe = () => {
        this.tabRecipes[this.tab] = -1;
        
        this.editRecipe();
    }

    editRecipe = () => {
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

    renderEditIngredients(ingredients) {
        this.$editIngredientList.empty();
        this.$editIngredientList.append(`<h6>Ingredients:</h6>`);
        for (let i = 0; i < ingredients.length; i++) {
            this.$editIngredientList.append(`<li>
                <input type="number" id="amount" placeholder="1" value="${ingredients[i].amount}">
                <input type="text" id="measure" placeholder="tbsp" value="${ingredients[i].measure}">
                <input type="text" id="ingredient" placeholder="carrots" value="${ingredients[i].ingredient}">
                <button onclick="recipeBrowser.addIngredient(${i})">+</button>
                <button onclick="recipeBrowser.deleteIngredient(${i})">X</button>
            </li>`);
        }
        this.$editIngredientList.append(`<li class="new">
            <input type="number" id="amount" placeholder="1">
            <input type="text" id="measure" placeholder="tbsp">
            <input type="text" id="ingredient" placeholder="carrots">
            <button onclick="recipeBrowser.addIngredient(${ingredients.length})">+</button>
            <button onclick="recipeBrowser.deleteIngredient(${ingredients.length})">X</button>
        </li>`);
    }

    renderEditDirections(directions) {
        this.$editDirectionsList.empty();
        this.$editDirectionsList.append(`<h6>Directions:</h6>`);
        for (let i = 0; i < directions.length; i++) {
            this.$editDirectionsList.append(`<li class="new">
                <input type="text" placeholder="directions go here" value="${directions[i]}">
                <button onclick="recipeBrowser.addDirection(${i})">+</button>
                <button onclick="recipeBrowser.deleteDirection(${i})">X</button>
            </li>`);
        }
        this.$editDirectionsList.append(`<li class="new">
            <input type="text" placeholder="directions go here">
            <button onclick="recipeBrowser.addDirection(${directions.length})">+</button>
            <button onclick="recipeBrowser.deleteDirection(${directions.length})">X</button>
        </li>`);
    }

    addIngredient = (under) => {
        let l = this.$editIngredientList.find("li").length;
        this.$editIngredientList.append(`<li class="new">
            <input type="number" id="amount" placeholder="1">
            <input type="text" id="measure" placeholder="tbsp">
            <input type="text" id="ingredient" placeholder="carrots">
            <button onclick="recipeBrowser.addIngredient(${l})">+</button>
            <button onclick="recipeBrowser.deleteIngredient(${l})">X</button>
        </li>`);
    }

    deleteIngredient = (which) => {
        let ing = [];
        let $ingredients = this.$editIngredientList.find("li");
        for (let i = 0; i < $ingredients.length; i++) {
            if ($($ingredients[i]).find("#ingredient").val() != "" && i != which) {
                ing.push({
                    amount: $($ingredients[i]).find("#amount").val(),
                    measure: $($ingredients[i]).find("#measure").val(),
                    ingredient: $($ingredients[i]).find("#ingredient").val()
                });
            }
        }

        this.renderEditIngredients(ing);
    }

    addDirection = (under) => {
        let l = this.$editDirectionsList.find("li").length;
        this.$editDirectionsList.append(`<li class="new">
            <input type="text" placeholder="directions go here">
            <button onclick="recipeBrowser.addDirection(${l})">+</button>
            <button onclick="recipeBrowser.deleteDirection(${l})">X</button>
        </li>`);
    }

    deleteDirection(which) {
        let dir = [];
        let $directions = this.$editDirectionsList.find("li input");
        for (let i = 0; i < $directions.length; i++) {
            if ($($directions[i]).val() != "" && i != which) dir.push($($directions[i]).val());
        }

        this.renderEditDirections(dir);
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

        this.readRecipe();
    }

    deleteRecipe = async (which) => {
        this.recipes.splice(which, 1);

        await base.do("save-recipes", {
            recipes: this.recipes
        });
        
        this.tabRecipes[this.tab] = -1;
        this.cancelRecipe();
        this.renderSearchResults();
    }

    readRecipe = (index = this.tabRecipes[this.tab]) => {
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

    getSelectedRecipe() {
        if (this.tabRecipes[this.tab] < 0) return null;
        return this.recipes[this.tabRecipes[this.tab]];
    }

    clickRecipe = (element, index) => {
        this.$searchResults = this.$searchList.find("li");
        this.$searchResults.removeClass("selected");

        if (index > -1) {
            $(element).addClass("selected");
            this.readRecipe(index);
        }
    }
}