var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var matches = 0; //Every time the application finds a match this variable should be incremented by 1
var attempts = 0; //Every time a user attempts a match (clicks the 2nd card) the attempts should be incremented by 1
var accuracy = 0; //Accuracy is defined as a percentage of matches / attempts
var games_played = 0; //When the page is loaded a new global variable should be defined called games_played. When the game is reset by clicking the reset button the games_played should be incremented by 1.

function display_stats(){
    accuracy_percentage = accuracy + '%';
    $('.games-played .value').text(games_played);
    $('.attempts .value').text(attempts);
    $('.accuracy .value').text(accuracy_percentage);
}

function reset_stats(){
    accuracy = 0;
    matches = 0;
    match_counter = 0;
    attempts = 0;
    display_stats();
}

function card_clicked() {
    console.log('card_clicked called');
    $(this).hide(); //reveals card
    if (first_card_clicked === null) {
        console.log('card is null');
        first_card_clicked = this;
    } else {
        console.log('card is not null');
        attempts++;
        second_card_clicked = this;
        if ($(first_card_clicked).parent().find('.front img').attr('src') == $(second_card_clicked).parent().find('.front img').attr('src')) {
            console.log('there is a match');
            matches++;
            match_counter++;
            first_card_clicked = null;
            second_card_clicked = null;
            if (match_counter == total_possible_matches) {
                var h1 = $('<h1>').text('You won!');
                $('.game_inner').append(h1);
            }
        } else {
            $('.back').unbind();
            setTimeout(flip_back, 2000);
        }
    }
    accuracy = matches/attempts * 100;
    accuracy = accuracy.toFixed(2);
    display_stats();
}

function flip_back() {
    $(first_card_clicked).show();
    $(second_card_clicked).show();
    first_card_clicked = null;
    second_card_clicked = null;
    $('.back').click(card_clicked);
}

$(document).ready(function () {
    $('.back').click(card_clicked);
    reset_stats();
    $('.reset').click(function(){
        games_played++;
        reset_stats();
        display_stats();
        $('.back').show();
    });
});