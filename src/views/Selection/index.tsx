import { ReactElement } from "react";

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

const Selection = (): ReactElement => {
    return (
        <div className="selection">
            <Sentakushi type="harvest" />
            <Sentakushi type="interstellarTrip" />
            <Sentakushi type="antiEpidemic" />
            <Sentakushi type="techFuture" />
        </div>
    )
}

export default Selection;