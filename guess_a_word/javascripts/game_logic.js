/*
1. create a function that picks a random word from an array of words. It returns undefined when out of words
  - an array of words
  - a way to select a word randomly from array
  - remove the word from array
  - algo:
    pass in array when function is called
    select a word from array : randomly get an index of a word -> if array is empty, return undefined
    slice the indexed word out of array and return the word
    
2. a game constructor to start new game
  - states to track:
    chosen word;
    Number of incorrect guesses: initally 0
    All the letters guessed (initally empty array) --> display all guessed letters (repeated not count)
    Total allowed wrong guesses --> 6
  - behaviours:
    choose word (or run out of words message)
    update incorrect guesses 
    update letters guessed array
    create blanks in word container (length of chosen word)

3. when page first load, new game starts and array of words full
  when click play again, new game starts (with no update on array of words);
    if no more words, display no words message, and no update on word and guesses container(as no new gamne start)
    when a letter is entered (keyup event?) : either display the letter at word container or guesses container; 
      increase incorrect count; or display all apples gone message (stop listening to key press)


*/

document.addEventListener('DOMContentLoaded', event => {
  let wordDiv = document.getElementById('spaces');
  let message = document.getElementById('message');


  let randomWord = function() {
    let words = ['apple', 'orange', 'strawberry', 'raspberry', 'lemon'];
    
    return function() {
      function getRandomIdx(wordsCount) {
        return Math.floor(Math.random() * wordsCount);
      }
  
      let wordsCount = words.length;
      
      if (wordsCount > 0) {
        let wordIdx = getRandomIdx(wordsCount);
        return words.splice(wordIdx, 1)[0];
      } else {
        return undefined;
      }
    };
  }();
  
  
  class Game {
    constructor() {
      this.incorrectGuesses = 0;
      this.gueesedLetters = [];
      this.allowedWrongGuesses = 6;

      this.word = randomWord();
      if (!this.word) {
        message.textContent = "Sorry, I've run out of words";
        return this;
      }
      
      this.init();
    }

    createBlanks() {
      let currentSpans = document.querySelectorAll('span');

      currentSpans.forEach(span => {
        span.parentNode.removeChild(span);
      });
      
      for (let i = 0; i < this.word.length; i += 1) {
        wordDiv.appendChild(document.createElement('span'));
      }
    }

    init() {
      this.createBlanks();
    }
  };
  
  new Game();
});

