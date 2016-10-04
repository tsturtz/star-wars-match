var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;

function card_clicked() {
    console.log('card_clicked called');

    first_card_clicked = this;

    if (first_card_clicked == null){

    }
}

$(document).ready(function(){
    $('.card').click(card_clicked);
});