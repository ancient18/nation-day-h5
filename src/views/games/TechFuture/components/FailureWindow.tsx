import { ReactElement } from "react";

import { playAgain, selectGame } from "../../../../assets/images/tech-future/images";

import { Link } from "react-router-dom";

const FailWindow = (): ReactElement => {
    return (
        <div className="fail-window">
            <div className="background">
                <img className="play-again" src={playAgain.src} onClick={() => window.location.reload()}/>
                <Link to="/selection"><img className="select-game" src={selectGame.src} /></Link>
            </div>
        </div>
    )
}

export default FailWindow;