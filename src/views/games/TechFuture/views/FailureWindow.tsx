import { ReactElement } from "react";

import { playAgain, selectGame } from "../../../../assets/images/tech-future/images";


const FailWindow = (): ReactElement => {
    return (
        <div className="fail-window">
            <div className="background">
                <img className="play-again" src={playAgain.src} onClick={() => window.location.reload()}/>
                <img className="select-game" src={selectGame.src} />
            </div>
        </div>
    )
}

export default FailWindow;