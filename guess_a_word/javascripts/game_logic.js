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

  bind keyup event:
    - add event 
    - verify if key is within a-z (if not, ignore)
    - processing each guess: 
      - check if word contains key (multiple )
      - add letter to guessed letter array if not already guessed
      - if letter matches: output each instance of the letter in word blanks (idx)
      - if not match: write to guess container & increase incorrect guess count & change class name of apple container
    - if incorrect guesses === 6, game over=> display message and a link to play again, unbind the keyup event
    - if all letters are revealed, display win message and a link to play again, unbind keyup event
*/

document.addEventListener('DOMContentLoaded', event => {
  let wordDiv = document.getElementById('spaces');
  let message = document.getElementById('message');
  let replay = document.getElementById('replay');
  let apples = document.getElementById('apples');
  let guessDiv = document.getElementById('guesses');


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

  function inValidLetter(letter) {
    let charCode = letter.charCodeAt();
    return letter.length > 1 || charCode < 65 || charCode > 90;
  }
  

  class Game {
    constructor() {
      this.incorrectGuesses = 0;
      this.guessedLetters = [];
      this.allowedWrongGuesses = 6;
     
      this.word = randomWord();
      if (!this.word) {
        this.displayMessage("Sorry, I've run out of words");
        return this;
      }
      
      this.word = this.word.toUpperCase().split('');
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

      this.wordSpans = wordDiv.querySelectorAll('span');
    }

    displayMessage(text) {
      message.textContent = text;
    }

    duplicateGuess(letter) {
      return this.guessedLetters.indexOf(letter) !== -1;
    }

    displayGuess(letter) {
      let span = document.createElement('span');
      span.textContent = letter;
      guessDiv.appendChild(span);
    }

    processGuess(event) {
      let letter = event.key.toUpperCase();
      if (inValidLetter(letter) || this.duplicateGuess(letter)) { return; }
      this.guessedLetters.push(letter);

      if(this.word.includes(letter)) {
        this.fillWordBlanks(letter);
        let currentWordSpaces = this.renderCurrentWordSpaces();
        if (this.word.join('') === currentWordSpaces.join('')) {
          this.win();
        }
      } else {
        this.displayGuess(letter);
        this.incorrectGuesses += 1;
        this.setApplesClass();

        if (this.incorrectGuesses >= 6) {
          this.lose();
        }
      }
    }

    fillWordBlanks(letter) {
      let self = this;
      self.word.forEach((char, idx) => {
        if (letter === char) {
          self.wordSpans[idx].textContent = letter;
        }
      });
    }

    renderCurrentWordSpaces() {
      let self = this;
      return Array.prototype.slice.call(self.wordSpans).map(sp => {
        return sp.textContent;
      })
    }

    win() {
      this.unbindKeyEvent();
      this.displayMessage("You win!");
      this.showReplayLink();
      this.setGameStatus('win');
    }

    lose() {
      this.unbindKeyEvent();
      this.displayMessage("Sorry! You're out of guesses");
      this.showReplayLink();
      this.setGameStatus('lose');
    }

    setGameStatus(status) {
      let body = document.body;
      body.classList.remove(body.classList[0]);
      if (status) { body.classList.add(status); }

    }

    bindKeyEvent() {
      this.processGuessHandler = (e) => this.processGuess(e);
      document.addEventListener('keyup', this.processGuessHandler);
    }


    unbindKeyEvent() {
      document.removeEventListener('keyup', this.processGuessHandler);
    }

    showReplayLink() {
      replay.classList.add('visible');
    }

    hideReplayLink() {
      replay.classList.remove('visible');
    }

    setApplesClass() {
      apples.classList.remove(apples.classList[0]);
      apples.classList.add("guess_" + this.incorrectGuesses);
    }

    init() {
      this.createBlanks();
      this.hideReplayLink();
      this.setApplesClass();
      this.setGameStatus();
      this.bindKeyEvent();
    }
  };
  
  new Game();

  replay.addEventListener('click', event => {
    event.preventDefault();
    new Game();
  });
});




