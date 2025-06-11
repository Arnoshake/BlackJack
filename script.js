let suits = ["spades", "diamonds","clubs","hearts"];
let values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];

// DECK FUNCTIONS


//HELPER METHODS FOR VALUE CALCULATION
function getCardValue(card){
    if (!card || !card.Value) return 0;
    if (card.Value == "J" || card.Value == "Q" || card.Value == "K"){
        return 10;
    }
    if (card.Value == "A"){ 
        return 11;
    }
    return parseInt(card.Value);
}

function printCard(card){
    
    let cardRepresentation = "["  + card.Suit[0].toUpperCase() + "" + card.Value + "]";
    return cardRepresentation
}

const Game = {
    deck: [],
    playerHand: [],
    dealerHand: [],
    isGameOver: false,

    startGame: function(){
        this.deck = this.createDeck();
        this.shuffle(this.deck);

        this.playerHand = [];
        this.dealerHand = [];

        this.playerHand.push(this.drawCard(this.deck));
        this.playerHand.push(this.drawCard(this.deck));

        this.dealerHand.push(this.drawCard(this.deck));
        this.dealerHand.push(this.drawCard(this.deck));
        this.isGameOver = false
        this.updateDisplay();
    },
    createDeck: function(){
        let deck = [];
        for (let i = 0; i < suits.length ; i ++){
            for (let j = 0; j < values.length; j++){
                // For every suits, add each value
                let card = {Value: values[j], Suit: suits[i]}; //std::pair equivalent
                deck.push(card);
            }
        }
        return deck;
    },
    shuffle: function(deck){
        for (let i = 0;i < 10000 ; i ++){
        // randomly choose two cards and swap their positions
        let cardOneIndex = Math.floor(Math.random() * deck.length); 
        let cardTwoIndex = Math.floor(Math.random() * deck.length);
        
        let temporaryCard = deck[cardOneIndex];

        deck[cardOneIndex] = deck[cardTwoIndex];
        deck[cardTwoIndex] = temporaryCard;
        }
    return deck;
    },
    drawCard: function( deck){
        if (deck.length === 0) {
        console.error("Tried to draw from an empty deck!");
        return null;
        }
        // take a card from the top of the deck, remove it from the deck
        return deck.pop(); 
    },
    calculateSum: function (hand){
        let sum = 0;
        let aceAcount = 0;
        for ( let i = 0; i < hand.length; i++){
            sum += getCardValue(hand[i]);
            if (hand[i].Value === "A") aceAcount++;
        }
        while (sum >21 && aceAcount >0){
            // since Aces can be either 1 or 11, assume they are 11 unless they would bust the player/dealer
            // have every ace that would put you over instead count as 1
            sum-=10;
            aceAcount--;
        }
        return sum;
    },
    determineWinner: function (userSum, robotSum){
        if (userSum > 21){ //bust!
            return "Dealer";
        }
        else if (robotSum > 21){
            return "Player";
        }
        else if (robotSum == userSum){
            return "Push";
        }
        else{
            if (userSum > robotSum) return "Player";
            else return "Dealer";
        }
    },
    getCardValue: function (card){
    if (!card || !card.Value) return 0;
    if (card.Value == "J" || card.Value == "Q" || card.Value == "K"){
        return 10;
    }
    if (card.Value == "A"){ //FOR RIGHT NOW ASSUME THAT ACES ONLY ARE 11. WILL ADDRESS LATER
        return 11;
    }
    return parseInt(card.Value);
    },
    playerHits: function(){
        if (this.isGameOver) return;

        let newCard = this.drawCard(this.deck);
        if (newCard == null) return;
        this.playerHand.push(newCard);

        if (this.calculateSum(this.playerHand) > 21){

            this.showResult("Game Over: Player has busted!");
        }
        this.updateDisplay();
        
    },
    dealerPlays: function(){
        //dealer stands on 17+
        let dealerSum = this.calculateSum(this.dealerHand);
        while (dealerSum < 16){
            this.dealerHand.push( this.drawCard(this.deck) );
            dealerSum = this.calculateSum(this.dealerHand);
        }
        this.updateDisplay();
        return dealerSum;
    },
    playerStands: function(){
        if (this.isGameOver) return;
        this.isGameOver = true;

        let playerSum = this.calculateSum(this.playerHand);
        let dealerSum = this.dealerPlays(this.dealerHand);
        let winner = this.determineWinner(playerSum,dealerSum);
        this.showResult(winner);

        this.updateDisplay();
    },
    showResult: function(message){
        console.log("Game Over: ", message);
        alert(message);
        this.isGameOver = true;
    },
    updateDisplay: function() {
    const dealerDisplay = document.querySelectorAll(".card-display")[0];
        dealerDisplay.innerHTML = "DEALER CARDS: [??], " +
    this.dealerHand.slice(1).map(printCard).join(", ") + "<br> SUM: " + this.calculateSum(this.dealerHand.slice(1));


    const playerDisplay = document.querySelectorAll(".card-display")[1];
    playerDisplay.innerHTML = "USER CARDS: " + this.playerHand.map(printCard).join(", ") + "<br>" +
                          "SUM: " + this.calculateSum(this.playerHand);
    
}
};

const hitButton = document.getElementById('hitButton');
hitButton.addEventListener('click', function(hitButtonpressed) {
    console.log('Hit Button Clicked!');
    Game.playerHits();
});

const standButton = document.getElementById('standButton').addEventListener('click', function(standButtonPressed) {
    console.log('Stand Button Clicked!');
    Game.playerStands();
});

document.getElementById("restartButton").addEventListener("click", function() {
    console.log('Restart Button Clicked!');
    Game.startGame();
});