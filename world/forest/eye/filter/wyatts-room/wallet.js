class Wallet {
    constructor() {
        this.state = "summary";
        this.$summary = $(".wallet .summary");
        this.$settings = $(".wallet .settings");
    }

    toggleView() {
        if (this.state === "summary") {
            this.$summary.addClass("invisible");
            this.$settings.removeClass("invisible");
            this.state = "settings";
        }
        else {
            this.$settings.addClass("invisible");
            this.$summary.removeClass("invisible");
            this.state = "summary";
        }
    }

    spendMoney() {

    }

    submitIncome() {

    }


}

const wallet = new Wallet();


{/* <div class="wallet conchu invisible">
<h4>Your Wallet</h4>
<div class="summary">
    <div class="spending">
        <h5>Spending Money Left</h5>
        <h6 id="week">This Week: $0</h6>
        <h6 id="month">This Month: $0</h6>
        <input type="text" id="item"><input type="number" id="spend"><button onclick="">Spend</button>
    </div>
    <div class="flow">
        <h5>Cash Flow Last Month</h5>
        <h6 id="income">Made: $0</h6>
        <h6 id="expenses">Spent: $0</h6>
        <h6 id="saved">Saved: $0</h6>
    </div>
</div>
<div class="settings invisible">
</div>
<button onclick="wallet.toggleView()">$$</button>
</div> */}