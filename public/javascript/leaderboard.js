$(document).ready(function() {

    function load_leaderboard() {
        console.log("Loading Leaderboard!");
        for (var i = 0; i < leaderboard.length; i++) {
            console.log(leaderboard[i]);
            $("#pos-list").append("<li class='list-group-item'>" + (i + 1) + "</li>");
            $("#name-list").append("<li class='list-group-item'>" + leaderboard[i]["user_id"] + "</li>");
            $("#score-list").append("<li class='list-group-item'>" + leaderboard[i]["points"] + "</li>");
        }
    }


    load_leaderboard();
});