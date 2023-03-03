class Resource extends Entity {
    constructor(resource = null) {
        super();
        this.type = resource?.type;
        this.amount = resource?.amount;
    }

    onBeat() {
        
    }

    onRender = () => `<div class="resource"><h6>${this.type??"No Type"}:${this.amount}</h6></div>`;
}