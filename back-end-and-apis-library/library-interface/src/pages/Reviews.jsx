import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { noImage } from "../utils/utils";

export default function Reviews() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [warning, setWarning] = useState("");

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

    useEffect(getData, []);

    return (
        loading ? <div className="loading">Loading...</div> :
        warning ? <div className="loading">{warning}</div> :
        <div>
            <div className="data">
                <div className="preview">
                    <img src={data.image}
                        onError={e => {
                            if (e.currentTarget.src !== noImage) e.currentTarget.src = noImage;
                            else e.currentTarget.onerror = null;
                        }}
                    />
                    <div className="text">
                        <h2>{data.title}</h2>
                        <p>Reviews: {data.commentcount}</p>
                        <hr />
                        {data.comments.map((v, i) => (<p className="comment" key={"comment" + i}>{v}</p>))}
                    </div>
                    <div className="edit">
                        <a href={"https://library.lorenzo-lipp.repl.co/review-book/" + data._id}>
                            <svg viewBox="0 0 31.982 31.982">
                                <path d="M3.952,23.15L0,31.955l8.767-3.992l0.018,0.019L3.938,23.13L3.952,23.15z M4.602,22.463L24.634,2.432l4.849,4.848   L9.45,27.312L4.602,22.463z M30.883,0.941c-2.104-1.963-4.488-0.156-4.488-0.156l4.851,4.843   C31.244,5.627,33.124,3.375,30.883,0.941z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}