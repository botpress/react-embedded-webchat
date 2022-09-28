import reactLogo from "./assets/react.svg";
import botpressLogo from "./assets/botpress.svg";
import "./App.css";
import EmbeddedWebchat from "./EmbeddedWebchat";

const BOTPRESS_HOST = "http://localhost:3000";
const BOT_ID = "asd";

function App() {
  return (
    <div className="App">
      <div>
        <a href="https://app.botpress.cloud" target="_blank">
          <img
            src={botpressLogo}
            className="logo botpress"
            alt="Botpress logo"
          />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h1>Botpress Webchat + React</h1>
      </div>
      <EmbeddedWebchat botpressHost={BOTPRESS_HOST} botID={BOT_ID} />
      <p className="read-the-docs">Click on the Botpress logo to learn more</p>
    </div>
  );
}

export default App;
