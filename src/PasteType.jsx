import React, { useState } from "react";
import "./pasteType.css";

export default function PasteType({
  pastedText = "",
  setStartedTyping
}) {
  const textTyper = document.getElementById("TextTyper");
  const typedText = document.getElementById("TextTyped");
  let pasteText = pastedText;

  const handleReset = (e) => {
    setStartedTyping(false);
    pasteText = "";
    textTyper.innerText = "";
    typedText.innerText = "";
  }

  return (
    <>
      <div className="row">
        <button className="btn" onClick={handleReset}>Reset</button>
      </div>
      <div className="row">
        <div id="TypedText">
          <code className="col-6" id="TextTyped" />
          <code className="col-6 text-no-wrap" id="TextTyper">{pasteText}</code>
        </div>
      </div>
    </>
  );
}
