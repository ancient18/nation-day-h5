import { ReactElement, useEffect } from "react";

import { back } from "../../../../assets/images/tech-future/images";

import { Link } from "react-router-dom";

import { API_URL } from "../../../../config"

const SuccessWindow = (): ReactElement => {
    useEffect(() => {
        if (sessionStorage.getItem("stuID")) {
            fetch(`${API_URL}/complete/tech_future`, {
                method: "POST",
                body: JSON.stringify({
                    stu_number: sessionStorage.getItem("stuID")
                })
            })
        } else {
            sessionStorage.setItem("tech_future", "true")
        }
    }, [])
    return <div className="success-window">
        <div className="background">
            <Link to="/selection"><img className="back" src={back.src} /></Link>
        </div>
    </div>
}

export default SuccessWindow;