import './App.css';
import React, { useState } from 'react';
import Prism from 'prismjs';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { handleEditorClick, handleResultClick, input } from './utils.js';

marked.setOptions({
    breaks: true,
    highlight: function (code) {
        return Prism.highlight(code, Prism.languages.javascript, "javascript");
    }
});

const App = () => {
    const [inputValue, setInputValue] = useState(input);
    const [result, setResult] = useState(marked.parse(input));

    const handleChange = (e) => {
        setInputValue(e.target.value);
        setResult(marked.parse(e.target.value));
    }

    return (
        <div className="container">
            <div className="editor-container">
                <Header iconClass="fa-pencil" text="Editor" resize={handleEditorClick} />
                <Editor handleChange={handleChange} input={inputValue} />
            </div>
            <span className="line-breaker"></span>
            <div id="result">
                <Header iconClass="fa-address-card" text="Result" resize={handleResultClick} />
                <Result result={result} />
            </div>
        </div>
    );
}

const Editor = (props) => {
    return (
        <textarea
            id="editor"
            onChange={props.handleChange}
            type="text"
            value={props.input}
        />
    );
};

const Result = (props) => (<div id="preview" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.result) }} />);

const Header = (props) => {
    return (
        <div className="header">
            <div className="flex-style">
                <i className={"fa-solid " + props.iconClass}></i>
                <p id="header-text">{props.text}</p>
            </div>
            <i className="resize fa-solid fa-up-right-and-down-left-from-center" onClick={props.resize}></i>
        </div>
    );
};

export default App;
