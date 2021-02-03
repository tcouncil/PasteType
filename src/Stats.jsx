import React from "react";

export default function Stats({startedTyping, ready, accurateKeystrokes, keystrokes, typingStats, lengthKeys}) {
  return (
    <div className="row text-center" id="Stats">
      <h4 id="StartTyping">{ready && !startedTyping ? "Start Typing!" : "" }</h4>
      <h5>{typingStats ? `KeyStrokes: ${keystrokes} Length of Characters: ${lengthKeys} ` : "" }</h5>
    </div>
  );
}