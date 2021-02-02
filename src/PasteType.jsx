import React from "react";
import "./pasteType.css";

export default function PasteType({ pastedText = "", setReady }) {
  const textTyper = document.getElementById("TextTyper");
  const typedText = document.getElementById("TextTyped");
  let pasteText = pastedText;

  const handleReset = (e) => {
    const textArea = document.querySelector(".pasted");
    setReady(false);
    pasteText = "";
    textArea.value = "";
    textTyper.innerText = "";
    typedText.innerText = "";
  };

  const handleReady = (e) => {
    setReady(true);
  };

  return (
    <>
      <div className="row">
        <button className="btn col-6" onClick={handleReady}>
          Ready
        </button>
        <button className="btn col-6" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div className="row" id="PasteTypeTexter">
        <div id="TypedText">
          <code className="col" id="TextTyped" />
          <code id="TheChar" />
          <code className="col" id="TextTyper">
            {pasteText}
          </code>
        </div>
      </div>
    </>
  );
}
