import React from "react";
import "./pasteType.css";

export default function PasteType({ pastedText = "", setReady, readyTyper }) {
  const textTyper = document.getElementById("TextTyper");
  const typedText = document.getElementById("TextTyped");
  let pasteText = pastedText;
  let firstPlay = true;

  const handleReset = (e) => {
    const textArea = document.querySelector(".pasted");
    document.getElementById("ReadyButton").classList.remove("end");
    document.getElementById("StartTyping").classList.remove("end");
    document.querySelector("body").classList.remove("PlayingBody");

    setReady(false);
    if (textTyper) {
      pasteText = "";
      textArea.value = "";
      textTyper.innerText = "";
      typedText.innerText = "";
    }
  };

  const handleReady = (e) => {
    setReady(true);
    document.getElementById("ReadyButton").classList.add("end");
    document.querySelector("body").classList.add("PlayingBody");
    if (document.querySelector(".pasted").value.length === 0) {
      const theChar = document.getElementById("TheChar");
      theChar.innerText = "i";

      document.getElementById("TextTyper").innerText = "nput text!";
    }
  };

  return (
    <>
      <div className="row">
        <button id="ReadyButton" className="btn col" onClick={handleReady}>
          Ready
        </button>
        <button id="ResetButton" className="btn col" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div className="row end" id="PasteTypeTexter">
        <div id="TypedText">
          <code className="col" id="TextTyped" />
          <mark>
            <code id="TheChar" />
          </mark>
          <code className="col" id="TextTyper">
            {pasteText}
          </code>
        </div>
      </div>
    </>
  );
}
