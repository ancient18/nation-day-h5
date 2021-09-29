import { ReactElement } from "react";

import { playAgain, selectGame } from "../../../../assets/images/tech-future/images";

import { useHistory, Link } from 'react-router-dom';

const FailWindow = (): ReactElement => {
    const history = useHistory()
    function refresh() {
        history.push('/tech-future/reload')
    }
    return (
        <div className="fail-window">
            <div className="background">
                <Link to="/tech-future/reload">
                    <img className="play-again" src={playAgain.src} />
                </Link>
                <Link to="/selection">
                    <img className="select-game" src={selectGame.src} />
                </Link>
            </div>
        </div>
    )
}

export default FailWindow;