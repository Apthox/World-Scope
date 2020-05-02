let initialize;

$(document).ready(function() {
    console.log("Hello World!");

    let timer = undefined;
    let coords = undefined;
    let locations = undefined;

    let google_server_ready = false;
    let location_recieved_bool = false;

    function google_maps_ready() {

        alert("Google Maps Ready!");

        google_server_ready = true;

        if (location_recieved_bool) {
            init_google_map(coords[0], coords[1]);
        }
    }

    initialize = google_maps_ready;


    function location_recieved() {
        location_recieved_bool = true;

        if (google_maps_ready) {
            init_google_map(coords[0], coords[1]);
        }
    }


    function init_google_map(latitude, longitude) {
        var panorama;

        var location = {
            lat: latitude,
            lng: longitude
        };

        var panorama = new google.maps.StreetViewPanorama(
            document.getElementById('street'), {
                position: location,
                pov: {
                    heading: 34,
                    pitch: 10
                },
                disableDefaultUI: true
            });
        map.setStreetView(panorama);

    }

    function get_question() {
        $.ajax({
            'url': './getQuestion',
            'type': 'GET',
            'success': question_received,
            'error': function(request, error) {
                alert("Request Failed: " + JSON.stringify(request));
            }
        });
    }

    function question_received(data) {
        coords = data["coords"];
        alert(coords);
        // {latitude: 12.1231, longitude: 12.13123}
        locations = data["locations"];
        alert(locations);
        // ["Figi", "Japan", ...]
        location_recieved();
        buttonRename(data);
        assignEvents();
    }

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
            "location": respInput,
            "coords": coords
        }

        // TODO: Get actual response 
        return {
            "wasCorrect": resp["location"] == "France",
            "answer": "France"
        };
    }

    function buttonRename(data) {
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
        get_question();
    }

    init();
});