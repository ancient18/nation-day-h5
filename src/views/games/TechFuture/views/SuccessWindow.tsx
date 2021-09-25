import { ReactElement } from "react";

import { back } from "../../../../assets/images/tech-future/images";


const SuccessWindow = (): ReactElement => {
    return <div className="success-window">
        <div className="background">
            <img className="back" src={back.src} />
        </div>
    </div>
}

export default SuccessWindow;