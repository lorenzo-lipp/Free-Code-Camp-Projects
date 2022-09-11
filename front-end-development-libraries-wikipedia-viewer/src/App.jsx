import { useState } from 'react';
import SearchBar from './components/SearchBar.jsx';
import './App.css'
import SearchResult from './components/SearchResult.jsx';

export default function App() {
    const [data, setData] = useState({});
    const [showResult, setShowResult] = useState(false);

    const getSearch = (param) => {
        fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${param}&origin=*&format=json`)
            .then(response => response.json())
            .then(data => {
              setData(data);
              if (data.query) setShowResult(true);
            })
            .catch(e => console.log(e));
    }

    return (
        <main>
            <SearchBar callback={getSearch} />
            <h1 className="title">
                <a href="https://en.wikipedia.org/wiki/Special:Random">
                    <span>WikiPedia</span>
                </a>
            </h1>
            <div className={"results " + (showResult ? "show" : "")}>
                {showResult ? data.query.search.map((v, i) => (<SearchResult key={`search-key-${i}`} title={v.title} snippet={v.snippet} pageid={v.pageid} />)) : ""}
            </div>
        </main>
    )
}
