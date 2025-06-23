import "./GameOver.css"

const GameOver = ({retry, score}) => {
  return (
    <div className="game-over">
        <h1>GameOver!</h1>
        <h2>Your score was: <span>{score}</span></h2>
        <button onClick={retry}>Resetar o Jogo</button>
    </div>
  )
}

export default GameOver