
import { createImage } from "../utils"


{/*将陨石，飞船，背景图片作为路径作为模块导入，便于使用*/ }
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


{/*将所有陨石作为一个数组导出，便于随机生成*/ }
export const StonesProperties: Array<IPicture> = [
    {
        coordinate: {
            x: 13,
            y: 854
        },
        size: {
            x: 34,
            y: 34
        },
        velocity: {
            x: 0,
            y: 1
        },
        src: stone1,
        destroyed: false
    }, {
        coordinate: {
            x: 256,
            y: 363
        },
        size: {
            x: 21,
            y: 21
        },
        velocity: {
            x: 0,
            y: 1
        },
        src: stone2,
        destroyed: false
    }, {
        coordinate: {
            x: 31,
            y: 100
        },
        size: {
            x: 56,
            y: 56
        },
        velocity: {
            x: 0,
            y: 1
        },
        src: stone3,
        destroyed: false
    }, {
        coordinate: {
            x: 330,
            y: 869
        },
        size: {
            x: 96,
            y: 120
        },
        velocity: {
            x: 0,
            y: 1
        },
        src: stone4,
        destroyed: false
    }, {
        coordinate: {
            x: 350,
            y: 1768
        },
        size: {
            x: 50,
            y: 60
        },
        velocity: {
            x: 0,
            y: 1
        },
        src: stone5,
        destroyed: false
    }, {
        coordinate: {
            x: 16,
            y: 1691
        },
        size: {
            x: 77,
            y: 77
        },
        velocity: {
            x: 0,
            y: 1
        },
        src: stone6,
        destroyed: false
    }, {
        coordinate: {
            x: 330,
            y: 854
        },
        size: {
            x: 93,
            y: 140
        },
        velocity: {
            x: 0,
            y: 1
        },
        src: stone7,
        destroyed: false
    }, {
        coordinate: {
            x: 105,
            y: 1486
        },
        size: {
            x: 54,
            y: 54
        },
        velocity: {
            x: 0,
            y: 1
        },
        src: stone8,
        destroyed: false
    }, {
        coordinate: {
            x: 6,
            y: 2263
        },
        size: {
            x: 66,
            y: 66
        },
        velocity: {
            x: 0,
            y: 1
        },
        src: stone9,
        destroyed: false
    }, {
        coordinate: {
            x: 77,
            y: 942
        },
        size: {
            x: 52,
            y: 52
        },
        velocity: {
            x: 0,
            y: 1
        },
        src: stone10,
        destroyed: false
    }, {
        coordinate: {
            x: 11,
            y: 1818
        },
        size: {
            x: 129,
            y: 99
        },
        velocity: {
            x: 0,
            y: 1
        },
        src: stone11,
        destroyed: false
    }, {
        coordinate: {
            x: 278,
            y: 1342
        },
        size: {
            x: 194,
            y: 185
        },
        velocity: {
            x: 0,
            y: 1
        },
        src: stone12,
        destroyed: false
    }, {
        coordinate: {
            x: 121,
            y: 1069
        },
        size: {
            x: 119,
            y: 131
        },
        velocity: {
            x: 0,
            y: 1
        },
        src: stone13,
        destroyed: false
    }, {
        coordinate: {
            x: -20,
            y: 574
        },
        size: {
            x: 241,
            y: 290
        },
        velocity: {
            x: 0,
            y: 1
        },
        src: stone14,
        destroyed: false
    }, {
        coordinate: {
            x: 117,
            y: 292
        },
        size: {
            x: 140,
            y: 123
        },
        velocity: {
            x: 0,
            y: 1
        },
        src: stone15,
        destroyed: false
    }, {
        coordinate: {
            x: 209,
            y: 136
        },
        size: {
            x: 158,
            y: 136
        },
        velocity: {
            x: 0,
            y: 1
        },
        src: stone16,
        destroyed: false
    }, {
        coordinate: {
            x: 11,
            y: 854
        },
        size: {
            x: 36,
            y: 36
        },
        velocity: {
            x: 0,
            y: 1
        },
        src: stone17,
        destroyed: false
    },
]

{/*导出飞船图片的路径*/ }
export { spacecraft as SpacecraftSrc }

{/*导出背景图片的路径*/ }
export { bgc as BgcSrc }


export type Vector = {
    x: number,
    y: number,
}

export interface IPicture {
    coordinate: Vector,
    size: Vector,
    velocity: Vector,
    src: string,
    destroyed?: boolean
}

export interface ISpaceship extends IPicture {
    image: HTMLImageElement
}

export interface IBaseStone extends IPicture {
    image: HTMLImageElement
}

export class MoveItem {
    coordinate: Vector
    size: Vector
    velocity: Vector
    image: HTMLImageElement
    destroyed?: boolean
    constructor(params: IPicture) {
        this.coordinate = params.coordinate
        this.size = params.size
        this.velocity = params.velocity
        this.image = createImage(params.src, params.size)
        this.destroyed = params.destroyed
    }
    changeSpeed(speed: Vector) {
        this.velocity = speed
        this.coordinate.x += this.velocity.x
        this.coordinate.y += this.velocity.y
    }
}