export default function Cell(props) {
    return (
       <div 
            className={
                "cell" + 
                (props.parent.activeCell === props.num ? " active" : "") + 
                (props.parent.game[props.num] === props.parent.solution[props.num] ? "" : " wrong")
            } 
            onClick={() => props.parent.selectCell(props.num)}
        >
            {props.parent.game[props.num] === "." ? "" : props.parent.game[props.num]}
        </div> 
    );
}