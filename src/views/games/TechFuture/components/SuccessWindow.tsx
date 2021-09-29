import { ReactElement } from "react";

import { back } from "../../../../assets/images/tech-future/images";

import { Link } from "react-router-dom";

const SuccessWindow = (): ReactElement => {
    return <div className="success-window">
        <div className="background">
            <Link to="selection"><img className="back" src={back.src} /></Link>
        </div>
    </div>
}

export default SuccessWindow;