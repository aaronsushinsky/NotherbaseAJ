<%- include("./hill.js"); %>

class Colony extends Entity {
    constructor(colony = null) {
        super();

        if (colony) for (let i = 0; i < colony.hills.length; i++) {
            this.addChild(new Hill(colony.hills[i]));
        }

        if (this.children.length < 1) {
            this.$dig = $('<button onclick="">Dig (costs 1 Queen Ant Egg)</button>');
            this.$dig.click(this.dig);
            this.$div.append(this.$dig);
        }
    }

    onRender = () => `<div class="colony"><h4>Colony</h4></div>`;

    dig = async () => {
        this.$dig.addClass("invisible");
        let result = await base.do("game/dig-new-hill");
        
        if (result.data) {
            this.addChild(new Hill());
        }
        else this.$dig.removeClass("invisible");
    }
}