import { ReactElement, useState } from "react";
import { Link } from "react-router-dom";

import * as images from "../../assets/images/selection"

type Props = {
    type: "antiEpidemic" | "techFuture" | "interstellarTrip" | "harvest";
    done: boolean;
}

/**
 * 用日语罗马音做个组件名不过分吧？
 * 
 * 選択肢「せんたくし」「SENTAKUSHI」
**/

function mapImageName(name: string): string {
    switch (name) {
        case "antiEpidemic": return "anti-epidemic";
        case "techFuture": return "tech-future";
        case "interstellarTrip": return "interstellar-trip";
        default: return name;
    }
}

const Sentakushi = ({ type, done }: Props): ReactElement => {
    const [expand, setExpand] = useState(false);
    return (
        <div
            className={`sentakushi ${type} ${expand ? "expanded" : ""}`}
        >
            <img
                className="triangle"
                src={images.triangle}
                onClick={() => setExpand(!expand)}
            ></img>
            <img
                className="preview"
                src={images[`${type}`]}
                onClick={() => setExpand(!expand)}
            ></img>
            <Link to={mapImageName(type)}>
                <img src={images.startGame} className="start-game" />
            </Link>
        </div>
    )
}

export default Sentakushi;

