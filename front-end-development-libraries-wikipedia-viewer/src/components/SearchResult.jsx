export default function SearchResult(props) {
    return (
        <div className="search-result">
            <h2>{props.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: props.snippet + "..." }}></p>
            <a href={"https://en.wikipedia.org/?curid=" + props.pageid}><button>Visit page</button></a>
        </div>
    )
}