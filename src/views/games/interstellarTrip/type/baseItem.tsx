import { createImage } from "../utils"

export type Vector = {
    x: number,
    y: number,
}

export interface IStaticPage {
    coordinate: Vector,
    size: Vector,
    src: string
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

export interface ITest extends IPicture {
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
    moveItem() {
        this.coordinate.x += this.velocity.x
        this.coordinate.y += this.velocity.y
    }
}

export class staticPicture {
    coordinate: Vector
    size: Vector
    image: HTMLImageElement
    constructor(params: IStaticPage) {
        this.coordinate = params.coordinate
        this.size = params.size
        this.image = createImage(params.src, params.size)
    }
}