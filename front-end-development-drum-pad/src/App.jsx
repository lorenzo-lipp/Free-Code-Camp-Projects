import './App.css';
import React, { useEffect, useState, useRef } from 'react';

const App = () => {
  
  const [power, setPower] = useState(true);
  const [displayText, setDisplayText] = useState("");
  const powerRef = useRef(power);
  powerRef.current = power;

  useEffect(() => {
    window.addEventListener("keyup", (e) => {
      if (powerRef.current) {
        let elementId = document.getElementById(e.key && e.key.toUpperCase());
        if (elementId !== null) {
          elementId.currentTime = 0;
          elementId.play();
          let parent = elementId.parentElement;
          setDisplayText(parent.id);
          parent.classList.add("pressed");
          setTimeout(() => { parent.classList.remove("pressed") }, 300);
        }
      }
    })
  }, []);
  
  const togglePower = () => {
    setPower(!power);
  }
  
  return (
    <div className="container" id="drum-machine">
        <DrumElement id="Heater-1" audioType="Heater-1" hotkey="Q" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" />
        <DrumElement id="Heater-2" audioType="Heater-2" hotkey="W" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" />
        <DrumElement id="Heater-3" audioType="Heater-3" hotkey="E" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" />
        <DrumElement id="Heater-4" audioType="Heater-4" hotkey="A" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" />
        <DrumElement id="Clap" audioType="Clap" hotkey="S" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" />
        <DrumElement id="OpenHH" audioType="Open HH" hotkey="D" src="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" />
        <DrumElement id="KicknHat" audioType="Kick n' Hat" hotkey="Z" src="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" />
        <DrumElement id="Kick" audioType="Kick" hotkey="X" src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" />
        <DrumElement id="ClosedHH" audioType="Closed HH" hotkey="C" src="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" />
        <Power power={power} f={togglePower} />
        <div id="display">{power ? displayText : ""}</div>
    </div>
  )
}

const DrumElement = (props) => {
   return (
     <div id={props.id} className="drum-pad" onClick={() => window.dispatchEvent(new KeyboardEvent('keyup', {key: props.hotkey}))}>
       <audio src={props.src} className="clip" id={props.hotkey}></audio>
       {props.hotkey}
     </div>
   )
}

const Power = (props) => {
  return (
    <div className="power-container" onClick={props.f}>
      <p>Power</p>
      <div className={`powerButton ${props.power ? "on" : "off"}`}></div>
    </div>
  )
}

export default App;