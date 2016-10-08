var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var matches = 0; //Every time the application finds a match this variable should be incremented by 1
var attempts = 0; //Every time a user attempts a match (clicks the 2nd card) the attempts should be incremented by 1
var accuracy = 0; //Accuracy is defined as a percentage of matches / attempts
var games_played = 0; //When the page is loaded a new global variable should be defined called games_played. When the game is reset by clicking the reset button the games_played should be incremented by 1.

var images_array = [
    'https://images-na.ssl-images-amazon.com/images/I/411X3hGkeaL._SY300_.jpg', //r2d2
    'https://s-media-cache-ak0.pinimg.com/564x/8a/db/3f/8adb3fb7f97b05371256bba58ebbde14.jpg', //obiwan
    'https://static1.squarespace.com/static/55bdd8e1e4b003dc5b7da717/5628c641e4b0629aedbd315b/5628c646e4b02a1b09bf0d2f/1445512774751/C-3PO-See-Threepio_68fe125c.jpeg?format=300w', //c3po
    'https://s-media-cache-ak0.pinimg.com/564x/f5/a6/d5/f5a6d59d715b1e416d41d5a17040e553.jpg', //gonk droid
    'http://i.imgur.com/QhLHu0z.jpg', //imperial probe droid
    'http://www.absolutehobbyz.com/thumbnail.asp?file=assets/images/obxr001usa.jpg&maxx=300&maxy=0', //bb8
    'http://orig08.deviantart.net/8440/f/2012/080/b/c/profile_picture_by_cw_b1_droid-d4tijnk.jpg', //prequel droid
    'http://3dsmolier.com/media/cache/a6/69/a669febde530392f3767698682fe7a8d.jpg', //mouse droid
    'https://duckduckgo.com/i/35ae1b25.jpg' //r4
];

var all_images = images_array.concat(images_array);
console.log(all_images);
while (all_images.length){
    i = Math.floor(Math.random()*all_images.length);
    all_images.splice(i,1);
    console.log('New image : ' + all_images[i]);
}

function display_stats() {
    accuracy_percentage = accuracy + '%';
    $('.games-played .value').text(games_played);
    $('.attempts .value').text(attempts);
    $('.accuracy .value').text(accuracy_percentage);
}

function reset_stats() {
    accuracy = 0;
    matches = 0;
    match_counter = 0;
    attempts = 0;
    display_stats();
}

function card_clicked() {
    console.log('card_clicked called');
    $(this).hide(); //Reveals card by hiding 'back' image
    if (first_card_clicked === null) {
        console.log('card is null');
        first_card_clicked = this; //Stores the click event in a variable
    } else {
        console.log('card is not null');
        attempts++; //Two cards clicked counts as one attempt
        second_card_clicked = this; //Stores the click event in a variable
        if ($(first_card_clicked).parent().find('.front img').attr('src') == $(second_card_clicked).parent().find('.front img').attr('src')) {
            console.log('there is a match');
            matches++;
            match_counter++;
            first_card_clicked = null;
            second_card_clicked = null;
            if (match_counter == total_possible_matches) {
                var win_screen = $('<div>').addClass('win-screen');
                var win_h1 = $('<h1>').text('You win!');
                var win_reset = $('<a>').addClass('reset').text('Play Again!');
                $('.game_inner').append(win_screen);
                $('.win-screen').append(win_h1);
                $('.win-screen').append(win_reset);
                $('.reset').click(reset_button);
            }
        } else {
            $('.back').unbind(); //Disables the click event handler for the duration of flip_back
            setTimeout(flip_back, 2000); //Sets a delay for how long an unmatched pair will remain visible before flipping back over
        }
    }
    accuracy = matches / attempts * 100;
    accuracy = accuracy || 0;
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

function reset_button() {
    games_played++;
    reset_stats();
    display_stats();
    $('.win-screen').remove(); //Hides the win screen if it's active
    $('.back').show(); //Flips all cards to starting position
}

$(document).ready(function () {
    $('.back').click(card_clicked);
    reset_stats();
    $('.reset').click(reset_button);
});