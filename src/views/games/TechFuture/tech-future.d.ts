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
}

interface Reward extends Sprite {
    visible: boolean
}
