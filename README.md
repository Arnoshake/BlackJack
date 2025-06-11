# 🃏 The Dog House — JavaScript Blackjack Game

A simple web-based Blackjack game where you play against a dealer. Built using vanilla HTML, CSS, and JavaScript.

I made this during a travel day from Nashville to San Diego!

## TOTAL TIME SPENT: 4 HR 51 MIN

---

## What I Learned

This project was part of my journey to learn front-end development with JavaScript. Here's what I learned and implemented:

- **DOM Manipulation**:
  - Used `querySelector` and `addEventListener` to hook up buttons to JavaScript game logic.
  - Dynamically updated HTML elements using `innerHTML` and string templating.

- **JavaScript Fundamentals**:
  - Worked with arrays, loops, and conditionals to simulate card drawing and game rules.
  - Learned to use `.map()` and `.slice()` for array processing.
  - Managed state using an object-oriented `Game` object.

- **Game Logic**:
  - Created and shuffled a deck of cards using nested loops.
  - Implemented Blackjack rules: hit, stand, bust, dealer AI behavior, and Ace value logic.
  - Handled dynamic score calculation, including Ace adjustment (1 or 11).

- **Styling & Layout**:
  - Used Flexbox in CSS to build a responsive layout.
  - Applied basic color themes and spacing for readability and visual structure.

- **Fundamental Concepts**:
  - Objects are a common way to integrate buttons into game logic. This circumvents waiting for button presses (like an interupt). Additionally, it allows for the game to be affected without having to directly pass values to the button press.
  - Learned how to represent cards and manipulate them for general card games
---

## 🧩 How to Play

1. **Click "RESTART"** to start a new round.
2. **Click "HIT"** to draw a card.
3. **Click "STAND"** to end your turn and let the dealer play.
4. If your total goes over 21, you bust and the dealer wins.

---

## 🗂️ Project Structure

```
/index.html        ← HTML structure for game layout  
/styles.css        ← Flexbox layout and visual styles  
/script.js         ← Game logic and event handlers  
```

---

## 🚀 Try It Out

You can run this by opening `index.html` in your browser — no server or dependencies needed.

---

## ✏️ Future Improvements

Things I might add later as I continue learning:

- Display actual card images instead of text.
- Add persistent game score tracking (wins/losses).
- advisor on how to improve
- splitting hands and insurance

---

## 🧠 Final Thoughts

This project helped me understand how to turn static HTML into an interactive application using pure JavaScript. It reinforced both fundamental programming skills and how web pages are structured and updated in real time.
