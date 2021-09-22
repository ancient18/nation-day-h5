type Vector = {
    x: number,
    y: number,
}

interface Sprite {
    coordinate: Vector,
    size: Vector,
    image: HTMLImageElement
}

interface Player extends Sprite {
    velocity: Vector,
    status: string,
    collision: {
        top: number,
        left: number,
        height: number,
        width: number
    }
}

interface Reward extends Sprite {
    visible: boolean
}
