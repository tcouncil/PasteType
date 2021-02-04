import React from "react";
import { secondsToDuration } from "./duration";

export default function Stats({startedTyping, ready, accurateKeystrokes, keystrokes, typingStats, lengthKeys, seconds}) {
  return (
    <div className="row text-center" id="Stats">
      <h4 className="mt-2" id="StartTyping">{ready && !startedTyping ? "Start Typing!" : "" }</h4>
      <h5 className="mt-"> {ready ? `🕑 ${secondsToDuration(seconds)}` : ""}</h5>
      <h5>{typingStats ? `${100-((keystrokes/lengthKeys*100)-100).toFixed(2)}% Accuracy` : "" }</h5>
      <h5>{typingStats ? `${ seconds > 0 ? (keystrokes/(seconds/60)).toFixed(0) :  (keystrokes*60).toFixed(0) } ` : "" }<abbr title="Characters Per Minute">{typingStats ? "CPM" : ""}</abbr></h5>
    </div>
  );
}