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