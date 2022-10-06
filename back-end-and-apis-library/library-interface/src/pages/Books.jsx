import { useEffect, useState } from "react";
import { noImage } from "../utils/utils";

export default function Books(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = () => {
        fetch('https://library.lorenzo-lipp.repl.co/api/books')
            .then(response => response.json())
            .then(response => {
                setData(response);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }

    useEffect(getData, []);

    return (
        loading ? <div className="loading">Loading...</div> :
        <div className="data">
            {data.map((v, i) => (
                <div className="preview" key={"data" + i}>
                    <a href={"https://library.lorenzo-lipp.repl.co/book/" + v._id}>
                        <img src={v.image} 
                            onError={e => {
                                if (e.currentTarget.src !== noImage) e.currentTarget.src = noImage;
                                else e.currentTarget.onerror = null;
                            }}
                        />
                    </a>
                    <div className="text">
                        <h2>{v.title}</h2>
                        <a href={"https://library.lorenzo-lipp.repl.co/book/" + v._id}><p>Reviews: {v.commentcount}</p></a>
                    </div>
                    <div className="edit">
                        <a href={"https://library.lorenzo-lipp.repl.co/review-book/" + v._id}>
                            <svg viewBox="0 0 31.982 31.982">
                                <path d="M3.952,23.15L0,31.955l8.767-3.992l0.018,0.019L3.938,23.13L3.952,23.15z M4.602,22.463L24.634,2.432l4.849,4.848   L9.45,27.312L4.602,22.463z M30.883,0.941c-2.104-1.963-4.488-0.156-4.488-0.156l4.851,4.843   C31.244,5.627,33.124,3.375,30.883,0.941z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            ))}
        </div>
    )
}