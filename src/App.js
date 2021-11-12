import NavBar from "./Components/NavBar";
import "./App.css";
import { useState } from "react";
import SpeechRecognition, {useSpeechRecognition, Redirect} from "react-speech-recognition";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [redirectUrl, setRedirectUrl] = useState("");

  const commands = [
    {
      command: ["Open *"],
      callback: (redirectPage) => setRedirectUrl(redirectPage),
    },
  ];

  const { transcript } = useSpeechRecognition({ commands });
  const pages = ["home", "about", "contact"]
  const urls = {
    home: "/",
    about: "/about",
    contact: "/contact",
  }
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }
  let redirect = ""
  if (redirectUrl) {
    if (pages.includes(redirectUrl)) {
      redirect = <Redirect to={urls[redirectUrl]} />
    } else {
      redirect = <p>Could not find page: {redirectUrl}</p>
    }
  }
  return (
    <div className="App">
      <NavBar />
      <p id="transcript">Transcript: {transcript}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
    </div>
  );
}

export default App;
