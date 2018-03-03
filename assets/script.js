// Peter Anderson's Hangman Game assignment, 2018
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.3.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

// ***********************Constant Global Variables*****************
let numWins = 0;
let guessesLeft = 12;
const wordList = ["EARTH", "SUN", "MOON", "MERCURY", "SATURN", "JUPITER", "MARS", "VENUS", "URANUS", "NEPTUNE", "ASTEROID", "COMET", "STAR", "ANDROMEDA", "PLUTO", "GALAXY"];
let secretWord = wordList[Math.floor(Math.random() * wordList.length)];
let lettersFound = [];
// console.log(secretWord);
let lettersToFind = secretWord.split("");
// console.log("lettersToFind is set to "+(lettersToFind));
// console.log(lettersToFind);
let secretWordCounter = 0;
let lettersAlreadyGuessed = "";


// A quick note: the game works by displaying an empty list of spaces that was generated to be 
// equal in length to the secretWord.  This is lettersFound.  An inverse array called lettersToFind exists
// that contains all of the letters that have not been found.  When a letter is input that exists in lettersToFind, 
// that letter is added to lettersFound and removed from lettersToFind AT THE LOCATION OF THAT LETTER IN THE WORD.
// This allows me to neatly plug letters into the spaces that need to be rendered on the screen to let the player
// know what they have already found.
// 
// I'll go into more detail at the location of each function below
// The game "starts" at the last method at the bottom


// ************************Methods***********************

function setLettersFoundToSpaces() {
    lettersFound = [];                                      //this method empties lettersFound (in case the player has won or lost)
    for (i=0;i<secretWord.length;i++) {                     //then runs a for loop that makes lettersFound equal in length of the secretWord
        lettersFound[i] = "_";                              //but consisting only of spaces
        // console.log("lettersFound is now "+lettersFound);
    }
}




function printVars() {                                                                  //This is just a time saver
    $("#numWins").text(numWins);                                                        //that prints all of my variables
    $("#currentWord").text(lettersFound);                                               //in one function so I don't have
    $("#numGuessesRemaining").text("Guesses left: "+guessesLeft);                       //to constantly call different variables
    $("#lettersAlreadyGuessed").text("Guesses so far: "+lettersAlreadyGuessed);
}


setLettersFoundToSpaces()                                                                       //part of game setup that
window.onload = function () { document.getElementById("currentWord").innerHTML=lettersFound};   //renders the empty spaces
                                                                                                //but only after "currentWord"
                                                                                                //exists on index.html



function winner() {                                             //If the player wins,
    numWins++;                                                  //increment numWins,
    randomWord();                                               //select a new random word,
    // console.log("the secret word is "+secretWord);
    lettersFound = [];                                          //set lettersFound to an empty array (will be changed later)
    lettersToFind = secretWord.split("");                       //set lettersToFind to an array of the letters in the secretWord
    // console.log("lettersToFind is set to "+(lettersToFind)); 
    guessesLeft = 12;                                           //refresh the number of guesses the player gets
    setLettersFoundToSpaces();                                  //set lettersFound to be equal to the number of spaces in secretWord
    lettersAlreadyGuessed = "";                                 //clear the guessed letters
    printVars();                                                //and finally update the screen
}

function loser() {                                              //and the loser function does the same thing as the winner function
    // shame++;                                                 //but with no numWins to increment.
    randomWord();
    console.log("the secret word is "+secretWord);
    lettersFound = [];
    lettersToFind = secretWord.split("");
    console.log("lettersToFind is set to "+(lettersToFind));
    guessesLeft = 12;
    setLettersFoundToSpaces();
    lettersAlreadyGuessed = "";
    printVars();  
}

function addLetterToGuessed(keyInput) {
    if (lettersAlreadyGuessed.length === 0) {                           //skips the comma if this is the first letter
        lettersAlreadyGuessed = keyInput;                               //and adds to the string of guessed letters
    } else {
        lettersAlreadyGuessed = lettersAlreadyGuessed + ", " + keyInput;    //if it's not the first letter, add a comma first
        // console.log("added "+lettersAlreadyGuessed+" to letters already guessed");
    }                                               //this is the final step in the turn phase where
    guessesLeft--;                                  //guesses left is decremented and
    printVars();                                    //the variables are updated on the screen
}



function addLetterToFound(keyInput) {
    // console.log("add letter to found started with "+keyInput);
    guessesLeft++;           
    for (i=0;i<lettersToFind.length;i++) {         //we know the letter is in here, but we don't know where or how many duplicates
        if (keyInput === lettersToFind[i]) {       //so we'll check every spot with a for loop until we find it
            // console.log("letters to find pass "+(i+1)+" comparing "+(keyInput)+" to "+lettersToFind[i]);  
            lettersFound[i] = keyInput;             //then assign it to the location in question in lettersFound
            lettersToFind[i] = "_";                 //then replace that spot on the lettersToFind with a blank space        
        }                                           //this loop will catch duplicate letters like the Os in MOON
    }
    checkWinLoss(keyInput);                         //and finally check to see if the player has won
}

function checkWinLoss(keyInput) {                                 //This method runs every turn phase to detect if the game
    // console.log("checking win/loss");                            needs to reset.  It starts by splitting the secretWord 
    let checkPhrase = secretWord.split("");                       //into an array, then turning that array into a string to 
    if (lettersFound.toString() === checkPhrase.toString()) {     //compare to the letters found (also now a string). I did
        winner();                                                 //it this way because comparing two identical array objects
    } else {                                                      //always returns false (because different memory location?).
        if (guessesLeft === 1) {                                  //If the strings are identical, the winner function runs.
            loser();                                              //If not, it checks to see if this is the final guess. 
        } else {                                                  //If it is the final guess, the loser function runs.  If not
            addLetterToGuessed(keyInput);                         //(this runs whether we're adding a found letter or not)
        }                                                         //a new letter is added to the guessed queue.
    }
}



function randomWord() {
    
    secretWord = wordList[Math.floor(Math.random() * wordList.length)];    //set the secret word to a random work from the word list
    lettersToFind = secretWord.split("");                                  //then set lettersToFind to secretWord split into an array

    // console.log(secretWord);
    // console.log(lettersToFind);
}




// Listens for key input and assigns each press to a variable,
// then calls the function to add a letter to the game.

document.addEventListener('keypress', (event) => {
    let keyName = event.key.toUpperCase();                      //Sanitize the input to uppercase
    // console.log("key press detected: "+keyName);                
    letterLocation = lettersToFind.indexOf(keyName);            //snag the letter location (to limit # of search ops)
    if (lettersAlreadyGuessed.indexOf(keyName)===-1){           //if the letter hasn't been guessed already
        if (letterLocation != -1) {                             //if the letter is one of the ones we still need
            // console.log("aw snap we found "+keyName+"!")        
            addLetterToFound(keyName);                          //add the letter to the found list
        } else {                                                //if we don't need this letter
            // console.log("dang we didn't find "+keyName+"!") 
            checkWinLoss(keyName);                              //just go straight to see if the player has lost
        }
    }                                                           //there is intentionally no "else" handler for letters
                                                                //that have already been guessed being guessed again
        
});
    


    
    
            