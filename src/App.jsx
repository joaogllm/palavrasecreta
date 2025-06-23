// CSS
import './App.css'

// REACT
import { useCallback, useEffect, useState } from 'react';

// DATA
import { wordsList } from './data/words';

// COMPONENTS
import StartScreen from './components/StartScreen'
import GameOver from './components/GameOver';
import Game from "./components/game.jsx";

const stages = [
  {id: 1, name:"start"},
  {id: 2, name:"game"},
  {id: 3, name:"end"},
];

const guessesQty = 3

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, SetPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty)
  const [score, setScore] = useState(0)

  const pickedWordAndCategory = useCallback(() => {
    const categories  = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    return {word, category}
  },[words]);

  // Start Game
  const startGame = useCallback(()=> {
    // clear all letter
    clearLetterStates();


    // pick word and pick category
    const {word, category} = pickedWordAndCategory();
    
    // create an array of letter
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());
    

    // fill states
    setPickedWord(word)
    SetPickedCategory(category)
    setLetters(wordLetters)
    
    setGameStage(stages[1].name)
  },[pickedWordAndCategory])

  // process the letter input
  const verifyLetter = (letter) => {
    
    const normalizedLetter = letter.toLowerCase()

    // Check if letter has already been utilized
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return;
    }

    // push guessed letter or remove a guess
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters)=>[
        ...actualGuessedLetters,
        normalizedLetter
      ])
    } else {
      setWrongLetters((actualWrongLetters)=>[
        ...actualWrongLetters,
        normalizedLetter
      ])

      setGuesses((actualGuesses)=> actualGuesses - 1);

    }

  }

  const clearLetterStates = ()=>{
    setGuessedLetters([])
    setWrongLetters([])
  }

  useEffect(()=>{
    if(guesses <= 0){
      //reset all states
      clearLetterStates()
      setGameStage(stages[2].name)
    }
  }, [guesses])

  // check win conditional
  useEffect(()=>{

    const uniqueLetters = [... new Set(letters)]
    if(guessedLetters.length === uniqueLetters.length){
      setScore((actualScore)=> actualScore += 100)

      startGame()
    }


  },[guessedLetters, letters, startGame])

  // Restart the game
  const retry = () => {
    setScore(0)
    setGuesses(guessesQty)
    setGameStage(stages[0].name)
  }

  return (
    <>
      <div className='App'>
        {gameStage === "start" && <StartScreen startGame={startGame}/>}
        {gameStage === "game" && 
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />}
        {gameStage === "end" && <GameOver retry={retry} score={score}/>}
      </div>
    </>
  )
}

export default App
