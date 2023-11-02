//Blackjack object

//constante com o número máximo de pontos para blackJack
const MAX_POINTS = 21;

// Classe BlackJack - construtor
class BlackJack {
    constructor() {

        // array com as cartas do dealer
        this.dealer_cards = [];
        // array com as cartas do player
        this.player_cards = [];
        // variável booleana que indica a vez do dealer jogar até ao fim
        this.dealerTurn = false;

        // objeto na forma literal com o estado do jogo
        this.state = {
            'gameEnded': false,
            'dealerWon': false,
            'playerBusted': false
        };

        //métodos utilizados no construtor (DEVEM SER IMPLEMENTADOS PELOS ALUNOS)
        this.new_deck = function () {
            const val = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
            const naip = ["clubs", "diamonds", "hearts", "spades"];
            let deck = [];

            for (let i = 0; i < naip.length; i++) {
                for (let j = 0; j < val.length; j++) {
                    deck.push(val[j] + "_" + naip[i]);
                }
            }
            //console.log(deck);
            return deck
        };

        this.shuffle = function (deck) {
            const shuffledDeck = [];
            const indexes = [];

            //Criar array de índices de 0 a 51
            for (let i = 0; i < 52; i++) {
                indexes.push(i);
            }

            //Shuffle
            for (let i = 51; i >= 0; i--) {
                const randomIndex = Math.floor(Math.random() * (i + 1));
                const index = indexes[randomIndex];
                shuffledDeck.push(deck[index]);
                indexes.splice(randomIndex, 1);
            }
        
            return shuffledDeck;
        };

        // baralho de cartas baralhado
        this.deck = this.shuffle(this.new_deck());
    }

    // métodos
    // devolve as cartas do dealer num novo array (splice)
    get_dealer_cards() {
        return this.dealer_cards.slice();
    }

    // devolve as cartas do player num novo array (splice)
    get_player_cards() {
        return this.player_cards.slice();
    }

    // Ativa a variável booleana "dealerTurn"
    setDealerTurn(val) {
        this.dealerTurn = val;
    }

    //MÉTODOS QUE DEVEM SER IMPLEMENTADOS PELOS ALUNOS
    get_cards_value(cards) {
        let score = 0;
        let aces = 0;

        for (const card of cards) {
            let gap = card.split("_");
            let valorCarta = gap[0];
            
            if (valorCarta == 1) { //A
                score += 11;
                aces++;
            }else if (valorCarta == 11 || valorCarta == 12 || valorCarta == 13){ //J Q K
                score += 10;
            } else{
                score += parseInt(valorCarta);
            }
            
            while ( score > MAX_POINTS && aces > 0 ) {
                score -= 10;
                aces--;
            }
        }
        return score;
    }

    dealer_move() {
        let drawnCard = this.deck.pop(); //Remover a ultima carta do baralho.
        this.dealer_cards.push(drawnCard); //Adicionar a carta ao array de cartas do dealer.
        return this.get_game_state();
    }

    player_move() {
        let drawnCard = this.deck.pop(); //Remover a ultima carta do baralho.
        this.player_cards.push(drawnCard); //Adicionar a carta ao array de cartas do player.
        return this.get_game_state();
    }

    get_game_state() {
        const playerScore = this.get_cards_value(this.get_player_cards());
        const dealerScore = this.get_cards_value(this.get_dealer_cards());

        const P_WON = playerScore === MAX_POINTS || (this.dealerTurn && playerScore>dealerScore);
        const P_BUSTED = playerScore > MAX_POINTS;

        const D_WON = this.dealerTurn && dealerScore > playerScore && dealerScore <= MAX_POINTS;
        const D_BUSTED = this.dealerTurn && dealerScore > MAX_POINTS;

        this.state.gameEnded = P_WON || P_BUSTED || D_WON || D_BUSTED;
        this.state.playerBusted = P_BUSTED;
        this.state.dealerWon = D_WON;

        return this.state;
    }
}