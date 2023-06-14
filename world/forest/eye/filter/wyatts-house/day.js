class Day {
    constructor () {
        this.$div = null;
    }

    render = () => {
        this.$div = $(`<article class="day" id="${}"></article>`);
    }
}

{/* <div class="day" id="0">
    <h4 class="date">Today: Friday, June 9th 2023</h4>
    <div class="weather">
        The weather outside.
    </div>
    <div class="billboard" id="today"></div>
    <ul class="schedule">
        <li>
            <h4>Appointment</h4>
            <p>12:00</p>
            <p>Details...</p>
        </li>
    </ul>
</div> */}