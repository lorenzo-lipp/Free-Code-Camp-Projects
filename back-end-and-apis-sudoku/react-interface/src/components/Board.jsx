import Cell from "./Cell.jsx";

export default function Board(props) {
    return (
        <div className="board">
            <div className="region">
                <Cell num={0} parent={props} />
                <Cell num={1} parent={props} />
                <Cell num={2} parent={props} />
                <Cell num={9} parent={props} />
                <Cell num={10} parent={props} />
                <Cell num={11} parent={props} />
                <Cell num={18} parent={props} />
                <Cell num={19} parent={props} />
                <Cell num={20} parent={props} />
            </div>
            <div className="region">
                <Cell num={3} parent={props} />
                <Cell num={4} parent={props} />
                <Cell num={5} parent={props} />
                <Cell num={12} parent={props} />
                <Cell num={13} parent={props} />
                <Cell num={14} parent={props} />
                <Cell num={21} parent={props} />
                <Cell num={22} parent={props} />
                <Cell num={23} parent={props} />
            </div>
            <div className="region">
                <Cell num={6} parent={props} />
                <Cell num={7} parent={props} />
                <Cell num={8} parent={props} />
                <Cell num={15} parent={props} />
                <Cell num={16} parent={props} />
                <Cell num={17} parent={props} />
                <Cell num={24} parent={props} />
                <Cell num={25} parent={props} />
                <Cell num={26} parent={props} />
            </div>
            <div className="region">
                <Cell num={27} parent={props} />
                <Cell num={28} parent={props} />
                <Cell num={29} parent={props} />
                <Cell num={36} parent={props} />
                <Cell num={37} parent={props} />
                <Cell num={38} parent={props} />
                <Cell num={45} parent={props} />
                <Cell num={46} parent={props} />
                <Cell num={47} parent={props} />
            </div>
            <div className="region">
                <Cell num={30} parent={props} />
                <Cell num={31} parent={props} />
                <Cell num={32} parent={props} />
                <Cell num={39} parent={props} />
                <Cell num={40} parent={props} />
                <Cell num={41} parent={props} />
                <Cell num={48} parent={props} />
                <Cell num={49} parent={props} />
                <Cell num={50} parent={props} />
            </div>
            <div className="region">
                <Cell num={33} parent={props} />
                <Cell num={34} parent={props} />
                <Cell num={35} parent={props} />
                <Cell num={42} parent={props} />
                <Cell num={43} parent={props} />
                <Cell num={44} parent={props} />
                <Cell num={51} parent={props} />
                <Cell num={52} parent={props} />
                <Cell num={53} parent={props} />
            </div>
            <div className="region">
                <Cell num={54} parent={props} />
                <Cell num={55} parent={props} />
                <Cell num={56} parent={props} />
                <Cell num={63} parent={props} />
                <Cell num={64} parent={props} />
                <Cell num={65} parent={props} />
                <Cell num={72} parent={props} />
                <Cell num={73} parent={props} />
                <Cell num={74} parent={props} />
            </div>
            <div className="region">
                <Cell num={57} parent={props} />
                <Cell num={58} parent={props} />
                <Cell num={59} parent={props} />
                <Cell num={66} parent={props} />
                <Cell num={67} parent={props} />
                <Cell num={68} parent={props} />
                <Cell num={75} parent={props} />
                <Cell num={76} parent={props} />
                <Cell num={77} parent={props} />
            </div>
            <div className="region">
                <Cell num={60} parent={props} />
                <Cell num={61} parent={props} />
                <Cell num={62} parent={props} />
                <Cell num={69} parent={props} />
                <Cell num={70} parent={props} />
                <Cell num={71} parent={props} />
                <Cell num={78} parent={props} />
                <Cell num={79} parent={props} />
                <Cell num={80} parent={props} />
            </div>
        </div>
    )
}