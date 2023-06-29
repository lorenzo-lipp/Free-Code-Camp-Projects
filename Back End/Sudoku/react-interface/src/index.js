import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

window.addEventListener("resize", () => {
    let minScale = Math.min(window.innerHeight * 0.8 / 417, window.innerWidth * 0.8 / 332);
    let board = document.querySelector(".center");
    if (board) board.style.transform = "translate(-50%,-50%) scale(" + minScale + ")";
});
