import React, { useState } from "react";
import TextArea from "./TextArea";
import PasteType from "./PasteType";

let ready = false;
let startedTyping = false;
let spaceMode = false;
let pasteText = "";
let textArr = [];

function App() {
  const [pastedText, setPastedText] = useState("");

  const handleText = (e) => setPastedText(e.target.value);
  const setReady = (bool = false) => {
    const textArea = document.querySelector(".pasted");
    const textTyper = document.getElementById("TextTyper");
    const theChar = document.getElementById("TheChar");
    ready = bool;
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
    }
  }

  return (
    <div>
      <div>
        <div className="text-center">
          <h1>pasteType</h1>
        </div>
      </div>
      <TextArea
        handleText={handleText}
        ready={ready}
      />
      <PasteType
        setReady={setReady}
        pastedText={pastedText}
      />
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
    }
    if(textTyper.innerText[0] === undefined){
      theChar.innerText = "end."
      theChar.classList.add("end");
      document.getElementById("PasteTypeTexter").classList.add("Over");
      return;
    }
    if (spaceMode) {
      textTyped.innerText += theChar.innerText;
      theChar.innerText = "";
      theChar.classList.add("Space");
      textTyper.classList.remove("SpaceLeft");
      if (e.key.charCodeAt(0) === 32) {
        theChar.classList.remove("Space");
        theChar.innerText = textTyper.innerText[0];
        textTyper.innerText = textTyper.innerText.slice(1);
        spaceMode = false;
      }
    } else {
      if (e.key.charCodeAt(0) === theChar.innerText.charCodeAt(0)) {
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
        if (textTyped.innerText.length >= 15) {
          const textTypedArr = textTyped.innerText.split("");
          textTypedArr.shift();
          textTyped.innerText = textTypedArr.join("");

        }
      }
    }




    console.log(`Key: '${e.key}' code = ${e.key.charCodeAt(0)}
      asking for character '${theChar.innerText[0]}' code = ${theChar.innerText.charCodeAt(0)}`);


  }
});

export default App;
