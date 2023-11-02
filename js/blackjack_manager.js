//Blackjack oop

let game = null;
let cartaDealer = 0;
let cartaPlayer = 0;

function debug(an_object) {
    document.getElementById("debug").innerHTML = JSON.stringify(an_object);
}

function buttons_initialization() {
    document.getElementById("card").disabled = false;
    document.getElementById("stand").disabled = false;
    document.getElementById("new_game").disabled = true;
}

function finalize_buttons() {
    document.getElementById("card").disabled = true;
    document.getElementById("stand").disabled = true;
    document.getElementById("new_game").disabled = false;
}


//FUNÇÕES QUE DEVEM SER IMPLEMENTADAS PELOS ALUNOS
function new_game() {
    game = new BlackJack();

    document.getElementById("Winner").innerHTML = null;

    cartaDealer = 0;
    cartaPlayer = 0;

    document.getElementById("dealer").innerHTML = "";
    document.getElementById("player").innerHTML = "";

    game.dealer_move();
    game.dealer_move();
    game.player_move();

    update_player(game.get_dealer_cards());
    
    buttons_initialization();

    const dealerFirstCardValue = game.get_cards_value([game.get_dealer_cards()[0]]);
    document.getElementById("dealer-score").textContent = dealerFirstCardValue;

    createimg(game.get_dealer_cards()[cartaDealer], "dealer", true);
    cartaDealer++;
    createimg(game.get_dealer_cards()[cartaDealer], "dealer", false);
    cartaDealer++;
    createimg(game.get_player_cards()[cartaPlayer], "player", true);
    cartaPlayer++;

    update_dealer(game.get_game_state());
    
    //debug(game);
}

function update_dealer(state) {
    createimg(game.get_dealer_cards()[cartaDealer], "dealer", true);
    cartaDealer++;

    if (state.gameEnded) {
        let str = nameImage(game.get_dealer_cards()[1], true);
        document.getElementsByClassName("hiddenCard")[0].src = str;
        
        if (state.dealerWon) {
            document.getElementById("Winner").innerHTML = "Dealer ganhou!";
        } 
        else{
            document.getElementById("Winner").innerHTML = "Player ganhou!";
        }
        finalize_buttons();
    }
    document.getElementById("dealer-score").textContent = game.get_cards_value(game.get_dealer_cards());
}

function update_player(state) {
    createimg(game.get_player_cards()[cartaPlayer], "player", true);
    cartaPlayer++;

    if (state.gameEnded) {
        if (!state.dealerWon) {
            document.getElementById("Winner").innerHTML = "Player Ganhou!";
        } 
        if(state.playerBusted){
            document.getElementById("Winner").innerHTML = "Player Rebentou!";
        }
        finalize_buttons();
    }
    document.getElementById("player-score").textContent = game.get_cards_value(game.get_player_cards());
}

function dealer_new_card() {
    game.dealer_move();
    update_dealer(game.get_game_state());
    return game.state;
}

function player_new_card() {
    game.player_move();
    update_player(game.get_game_state());
    return game.state;
}

function dealer_finish() {
    game.setDealerTurn(true);
    while(!game.state.gameEnded && game.dealerTurn){
        dealer_new_card();
    }
    //debug(game);
}

function createimg (card, id, show){
    let Cartapng = document.createElement("img");
    if(show){
        Cartapng.src = nameImage(card, show);
        Cartapng.className = "showCard";
    }else{
        Cartapng.src = nameImage(card, show);
        Cartapng.className = "hiddenCard";
    }
    document.getElementById(id).append(Cartapng);
}

function nameImage (card, show){
    let gap = card.split("_");
    let value = parseInt(gap[0]);
    let naipe = gap[1];

    let src = "img/png/";

    if (show) {
        if (value === 1) { // Ás
            src += "ace";
        } else if (value === 11) { // Valete
            src += "jack";
        } else if (value === 12) { // Dama
            src += "queen";
        } else if (value === 13) { // Rei
            src += "king";
        } else {
            src += value;
        }

        src += "_of_" + naipe + ".png";
    } else {
        src = "img/png/card_back.png";
    }

    return src;
}