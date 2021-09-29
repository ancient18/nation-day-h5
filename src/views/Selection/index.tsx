import { useState, ReactElement, useEffect } from "react";

import Sentakushi from "./sentakushi";

import "../../assets/styles/selection.less";
import { API_URL } from "../../config"

function getScore(dones: {
    "harvest": boolean,
    "interstellar_trip": boolean,
    "anti_epidemic": boolean,
    "tech_future": boolean,
}) {
    let score = 0;
    if (dones.harvest) score += 50;
    if (dones.interstellar_trip) score += 50;
    if (dones.anti_epidemic) score += 50;
    if (dones.tech_future) score += 50;
    if (score >= 200) score = 300;
    return score;
}

const Selection = (): ReactElement => {
    const [dones, setDones] = useState({
        "harvest": false,
        "interstellar_trip": false,
        "anti_epidemic": false,
        "tech_future": false,
    })

    useEffect(() => {
        fetch(`${API_URL}/status`)
            .then(res => res.json())
            .then(data => {
                if (data.info !== "success") return;
                setDones(data.data)
            })
    }, [])

    useEffect(() => {
        console.log(dones)
    }, [dones])

    return (
        <div className="selection">
            <div className="content">
                <div className="sentakushis">
                    <Sentakushi type="harvest" done={dones.harvest} />
                    <Sentakushi type="interstellarTrip" done={dones.interstellar_trip} />
                    <Sentakushi type="antiEpidemic" done={dones.anti_epidemic} />
                    <Sentakushi type="techFuture" done={dones.tech_future} />
                </div>
                <p>当前总积分： {getScore(dones)}</p>
            </div>
        </div>
    )
}

export default Selection;