import React from "react";

export default function TextArea({ handleText, ready }) {
  return (
    <div className="row" id="PastedText">
      <textarea
        className="pasted"
        placeholder="Paste Text Here"
        readOnly={ready}
        onChange={handleText}
        onClick={handleText}
      ></textarea>
    </div>
  );
}
