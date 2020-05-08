//let initialize;

$(document).ready(function() {
    console.log("Hello World!");

    let timer = undefined;
    let coords = undefined;
    let locations = undefined;

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

    function send_answer(respInput) {
        // send 
        //set resp to respInput
        let resp = {
            "location": params["stage"]["location"],
            "answer": respInput
        }

        console.log(resp);

        $.ajax({
            type: "POST",
            url: './game',
            data: resp,
            success: function(data) {
                console.log(data);
                if (data["correct"]) {
                    location.reload();
                } else {
                    window.location.replace("./leaderboard");
                }
            }
        });
    }

    function buttonRename(data) {
        let buttons = $(".ans-btn").toArray();
        for (let i = 0; i < 4; i++) {
            $(buttons[i]).text(data[i]);
        }
        $("#modalBody").text(params["stage"]["hint"]);
    }

    function assignEvents() {
        let buttons = $(".ans-btn").toArray();
        for (let i = 0; i < 4; i++) {
            $(buttons[i]).on("click", answer);
        }
    }

    function answer(e) {
        let target = $(this).text();
        console.log("Answered > " + target);
        send_answer(target);
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
        $("#points-val").text(params["points"]);
        buttonRename(params["stage"]["answers"]);
        assignEvents();
    }

    init();
});