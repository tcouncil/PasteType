import React, { useState } from "react";
import TextArea from "./TextArea";
import PasteType from "./PasteType";

function App() {
  const [pastedText, setPastedText] = useState("");
  const [startedTyping, setStartedTyping] = useState(false);

  const handleText = (e) => setPastedText(e.target.value);

  return (
    <div>
      <div>
        <div className="text-center">
          <h1>pasteType</h1>
        </div>
      </div>
      <TextArea
        pastedText={pastedText}
        handleText={handleText}
        startedTyping={startedTyping}
      />
      <PasteType
        pastedText={pastedText}
        setStartedTyping={setStartedTyping}
      />
    </div>
  );
}

window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");

  
});
window.addEventListener("keydown", (e) => {
  const textTyper = document.getElementById("TextTyper");
  const textTyped = document.getElementById("TextTyped");

  let pasteText = textTyper.innerText;

  console.log(`Key: '${e.key}' code = ${e.key.charCodeAt(0)}
      asking for character '${pasteText[0]}' code = ${pasteText.charCodeAt(
    0
  )}`);

  if (
    e.key.charCodeAt(0) === pasteText.charCodeAt(0) ||
    (e.key.charCodeAt(0) === 69 && pasteText.charCodeAt(0) === 10)
  ) {
    const textArr = pasteText.split("");
    textTyped.innerText += textArr[0];
    textArr.shift();
    textTyper.innerText = textArr.join("");
    if (textTyped.innerText.length >= 50) {
      const textTypedArr = textTyped.innerText.split("");
      textTypedArr.shift();
      textTyped.innerText = textTypedArr.join("");
    }
  }
});

export default App;
