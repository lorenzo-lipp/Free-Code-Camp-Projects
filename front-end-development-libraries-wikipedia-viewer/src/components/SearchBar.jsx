import { useRef, useState } from "react";

export default function SearchBar(props) {
    const [active, setActive] = useState(false);
    const [hasSearch, setHasSearch] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const inputBox = useRef(null);
    const searchBox = useRef(null);

    const handleEnter = () => {
        if (inputValue !== "") {
            props.callback(inputValue);
            setHasSearch(true);
            setInputValue("");
            setActive(false);
        } else {
            setActive(true);
            inputBox.current.focus();
        }
    }

    return (
        <div className={"search-bar " + (hasSearch ? "active" : "no-search")}>
            <input 
                ref={inputBox}
                className={active ? "active" : ""} 
                type="text" value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                onBlur={() => setTimeout(() => {
                        if (inputBox.current !== document.activeElement) {
                            setActive(false);
                            setInputValue("");
                        }
                    }, 300)
                } 
                onKeyUp={(e) => e.key === "Enter" && handleEnter()}
            />
            <button ref={searchBox} type="submit" onClick={handleEnter}>🔎</button>
        </div>
    );
}