<%- include("./hill.js"); %>

class Colony {
    constructor($parent, colony = null) {
        this.$div = $(`<div class="colony"><h4>Colony</h4></div>`);
        $parent.append(this.$div);


        if (colony) for (let i = 0; i < colony.hills.length; i++) {
            this.addChild(new Hill(this.$div, colony.hills[i]));
        }     
        else {
            this.$dig = $('<button onclick="">Dig (costs 1 Queen Ant Egg)</button>');
            this.$dig.click(this.dig);
            this.$div.append(this.$dig);
        }
    }

    dig = async () => {
        this.$dig.addClass("invisible");
        let result = await base.do("game/dig-new-hill");
        
        if (result.data) {
            this.addChild(new Hill(this.$div));
        }
        else this.$dig.removeClass("invisible");
    }
}