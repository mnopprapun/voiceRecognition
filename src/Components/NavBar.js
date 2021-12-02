import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import "./NavBar.css";
import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const NavBar = () => {
  const [redirectUrl, setRedirectUrl] = useState("");
  const commands = [
    {
      command: ["Open *"],
      callback: (redirectPage) => setRedirectUrl(redirectPage),
    },
  ];
  const { transcript } = useSpeechRecognition({ commands });
  const pages = ["home", "about", "contact"];
  const urls = {
    home: "/",
    about: "/about",
    contact: "/contact",
  };

  // this if state checks if the browser supports listener

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  let redirect = "";

  if (redirectUrl) {
    if (pages.includes(redirectUrl)) {
      redirect = <Navigate to={urls[redirectUrl]} />;
    } else {
      redirect = <p>Could not find page: {redirectUrl}</p>;
    }
  }

  return (
    <div className="links">
      <Link className="link" to="/">
        Home
      </Link>
      <Link className="link" to="/about">
        About
      </Link>
      <Link className="link" to="/contact">
        Contact Us
      </Link>{" "}
      <div className="main-container">
        <p id="transcript">Transcript: {transcript}</p>
        <button onClick={SpeechRecognition.startListening}>Start</button>
      </div>
      <Routes>
        <Route path="/about" component={About} element={About}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/" component={Home}/>
        {redirect}
      </Routes>
    </div>
  );
};

export default NavBar;
