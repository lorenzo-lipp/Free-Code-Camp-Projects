import { useState } from "react";
import { noImage } from "../utils/utils";

export default function NewBook(props) {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [warning, setWarning] = useState("");

    const submit = () => {
        console.log(JSON.stringify({ title, image }));
        fetch('https://library.lorenzo-lipp.repl.co/api/books', {
            method: "POST",
            body: JSON.stringify({ title, image }),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
            .then(response => response.json())
            .then(() => {
                setTitle("");
                setImage("");
                setWarning("");
            })
            .catch(() => setWarning("Error"));
    }

    return (
        <div className="form">
            <label for="title">Book Title</label>
            <input id="title" type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <label for="image">Book Cover URL</label>
            <input id="image" type="text" name="image" value={image} onChange={(e) => setImage(e.target.value)}  />
            <label>Preview</label>
            <div className="data">
                <div className="preview">
                    <img src={image} onError={e => {
                        if (e.currentTarget.src !== noImage) e.currentTarget.src = noImage;
                        else e.currentTarget.onerror = null;
                    }}/>
                    <div className="text">
                        <h2>{title}</h2>
                    </div>
                </div>
            </div>
            <button onClick={submit}>Register new book</button>
            <div className="warning">{warning || ""}</div>
        </div>
    )
}