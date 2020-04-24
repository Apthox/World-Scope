$(document).ready(function() {
    console.log("Hello World!");

    let timer = undefined;
    let coords = undefined;

    // time : seconds allowed to play in round
    function init_timer(time) {
        console.log("Init Timer Called!")

        // set dom element to total time
        $("#time-val").text(time);

        timer = setInterval(tick_timer, 1000);
    }

    function tick_timer() {

        let val = parseInt($("#time-val").text());
        $("#time-val").text(val - 1);
        console.log("Ticking Timer!");

        if (val <= 0) {
            clearInterval(timer);
            $("#time-val").text("Time Up");
            timer_ended();
        }
    }

    function timer_ended() {
        console.log("Timer Over!!");
    }

    function get_question() {
        let data = {
            "coords": {
                "latitude": 129,
                "longitude": -30
            },
            "locations": [
                "France",
                "Germany",
                "United States",
                "United Kingdom"
            ],
            "Hint": "Known as the city of love"
        }

        coords = data["coords"];

        return data;
    }

    function send_answer(respInput) {
        // send 
        //set resp to respInput
        let resp = {
            "location": respInput,
            "coords": coords
        }

        // TODO: Get actual response 
        return {
            "wasCorrect": resp["location"] == "France",
            "answer": "France"
        };
    }

    function buttonRename() {
        let data = get_question();
        let buttons = $(".ans-btn").toArray();
        for (let i = 0; i < 4; i++) {
            $(buttons[i]).text(data["locations"][i]);
        }
        $("#modalBody").text(data["Hint"]);
    }

    function assignEvents() {
        let buttons = $(".ans-btn").toArray();
        for (let i = 0; i < 4; i++) {
            $(buttons[i]).on("click", answer);
        }
    }

    function answer(e) {
        console.log(e);
        let target = e.currentTarget;
        console.log("Answered > " + $(target).text());
        if (send_answer($(target).text(), coords)["wasCorrect"]) {
            success()
        } else {
            failed()
        }
    }

    function success() {
        alert("Correct!");
        window.location.replace("./game")
    }

    function failed() {
        alert("Wrong!")
        window.location.replace("./leaderboard")
    }

    function init() {
        console.log("Init Called!");
        init_timer(60);
        $("#points-val").text("0");
        buttonRename();
        assignEvents();
    }

    init();
});