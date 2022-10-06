import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { noImage } from "../utils/utils";

export default function ReviewBook() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [warning, setWarning] = useState("");
    const [comment, setComment] = useState("");

    const getData = () => {
        fetch('https://library.lorenzo-lipp.repl.co/api/books/' + id)
            .then(response => response.json())
            .then(response => {
                setData(response);
                setLoading(false);
                setWarning("");
            })
            .catch(() => {
                setLoading(false);
                setWarning("Error: book not found");
            });
    }

    const submit = () => {
        fetch('https://library.lorenzo-lipp.repl.co/api/books/' + id, {
            method: "POST",
            body: JSON.stringify({ comment }),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
            .then(response => response.json())
            .then(() => {
                window.location.href = "/";
            })
            .catch(console.log);
    }

    useEffect(getData, []);

    return (
        loading ? <div className="loading">Loading...</div> :
        warning ? <div className="warning">{warning}</div> :
        <div>
            <div className="data">
                <div className="preview">
                    <a href={"https://library.lorenzo-lipp.repl.co/book/" + data._id}>
                        <img src={data.image}
                            onError={e => {
                                if (e.currentTarget.src !== noImage) e.currentTarget.src = noImage;
                                else e.currentTarget.onerror = null;
                            }}
                        />
                    </a>
                    <div className="text">
                        <h2>{data.title}</h2>
                        <a href={"https://library.lorenzo-lipp.repl.co/book/" + data._id}><p>Reviews: {data.commentcount}</p></a>
                    </div>
                </div>
            </div>
            <div className="center">
                <h2 className="warning">Write a review about this book!</h2>
                <div className="review">
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)}/>
                </div>
                <button onClick={submit}>Submit review</button>
            </div>
        </div>
    )
}