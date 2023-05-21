class Foldable {
    constructor($content, folded = true) {
        this.$content = $content;
        this.folded = folded;
        this.folded ? this.fold() : this.unfold();
        this.$button = null;
    }

    fold() {
        this.folded = true;
        this.$content.addClass("invisible");
    }

    unfold() {
        this.folded = false;
        this.$content.removeClass("invisible");
    }

    toggle(button = null) {
        this.folded = !this.folded;
        this.folded ? this.fold() : this.unfold();
        if (button) {
            this.$button = $(button);
            this.folded ? this.$button.text("v") : this.$button.text("^");
        }
    }
}