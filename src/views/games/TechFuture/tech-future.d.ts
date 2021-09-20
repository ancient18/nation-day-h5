type Vector = {
    x: number,
    y: number,
}

interface BasicBody {
    coordinate: Vector,
    size: Vector,
}

interface MovableBody extends BasicBody {
    velocity: Vector,
    status: string,
}

interface RewardingItem extends BasicBody {
    visible: boolean
}
