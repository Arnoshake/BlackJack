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
function displayCardImage(card){
    if (!card || !card.Suit || !card.Value) return "";
    const suitInitial = card.Suit[0];
    const valueInitial = card.Value;
    const fileName = suitInitial + valueInitial + ".jpg"
    const imagePath = "images/Snoopy-Cards/" + fileName;
    return `<img src= "${imagePath}" alt="${valueInitial} of ${card.Suit}" class= "card-image">`
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

        let userJack = 0;
        let botJack = 0;
        if (this.dealerHand[0].Value == "A" && (this.dealerHand[1].Value == "J" || this.dealerHand[1].Value == "Q" || this.dealerHand[1].Value == "K") || 
            (this.dealerHand[1].Value == "A" && (this.dealerHand[0].Value == "J" || this.dealerHand[0].Value == "Q" || this.dealerHand[0].Value == "K")) ){
                this.isGameOver = true;
                this.updateDisplay();
                botJack = 1;
            }
        if (this.playerHand[0].Value == "A" && (this.playerHand[1].Value == "J" || this.playerHand[1].Value == "Q" || this.playerHand[1].Value == "K") || 
            (this.playerHand[1].Value == "A" && (this.playerHand[0].Value == "J" || this.playerHand[0].Value == "Q" || this.playerHand[0].Value == "K")) ){
                this.isGameOver = true;
                this.updateDisplay();
                userJack = 1;  
            }
        if (userJack == 1 && botJack == 1){
            this.updateDisplay();
            this.showResult("Push!");
            return;
        }
        else if (userJack == 1){
            this.updateDisplay();
            this.showResult("The player has Black Jack!");
            return;
        }
        else if (botJack){
            this.updateDisplay();
            this.showResult("The dealer has Black Jack!");
            return;
        }
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
            //this will never happen because it exits early at the event's occurance
            return "Dealer";
        }
        else if (robotSum > 21){
            return "Player";
        }
        else if (robotSum == userSum){
            console.log("The final sums are identical");
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
        let message = null;
        if (winner == "Push"){
            message = "Push!";
        }
        else{
            message = `The ${winner} has won this round!`;
        }
        this.showResult(message);

        this.updateDisplay();
    },
    showResult: function(message){
        console.log("Game Over: ", message);
        this.isGameOver = true;
        this.updateDisplay();
        //timeout allows for the updateDisplay to take place before the alert interupts the process
        setTimeout(() => {
        alert(message);
        
    }, 150); // ~1 frame delay is usually enough
    },
    updateDisplay: function() {
    const dealerDisplay = document.querySelectorAll(".card-display")[0];
    if (this.isGameOver){
        dealerDisplay.innerHTML = `DEALER CARDS: `+
    this.dealerHand.map(displayCardImage).join("") + "<br> SUM: " + this.calculateSum(this.dealerHand);
    }
    else{
        dealerDisplay.innerHTML = `DEALER CARDS: <img src = "images/Snoopy-Cards/back.jpg" class = "card-image">, ` +
    this.dealerHand.slice(1).map(displayCardImage).join("") + "<br> SUM: " + this.calculateSum(this.dealerHand.slice(1));
    }
        


    const playerDisplay = document.querySelectorAll(".card-display")[1];
    playerDisplay.innerHTML = "USER CARDS: " + this.playerHand.map(displayCardImage).join("") + "<br>" +
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