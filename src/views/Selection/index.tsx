import { useState, ReactElement, useEffect } from "react";

import {
    antiEpidemic,
    antiEpidemicDone,
    antiEpidemicExpand,

    techFuture,
    techFutureDone,
    techFutureExpand,

    interstellarTrip,
    interstellarTripDone,
    interstellarTripExpand,

    harvest,
    harvestDone,
    harvestExpand,

    background
} from "../../assets/images/selection";

import Sentakushi from "./sentakushi";

import "../../assets/styles/selection.less";
import { API_URL } from "../../config"

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
            <div className="sentakushis">
                <Sentakushi type="harvest" done={dones.harvest} />
                <Sentakushi type="interstellarTrip" done={dones.interstellar_trip} />
                <Sentakushi type="antiEpidemic" done={dones.anti_epidemic} />
                <Sentakushi type="techFuture" done={dones.tech_future} />
            </div>
        </div>
    )
}

export default Selection;