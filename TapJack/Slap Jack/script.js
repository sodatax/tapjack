/*
- force alternate turns
- 2 turn jack cooldown if jack button pressed too early
*/

let deck = []; //global variable for the deck
let player_one_deck = [];
let player_two_deck = [];
let card_pile = []; //will store the cards placed in the pile
let jack = 0; //stops card placement if jack is in play
let remove_card = 0; //checks if the first card was in play
let canTapJack = false; //allows you to tap jack only when jack is in play

//gets the names of the players and displays them 
function getPlayerNames(){
    player_one = document.getElementById("player_one_name").value;
    player_two = document.getElementById("player_two_name").value;
    document.getElementById("player_one_name").hidden=true;
    document.getElementById("player_two_name").hidden=true;
    document.getElementById("p1").innerHTML = "";
    document.getElementById("p2").innerHTML = "";
}

//assigns a number value to each card
/* Number Values to Card
1 - Ace
2 to 10 - 2/3/4/5/6/7/8/9/10
11 - Jack
12 - Queen
13 - King
*/
function createDeck(){
    while(deck.length < 52){
        random_nums = Math.floor(Math.random()*(13)+1); //random number 1-13
        deck.push(random_nums); //pushes random number to "deck" arr

        count_ace = deck.filter(num => num === 1).length; //counts the number of that card
        count_two = deck.filter(num => num === 2).length;
        count_three = deck.filter(num => num === 3).length;
        count_four = deck.filter(num => num === 4).length;
        count_five = deck.filter(num => num === 5).length;
        count_six = deck.filter(num => num === 6).length;
        count_seven = deck.filter(num => num === 7).length;
        count_eight = deck.filter(num => num === 8).length;
        count_nine = deck.filter(num => num === 9).length;
        count_ten = deck.filter(num => num === 10).length;
        count_jack = deck.filter(num => num === 11).length;
        count_queen = deck.filter(num => num === 12).length;
        count_king = deck.filter(num => num === 13).length;

        if(count_ace > 4){ //removes the last number in deck if there is four of that card
            deck.pop();
        }
        else if(count_two > 4){
            deck.pop();
        }
        else if(count_three > 4){
            deck.pop();
        }
        else if(count_four > 4){
            deck.pop();
        }
        else if(count_five > 4){
            deck.pop();
        }
        else if(count_six > 4){
            deck.pop();
        }
        else if(count_seven > 4){
            deck.pop();
        }
        else if(count_eight > 4){
            deck.pop();
        }
        else if(count_nine > 4){
            deck.pop();
        }
        else if(count_ten > 4){
            deck.pop();
        }
        else if(count_jack > 4){
            deck.pop();
        }
        else if(count_queen > 4){
            deck.pop();
        }
        else if(count_king > 4){
            deck.pop();
        }
    }
}

//splits the deck in half for both players
function halfDeck(){
    for(let i=1; i<=26; i++){ //assigns player one's deck
        player_one_deck.push(deck[i]);
    }
    for(let i=0; i<=26; i++){ //assigns player two's deck
        player_two_deck.push(deck[deck.length-i]);
    }
    player_two_deck.shift(); //halving deck creates an undefined value for player two. Removes the undefined value.

    //shows the initial split of cards
    document.getElementById("player_one_cards").innerHTML = player_one + "'s Cards Remaining: " + player_one_deck.length;
    document.getElementById("player_two_cards").innerHTML = player_two + "'s Cards Remaining: " + player_two_deck.length;
}

//places a card on the "table" and keeps track of the pile. Also checks for jack and specific win condition
function placeCard(arr){
    
    document.getElementById("card").innerHTML = "";
    
    card_pile.push(arr[0]); //adds the card placed on the table into a new arr called card_pile (aka pile) to keep track of cards on the table
    
    //next 4 lines show the card in the program
    image = document.createElement("img"); 
    image_path = "img/" + arr[0] + ".jpg";
    image.src = image_path;
    document.getElementById("card").appendChild(image);
    
    arr.shift(); //removes the card from arr once added to the pile

    if(card_pile[card_pile.length-1]===11){
        tapJack();
    }

    canTapJack = card_pile[card_pile.length-1]===11;

    document.getElementById("card_pile_amt").innerHTML = "Cards in Pile: " + card_pile.length;
    document.getElementById("player_one_cards").innerHTML = "Player One Cards Remaining: " + player_one_deck.length;
    document.getElementById("player_two_cards").innerHTML = "Player Two Cards Remaining: " + player_two_deck.length;

    if (player_two_deck.length === 0 && card_pile[card_pile.length - 1] !== 11) {
        document.getElementById("winner").innerHTML = player_one + " won!";
        window.alert(player_one + " won!")
    }
    
    if (player_one_deck.length === 0 && card_pile[card_pile.length - 1] !== 11) {
        document.getElementById("winner").innerHTML = player_two + " won!";
        window.alert(player_two + " won!")
    }

}

//taps Jack using "W" or "]"
function tapJack(){
    document.addEventListener("keydown", function(event){
        if(!canTapJack) return; //if canTapJack is not false, can tapJack

        if(event.key.toLowerCase() == "w"){ //checks if the "W" key is pressed
            for(let i=0; i<=card_pile.length;i++){
                player_one_deck.push(card_pile[i]); //removes all cards from pile and puts it in players deck
            }
            card_pile = [];
            player_one_deck.pop(); //removes empty number at end of arr
            document.getElementById("card").innerHTML = ""; //removes cards from table
            document.getElementById("p1_jack").click(); //clicks an invisible button
            document.getElementById("card_pile_amt").innerHTML = "Cards in Pile: " + card_pile.length; //resets the cards in pile
            document.getElementById("player_one_cards").innerHTML = player_one + "'s Cards Remaining: " + player_one_deck.length; //shows how many cards the player has

            canTapJack = false; //resets canTapJack
            gameWinner(); //can tell if you win
        }
        
        //same as last if statement but for player 2
        else if(event.key.toLowerCase() == "]"){ 
            for(let i=0; i<=card_pile.length;i++){
                player_two_deck.push(card_pile[i]);
            }
            card_pile = [];
            player_two_deck.pop();
            document.getElementById("card").innerHTML = "";
            document.getElementById("p2_jack").click();
            document.getElementById("card_pile_amt").innerHTML = "Cards in Pile: " + card_pile.length;
            document.getElementById("player_two_cards").innerHTML = player_two + "'s Cards Remaining: " + player_two_deck.length;

            canTapJack = false;
            gameWinner();
        }
    });  
}

//determines if there is a winner
function gameWinner(){
    if (player_one_deck.length === 52) {
        document.getElementById("winner").innerHTML = player_one + " won!";
        window.alert(player_one + " won!")
    }

    if (player_two_deck.length === 52) {
        document.getElementById("winner").innerHTML = player_two + " won!";
        window.alert(player_two + " won!")
    }
    
}

//Places a card using "Q" or "["
function placeCardKey(){
    document.addEventListener("keydown", function(event){
        if(canTapJack) return;

        if(event.key.toLowerCase() == "q"){ //checks if the "Q" key is pressed
            document.getElementById("p1_place").click(); //uses an invisible button - placeCard function
        }
        else if(event.key.toLowerCase() == "["){ //checks if the "Q" key is pressed
            document.getElementById("p2_place").click(); //uses an invisible button - placeCard function
        }
    });
}

//starts the game
function startGame(element){
    element.hidden=true; //hides the button after start
    
    getPlayerNames(this); //"(this)" is to hide the text input 
    createDeck();
    halfDeck();

    //can place cards if there is no jack
    if(card_pile[card_pile.length-1]!=11){
        placeCardKey();
    }
    
}

//can test to make sure certain arrays work
function tester(){
    document.getElementById("tester").innerHTML = player_two_deck.length;
}

