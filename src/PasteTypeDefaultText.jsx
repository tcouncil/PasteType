export const PasteTypeDefaultText = `import React, { useState } from "react";
import TextArea from "./TextArea";
import PasteType from "./PasteType";
import Stats from "./Stats";

let ready = false;
let startedTyping = false;
let spaceMode = false;
let firstSpace = true;
let pasteText = "";
let textArr = [];

function App() {
  const [pastedText, setPastedText] = useState("");
  const [readyStats, setReadyStats] = useState(false);
  const [typingStats, setTypingStats] = useState(false);

  const handleText = (e) => setPastedText(e.target.value);
  const setReady = (bool = false) => {
    const textArea = document.querySelector(".pasted");
    const textTyper = document.getElementById("TextTyper");
    const theChar = document.getElementById("TheChar");

       if(textTyper.innerText[1] === ' '){
      spaceMode = true;
      textTyper.classList.add("SpaceLeft");
    }
    startedTyping = false;
    ready = bool;
    setReadyStats(bool);
    if (bool) {
      textArea.classList.add("Ready");
      theChar.innerText = textTyper.innerText[0];
      textTyper.innerText = textTyper.innerText.slice(1);
      
    }
    else{
      textArea.classList.remove("Ready");
      theChar.classList.remove("end")
      theChar.innerText= "";
      document.getElementById("PasteTypeTexter").classList.remove("Over");
    }
    if (!startedTyping) {
      pasteText = pastedText;
      textArr = pastedText.split("");
      setTypingStats(false);
    }
  }

  return (
    <div>
      <div>
        <header className="text-center">
          <h1>pasteType</h1>
        </header>
      </div>
      <TextArea
        handleText={handleText}
        ready={ready}
      />
      <PasteType
        setReady={setReady}
        pastedText={pastedText}
      />
      <Stats startedTyping={typingStats} ready={readyStats} />
    </div>
  );
}

window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
});

window.addEventListener("keydown", (e) => {
  if (ready) {
    const textTyper = document.getElementById("TextTyper");
    const textTyped = document.getElementById("TextTyped");
    const theChar = document.getElementById("TheChar");
    if (!startedTyping) {
      startedTyping = true;
      document.getElementById("StartTyping").classList.add("end");
    }

    if(textTyper.innerText[0] === undefined && e.key.charCodeAt(0) === theChar.innerText.charCodeAt(0)){
      theChar.innerText = "end."
      theChar.classList.add("end");
      document.getElementById("PasteTypeTexter").classList.add("Over");
      return;
    }
    if (spaceMode) {
      if(firstSpace && e.key.charCodeAt(0) === theChar.innerText.charCodeAt(0)){
      textTyped.innerText += theChar.innerText;
      theChar.innerText = "";
      theChar.classList.add("Space");
      textTyper.classList.remove("SpaceLeft");
      firstSpace = false;
      }
      if (e.key.charCodeAt(0) === 32 && theChar.innerText.length === 0) {
        theChar.classList.remove("Space");
        textTyped.classList.add("SpaceRight");
        theChar.innerText = textTyper.innerText[0];
        let nextChar = textTyper.innerText[1];
        spaceMode = false;
        firstSpace = true;
        if (nextChar === ' ') {
          spaceMode = true;
          theChar.innerText = textTyper.innerText[0];
          textTyper.classList.add("SpaceLeft");
        } 
        textTyper.innerText = textTyper.innerText.slice(1);
      }
      if (textTyped.innerText.length >= 23) {
          const textTypedArr = textTyped.innerText.split("");
          textTypedArr.shift();
          textTyped.innerText = textTypedArr.join("");
        }
    } else {
      if (e.key.charCodeAt(0) === theChar.innerText.charCodeAt(0)) {
        textTyped.classList.remove("SpaceRight");
        let nextChar = textTyper.innerText[1];
        textTyped.innerText += theChar.innerText;
        if (nextChar === ' ') {
          spaceMode = true;
          theChar.innerText = textTyper.innerText[0];
          textTyper.classList.add("SpaceLeft");
        } else {
          theChar.innerText = textTyper.innerText[0];
        }
        textTyper.innerText = textTyper.innerText.slice(1);

        if (theChar === undefined)
          theChar.innerText = "";
        if (textTyped.innerText.length >= 23) {
          const textTypedArr = textTyped.innerText.split("");
          textTypedArr.shift();
          textTyped.innerText = textTypedArr.join("");
        }
      }
    }
  }
});`;