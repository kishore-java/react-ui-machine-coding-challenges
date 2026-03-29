## Wordle

### State
- `answer` → string, random word from words.js
  - lazy init: `useState(() => getRandomWord())` runs only once
- `currentGuess` → string, letters being typed right now
- `guesses` → array of strings, all submitted guesses
- `gameStatus` → string, 'playing' | 'won' | 'lost'

### Logic

#### evaluateGuess(guess, answer)
- Input: guess string, answer string
- Output: array of 5 objects → [{letter, status}, ...]
- Two passes because:
  - Pass 1 → grab all 'correct' first, decrease letterCount
  - Pass 2 → decide 'present' or 'absent' with remaining count
- Edge case: 'EECRA' vs 'CRANE' → first A marked correct,
  second A should be absent not present

#### getKeyStatus(guesses, answer)
- Input: all guesses array, answer string
- Output: object → { C: 'correct', A: 'absent', ... }
- Loops through all guesses, calls evaluateGuess for each
- Priority: correct(3) > present(2) > absent(1)
- Only update if new status is better than existing

#### handleEnter()
- Guards: currentGuess.length < 5, gameStatus !== 'playing'
- Uses newGuesses (local variable) not guesses (async state)
- Checks win: currentGuess === answer
- Checks lose: newGuesses.length === 6

#### handleKey(key)
- Single entry point for both physical and on-screen keyboard
- Routes to handleLetter, handleBackspace, handleEnter

### UI
- App
  - Grid → (guesses, currentGuess, answer)
    - Row → (guess, isSubmitted, answer)
      - Tile → (letter, status)
  - Keyboard → (onKey, guesses, answer)
  - StatusMessage → (gameStatus, answer)

### Data Flow
- Data flows DOWN via props
- Events flow UP via callback (onKey → handleKey)

### Edge Cases
- Duplicate letters → two pass in evaluateGuess
- Async state → use newGuesses not guesses in handleEnter
- Event listener cleanup → named function in useEffect
  (anonymous functions have different references)
- Empty guesses → getKeyStatus returns {} safely
- Active row empty → guess[i] || '' in Row