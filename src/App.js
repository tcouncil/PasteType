  import React, { useState, useEffect } from "react";
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
    const [keystrokes, setKeystrokes] = useState(0);
    const [accurateKeystrokes, setAccurateKeystrokes] = useState(0);
    const [lengthKeys, setLengthKeys] = useState(0);

    const handleText = (e) => setPastedText(e.target.value);
    const setReady = (bool = false) => {
      const textArea = document.querySelector(".pasted");
      const textTyper = document.getElementById("TextTyper");
      const theChar = document.getElementById("TheChar");
      const pasteTypeTexter = document.getElementById("PasteTypeTexter");
      pasteTypeTexter.classList.remove("end");
      if(textTyper.innerText[1] === ' '){
        spaceMode = true;
        textTyper.classList.add("SpaceLeft");
      }
      startedTyping = false;
      ready = bool;
      setLengthKeys(pastedText.length);
      setReadyStats(bool);
      if (bool) {
        textArea.classList.add("Ready");
        theChar.innerText = textTyper.innerText[0];
        textTyper.innerText = textTyper.innerText.slice(1);
        
      }
      else{
        pasteTypeTexter.classList.remove("end");
        textArea.classList.remove("Ready");
        theChar.classList.remove("end")
        theChar.innerText= "";
        document.getElementById("PasteTypeTexter").classList.remove("Over");
      }
      if (!startedTyping) {
        pasteText = pastedText;
        textArr = pastedText.split("");
        setTypingStats(false);
        setKeystrokes(0);
        setAccurateKeystrokes(0);
        setLengthKeys(pasteText.length);
      }
    }

    const keyHandler = ({key}) => {
      const theChar = document.getElementById("TheChar");
      setTypingStats(true);
      
      console.log(key);
      if(key !== 'Shift' && key !== 'Alt' && key !== 'Control'  && key !== 'F1' && key !== 'F2' && key !== 'F3' && key !== 'F4' && key !== 'F5' && key !== 'F6' && key !== 'F7' && key !== 'F8' && key !== 'F9' && key !== 'F10' && key !== 'F11' && key !== 'F12'  && key !== 'CapsLock' ) { 
        setKeystrokes(keystroke => keystroke+1);
        const textTyped = document.getElementById("TextTyped");
        if(key === textTyped.innerText[textTyped.innerText.length-1]){
          setAccurateKeystrokes(keystroke => keystroke+1);
        }
        if( key === 'Space'){
          setAccurateKeystrokes(keystroke => keystroke+1);
        }
      }
    }

    useEffect(()=> {
      window.addEventListener("keydown", e =>{
      if(ready){
        keyHandler(e);
      }
    },);
    }, []);

    
    

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
          readyTyper={readyStats}
          setReady={setReady}
          pastedText={pastedText}
        />
        <Stats startedTyping={typingStats} ready={readyStats} keystrokes={keystrokes} accurateKeystrokes={accurateKeystrokes} lengthKeys={lengthKeys} typingStats={typingStats}/>
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
        textTyped.classList.remove("SpaceRight");
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
      console.log(`Key: '${e.key}' code = ${e.key.charCodeAt(0)}
        asking for character '${theChar.innerText[0]}' code = ${theChar.innerText.charCodeAt(0)}`);
        
    }
  });

  export default App;