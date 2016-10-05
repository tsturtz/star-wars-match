var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;

function card_clicked() {
    console.log('card_clicked called');
    $(this).hide(); //reveals card
    if (first_card_clicked === null) {
        console.log('card is null');
        first_card_clicked = this;
    } else {
        console.log('card is not null');
        second_card_clicked = this;
        if ($(first_card_clicked).parent().find('.front img').attr('src') == $(second_card_clicked).parent().find('.front img').attr('src')) {
            console.log('there is a match');
            match_counter++;
            first_card_clicked = null;
            second_card_clicked = null;
            if (match_counter == total_possible_matches) {
                var h1 = $('<h1>').text('You won!');
                $('.game_inner').append(h1);
            }
        } else {
            setTimeout(flip_back, 2000)
        }
    }
}

function flip_back() {
    //$('.back').show();
    $(first_card_clicked, second_card_clicked).parent().parent().find('.back').show();
    first_card_clicked = null;
    second_card_clicked = null;
}

$(document).ready(function () {
    $('.back').click(card_clicked);
});