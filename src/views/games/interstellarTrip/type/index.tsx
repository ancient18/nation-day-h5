import stone1 from "../../../../assets/images/interstellarTrip/stone1.png"
import stone2 from "../../../../assets/images/interstellarTrip/stone2.png"
import stone3 from "../../../../assets/images/interstellarTrip/stone3.png"
import stone4 from "../../../../assets/images/interstellarTrip/stone4.png"
import stone5 from "../../../../assets/images/interstellarTrip/stone5.png"
import stone6 from "../../../../assets/images/interstellarTrip/stone6.png"
import stone7 from "../../../../assets/images/interstellarTrip/stone7.png"
import stone8 from "../../../../assets/images/interstellarTrip/stone8.png"
import stone9 from "../../../../assets/images/interstellarTrip/stone9.png"
import stone10 from "../../../../assets/images/interstellarTrip/stone10.png"
import stone11 from "../../../../assets/images/interstellarTrip/stone11.png"
import stone12 from "../../../../assets/images/interstellarTrip/stone12.png"
import stone13 from "../../../../assets/images/interstellarTrip/stone13.png"
import stone14 from "../../../../assets/images/interstellarTrip/stone14.png"
import stone15 from "../../../../assets/images/interstellarTrip/stone15.png"
import stone16 from "../../../../assets/images/interstellarTrip/stone16.png"
import stone17 from "../../../../assets/images/interstellarTrip/stone17.png"
import spacecraft from "../../../../assets/images/interstellarTrip/Spacecraft.png"
import bgc from "../../../../assets/images/interstellarTrip/bgc.png"

export const StonesSrc: Array<string> = [
    stone1, stone2, stone3,
    stone4, stone5, stone6,
    stone7, stone8, stone9,
    stone10, stone11, stone12,
    stone13, stone14, stone15,
    stone16, stone17
]

export { spacecraft as SpacecraftSrc }

export { bgc as BgcSrc }

export type Vector = {
    x: number,
    y: number,
}

export interface Picture {
    coordinate: Vector,
    size: Vector,
    velocity: Vector,
    src: string,
}

export interface Spaceship extends Picture {
    destroyed: boolean,
}

export interface BaseStone extends Picture {
    coordinate: Vector
    velocity: Vector,
    size: Vector,
    src: string,
}