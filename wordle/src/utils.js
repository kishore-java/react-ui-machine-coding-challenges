
export function evaluateGuess(currentGuess , word ){

    let result = new Array(5).fill(0);
    let letterCountOfWord = { };

    word.split('').forEach((ele,i) => letterCountOfWord[ele] ? letterCountOfWord[ele]++  : letterCountOfWord[ele]=1)
 
    //collecting all correct letters in result array.
  currentGuess.split('').forEach((letter,i ,arr) => {
     if(letter === word[i]){
        result[i] = {letter , status:'correct'}
        //decreasing the count
        letterCountOfWord[letter]--
     } 
  });
   
  //setting the result array with presnet and absent status
  currentGuess.split('').forEach((letter , i) => {
         if(result[i]) return;

         if(letterCountOfWord[letter] > 0) {
            result[i] = {letter , status:'present'};
            letterCountOfWord[letter]--;
         }

         else result[i] = {letter , status:'absent'}

  })
 
    console.log(`result for guess ${currentGuess} is ` , result);
  return result;


}


export function getKeyStatus(guesses, answer) {
    const keyStatus = { };
   const priority = { correct: 3, present: 2, absent: 1 };

guesses.forEach((guess) =>  evaluateGuess(guess, answer).forEach((obj) => {
        // only update if new status is BETTER than existing
        if (!keyStatus[obj.letter] || priority[obj.status] > priority[keyStatus[obj.letter]]) {
            keyStatus[obj.letter] = obj.status;
        }
    })
)
  return keyStatus
}

 
export const Message = {
    won: '🎉 Congratulations! You won!',
    lost: '😞 Game over!',
    playing: null
}