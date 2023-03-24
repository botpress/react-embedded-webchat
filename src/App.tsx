import "./App.css"
import EmbeddedWebchat from "./EmbeddedWebchat"

const BOT_ID = "3c099433-9f68-4ade-a850-6d2744de215d"
function App() {
  return (
    <div className="App">
      <EmbeddedWebchat botID={BOT_ID} />
    </div>
  )
}

export default App
