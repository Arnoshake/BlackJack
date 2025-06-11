

let suits = ["spades", "diamonds","clubs","hearts"];
let values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];

// DECK FUNCTIONS
function createDeck(){
    let deck = [];
    for (let i = 0; i < suits.length ; i ++){
        for (let j = 0; j < values.length; j++){
            // For every suits, add each value
            let card = {Value: values[j], Suit: suits[i]}; //std::pair equivalent
            deck.push(card);
        }
    }
    return deck;
}
function shuffle( deck ){
    for (let i = 0;i < 10000 ; i ++){
        // randomly choose two cards and swap their positions
        let cardOneIndex = Math.floor(Math.random() * deck.length); 
        let cardTwoIndex = Math.floor(Math.random() * deck.length);
        
        let temporaryCard = deck[cardOneIndex];

        deck[cardOneIndex] = deck[cardTwoIndex];
        deck[cardTwoIndex] = temporaryCard;
    }
    return deck;
}
function drawCard( deck ){
    if (deck.length === 0) {
        console.error("Tried to draw from an empty deck!");
        return null;
    }
    // take a card from the top of the deck, remove it from the deck
    return deck.pop(); 
}


//HELPER METHODS FOR VALUE CALCULATION
function getCardValue(card){
    if (!card || !card.Value) return 0;
    if (card.Value == "J" || card.Value == "Q" || card.Value == "K"){
        return 10;
    }
    if (card.Value == "A"){ //FOR RIGHT NOW ASSUME THAT ACES ONLY ARE 11. WILL ADDRESS LATER
        return 11;
    }
    return parseInt(card.Value);
}
function calculateSum(hand){
    let sum = 0;
    for ( let i = 0; i < hand.length; i++){
        sum += getCardValue(hand[i]);
    }
    return sum;
}
function printCard(card){
    
    let cardRepresentation = card.Suit[0].toUpperCase() + " " + card.Value;
    return cardRepresentation
}

//BJ ACTIONS
function hit(hand, deck){
    let newCard = drawCard(deck);
    if (newCard == null) return false;
    
    hand.push(newCard);
    return true;
}
function dealerBehavior(hand,deck){
    let sum = calculateSum(hand);
    console.log("Dealer Sum: ",sum);
    while (sum < 17){
        if (!hit(hand,deck)) break;
        console.log(hand);
        sum = calculateSum(hand);
    }
    return sum;
}
function determineWinner(userSum, robotSum){
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
}
// BJ GAME

// const hitButton = document.getElementById("hit");
//     button.addEventListener('click', function() {
//         console.log("click!");
//     });
// const standButton = document.getElementById("stand");
//     button.addEventListener('click', function() {
//         console.log("click!");
//     });

const hitButton = document.getElementById('hitButton');
hitButton.addEventListener('click', function(hitButtonpressed) {
    console.log('Hit Button Clicked!');
    hitButtonpressed = true;

});

const standButton = document.getElementById('standButton');
standButton.addEventListener('click', function(standButtonPressed) {
    console.log('Stand Button Clicked!');
    standButtonPressed = true;
});

function playBlackJack(){
    console.log("GAME HAS STARTED!")
    let deck = createDeck();
    //double the shuffle!
    shuffle(deck);
    shuffle(deck);

    let playerHand = [];
    let dealerHand = [];
    // deal face up cards
    playerHand.push( drawCard( deck ) );
    dealerHand.push (drawCard( deck ) );
    // deal face down cards (will always be the 2nd card of the array)
    playerHand.push( drawCard( deck ) );
    dealerHand.push (drawCard( deck ) );
    console.log("HANDS ARE CREATED!",deck.length);
    console.log("PLAYER HAND",playerHand);
    console.log("DEALER HAND",dealerHand);
    let cardSum = calculateSum(playerHand);
    
    while (true){
        cardSum = calculateSum(playerHand);
        if (cardSum > 21){
            console.log("PLAYER BUSTS!");
            alert("Player Busts!")
            return;
        }

        let userInput = prompt(`You have ${cardSum}. Would you like to HIT or STAND?`).toLowerCase();
        if (userInput == "stand") break;
        if (userInput == "hit"){
            hit(playerHand,deck);
        }
        else{
            alert("Please enter HIT or STAND");
        }
    }
    console.log("PLAYER HAS CHOSEN TO STAND! ",playerHand);
    console.log("DECK SIZE!",deck.length);
    console.log("PLAYER TOTAL: ",cardSum);

    console.log("Dealer begins turn with:", dealerHand);

     let botSum = dealerBehavior(dealerHand,deck);
    console.log("DEALER HAS CHOSEN TO STAND!", dealerHand);
    console.log("DEALER TOTAL: ",botSum);
    let winner = determineWinner(cardSum,botSum);

    if (winner == "Push"){
        console.log('The round has no winner!');
        alert('The round has no winner!');
        return;
    }
    console.log(`The winner of the round: ${winner}`);
    alert(`The winner of the round: ${winner}`);
    return;

}
function playBlackJackWithButtons(){
    console.log("GAME HAS STARTED!")
    let deck = createDeck();
    //double the shuffle!
    shuffle(deck);
    shuffle(deck);

    let playerHand = [];
    let dealerHand = [];
    // deal face up cards
    playerHand.push( drawCard( deck ) );
    dealerHand.push (drawCard( deck ) );
    // deal face down cards (will always be the 2nd card of the array)
    playerHand.push( drawCard( deck ) );
    dealerHand.push (drawCard( deck ) );
    console.log("HANDS ARE CREATED!",deck.length);
    console.log("PLAYER HAND",playerHand);
    console.log("DEALER HAND",dealerHand);
    let cardSum = calculateSum(playerHand);
    
    let standButtonPressed = false;
    let hitButtonpressed = false;
    while (true){
        cardSum = calculateSum(playerHand);
        if (cardSum > 21){
            console.log("PLAYER BUSTS!");
            alert("Player Busts!")
            return;
        }
        if (standButtonPressed == true){
            alert("Stand has been Pressed!");
            standButtonPressed = false;
            break;
        }
        if (hitButtonpressed == true){
            alert("Hit has been Pressed!");
            hit(playerHand,deck);
            hitButtonpressed = false;

        }
    }
    console.log("PLAYER HAS CHOSEN TO STAND! ",playerHand);
    console.log("DECK SIZE!",deck.length);
    console.log("PLAYER TOTAL: ",cardSum);

    console.log("Dealer begins turn with:", dealerHand);

    let botSum = dealerBehavior(dealerHand,deck);
    console.log("DEALER HAS CHOSEN TO STAND!", dealerHand);
    console.log("DEALER TOTAL: ",botSum);
    let winner = determineWinner(cardSum,botSum);

    if (winner == "Push"){
        console.log('The round has no winner!');
        alert('The round has no winner!');
        return;
    }
    console.log(`The winner of the round: ${winner}`);
    alert(`The winner of the round: ${winner}`);
    return;

}

playBlackJackWithButtons();

//start of actual script
// while (1){
// playBlackJack();
// }
console.log("End of Script");








// track player hand 
// add cards 
// stand