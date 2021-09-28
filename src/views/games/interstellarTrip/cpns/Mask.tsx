import "../../../../assets/styles/main.less"
import mask from "../../../../assets/images/interstellarTrip/mask.png"

import { ReactElement } from "react";

type Props = {
    src: string
}

export const Mask = (): ReactElement =>
(<div >
    <img className="mask" src={mask} />
</div>)