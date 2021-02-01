import React from "react";

export default function TextArea({handleText, startedTyping, pastedText}) {
  return (
    <div className="row" id="PastedText">
      {startedTyping ? <code className="pastedCode">{pastedText}</code> 
      : <textarea className="pasted" placeholder="Paste Text Here" readOnly={startedTyping} onChange={handleText}></textarea> }
      
    </div>
  );
}
