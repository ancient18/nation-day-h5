type Vector = {
    x: number,
    y: number,
}

interface BasicBody {
    coordinate: Vector,
    size: Vector,
    image: HTMLImageElement
}

interface MovableBody extends BasicBody {
    velocity: Vector,
    status: string,
}

interface Item extends BasicBody {
    visible: boolean
}
