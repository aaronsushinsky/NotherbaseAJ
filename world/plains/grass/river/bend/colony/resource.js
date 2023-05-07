class Resource {
    constructor($parent, resource = null) {
        this.type = resource?.type;
        this.amount = resource?.amount;

        this.$div = $(`<div class="resource"><h6>${this.type??"No Type"}:${this.amount}</h6></div>`);
        $parent.append(this.$div);
    }
}