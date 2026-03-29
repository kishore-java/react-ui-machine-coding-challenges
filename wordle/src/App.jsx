 
import './App.css'
import Grid from './components/Grid';
import { useState, useEffect } from 'react'
import { getRandomWord } from './word';
import Keyboard from './components/KeyBoard';
import StatusMessage from './components/StatusMessage';

function App() {
  
  const [word , setWord] = useState(() => getRandomWord());
  const [gameStatus , setGameStatus] = useState('playing');
  const [currentWord , setCurrentWord] = useState('');
  const [guesses , setGuesses] = useState([ ]);

  function handleLetter(letter){
     if(currentWord.length >= 5 ) return;
    //won or lose
      if(gameStatus !== 'playing') return;
     
      setCurrentWord((prev) => prev+letter)
  }

  function handleBackSpace( ){
     if(currentWord.length === 0) return;
     if(gameStatus !== 'playing') return;

     setCurrentWord((prev) => prev.slice(0 ,-1));
  }


  function handleEnter(){
      if(currentWord.length < 5) return;
      if(gameStatus !== 'playing') return;
        
      const newGuesses = [...guesses , currentWord];
      setGuesses(newGuesses)
      setCurrentWord('');

      //check win
       if(currentWord === word){
         setGameStatus('won')
        return;
       }


      //check lose
      if(newGuesses.length === 6){
        setGameStatus('lost');
        return;
      }
  }


  function handleKey(key) {
    if (key === 'Enter') handleEnter();
    else if (key === 'Backspace') handleBackSpace();
    else if (key.match(/^[a-zA-Z]$/)) handleLetter(key.toUpperCase());
}

useEffect(() => {
    function onKeyDown(e) {
        handleKey(e.key);
    }
    
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
}, [currentWord, guesses, gameStatus]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-4 gap-6'>
      <h1 className="text-3xl font-bold tracking-widest text-center mb-6">
       WORDGUESS
       </h1>
        <StatusMessage message = {gameStatus} answer={word}/>
       <Grid guesses={guesses} currentWord={currentWord} word={word} />
       <Keyboard onKey={handleKey} guesses={guesses} answer={word}/>
      

       {gameStatus !== 'playing' && (
       <button 
        onClick={() => {
            setWord(getRandomWord());
            setGuesses([]);
            setCurrentWord('');
            setGameStatus('playing');
        }}
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded font-bold"
      >
          Play Again
    </button>
    )}
     </div>
  )
}

export default App
