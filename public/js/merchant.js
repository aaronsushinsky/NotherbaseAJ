class Merchant {
    constructor() {
        this.stalls = {};      
        this.currency = 0; 
        this.currencyType = "Gold Coin";
    }

    addStall(which) {
        // items: [{
        //     item: item,
        //     price: per,
        //     amount: left
        // }]
        this.stalls[which] = {
            $div: $(`.merchant#${which}`),
            items: []
        };
    }

    addCurrency(amount) {
        this.currency += amount;
    }

    addItem = async (itemName, price, stall, amount = 1) => {
        let gotItem = null;
        await $.get("/item", { name: itemName}, (res) => {
            gotItem = res.foundItem
        });

        if (this.stalls[stall]) {
            this.stalls[stall].items.push({
                item: gotItem,
                price: price,
                amount: amount
            });
        }

        this.render(stall);
    }

    removeItem(which, stall, amount = -1) {

        this.render(stall);
    }

    buyItem = async (which, stall, amount = 1) => {
        if (playerInventory.hasItem(this.currencyType, this.stalls[stall].items[which].price * amount)) {
            await playerInventory.change(this.currencyType, -this.stalls[stall].items[which].price * amount);
            await playerInventory.change(this.stalls[stall].items[which].item.name, amount)
        }
        else console.log(`Insufficient ${this.currencyType}`);

        this.render(stall);
    }

    sellItem(which, stall, amount = 1) {
        if (playerInventory.hasItem(this.stalls[stall].items[which].item.name)) {
            playerInventory.change(this.stalls[stall].items[which].item.name, amount);
        }
        this.render(stall);
    }

    render(stall) {
        this.stalls[stall].$div.empty();

        this.stalls[stall].$div.append(`<h4>Merchant: ${this.currency} Gold</h4>`);

        for (let i = 0; i < this.stalls[stall].items.length; i++) {
            this.stalls[stall].$div.append(`<div class="merchant-item">
                <h5>${this.stalls[stall].items[i].item.name}</h5>
                <p>${this.stalls[stall].items[i].price}</p>
                <p>${this.stalls[stall].items[i].amount} Left</p>
                <button onclick="merchant.buyItem(${i}, '${stall}')">Buy</button>
            </div>`);
        }
    }
}

const merchant = new Merchant();