import './App.css';
import React, { useState, useRef } from 'react';

const App = () => {
    const [displayTextState, setDisplayText] = useState("0");
    const displayText = useRef(displayTextState);
    displayText.current = displayTextState;
    const numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const signals = ["+", "-", "*", "/"];
    const result = useRef(false);

    const press = (e, buttonText) => {
        if (numbers.includes(e)) {            
            if (displayText.current == "0" || result.current) {
                setDisplayText(buttonText);
            } else {
                setDisplayText(displayText.current + buttonText);
            }
            result.current = false;
        } else if (e === "clear") {
            setDisplayText("0");
            displayText.current = "0";
            result.current = false;
        } else if (e === "decimal") {
            let list = displayText.current.split(/[\+\-\*\/]/);
            if (!list[list.length - 1].match(/\./)) {
                setDisplayText(displayText.current + ".")
                result.current = false;
            }
        } else if (e === "equals") {
            if (displayText.current[displayText.current.length - 1] === ".") {
                setDisplayText(calculate(displayText.current + "0"));
                result.current = false;
            } else {
                setDisplayText(calculate(displayText.current));
                result.current = true;
            }
        } else {
            let signal;
            result.current = false;

            switch(e) {
                case "add":
                    signal = "+";
                    break;
                case "subtract":
                    signal = "-";
                    break;
                case "multiply":
                    signal = "*";
                    break;
                case "divide":
                    signal = "/";
                    break;
            }

            if (signals.includes(displayText.current[displayText.current.length - 1])) {
                if (signal !== "-") {
                    for (let i = 1; i <= displayText.current.length; i++) {
                        if (!signals.includes(displayText.current[displayText.current.length - i])) {
                            setDisplayText(displayText.current.slice(0, displayText.current.length - i + 1) + signal);
                            break;
                        }
                    }
                } else if (signal != displayText.current[displayText.current.length - 1]) {
                    setDisplayText(displayText.current + signal);
                }
            } else {
                setDisplayText(displayText.current + signal);
            }
        }
    }

    function calculate(str) {
        for (let char of str) {
            if (!(signals.includes(char) || !isNaN(+char) || char === ".")) {
                return 0;
            }
        }
        return eval(str);
    }

    return (
        <main id="calculator">
            <Screen displayText={displayText.current} />
            <div id="buttons">
                <CalculatorButton id="clear" text="AC" press={press} />
                <CalculatorButton id="divide" text="/" press={press} />
                <CalculatorButton id="multiply" text="X" press={press} />
                <CalculatorButton id="seven" text="7" press={press} />
                <CalculatorButton id="eight" text="8" press={press} />
                <CalculatorButton id="nine" text="9" press={press} />
                <CalculatorButton id="subtract" text="-" press={press} />
                <CalculatorButton id="four" text="4" press={press} />
                <CalculatorButton id="five" text="5" press={press} />
                <CalculatorButton id="six" text="6" press={press} />
                <CalculatorButton id="add" text="+" press={press} />
                <CalculatorButton id="one" text="1" press={press} />
                <CalculatorButton id="two" text="2" press={press} />
                <CalculatorButton id="three" text="3" press={press} />
                <CalculatorButton id="zero" text="0" press={press} />
                <CalculatorButton id="decimal" text="." press={press} />
                <CalculatorButton id="equals" text="=" press={press} />
            </div>
        </main>
    )
}

const Screen = (props) => (
    <div id="screen">
        <p id="display">{props.displayText}</p>
    </div>
);

const CalculatorButton = (props) => (<div id={props.id} onClick={() => props.press(props.id, props.text)}>{props.text}</div>);

export default App;
