import "./StartScreen.css"

const StartScreen = ({startGame}) => {
  return (
    <div className="start">
        <h1>Palavra Secreta</h1>
        <p>Clique no botao abaixo para jogar</p>
        <button onClick={startGame}>Começar o Jogo</button>
    </div>
  )
}

export default StartScreen