class Foldable {
    constructor($content, folded = true) {
        this.$content = $content;
        this.folded = folded;
        this.folded ? this.fold() : this.unfold();
    }

    fold() {
        this.folded = true;
        this.$content.addClass("invisible");
    }

    unfold() {
        this.folded = false;
        this.$content.removeClass("invisible");
    }

    toggle() {
        this.folded = !this.folded;
        this.folded ? this.fold() : this.unfold();
    }
}