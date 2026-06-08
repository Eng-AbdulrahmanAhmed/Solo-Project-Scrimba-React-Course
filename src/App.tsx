import { useState, type JSX} from 'react'
import './App.css'
import StartScreen from './StartScreen.tsx'
import QuizScreen from './QuizScreen.tsx'

function App(): JSX.Element {

  const [screen, setScreen] = useState("start")

  return (
    <>
      <body className="app">
        {screen === "start" ? 
        <StartScreen onStart={() =>{console.log("start"); return setScreen("quiz")}} /> :
        <QuizScreen />
        }
      </body>
    </>
    
  )
}

export default App
