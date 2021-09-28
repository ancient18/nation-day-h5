import { Vector } from "../type"

import { ISpaceship, IBaseStone, MoveItem } from '../type'

export const createImage: (src: string, size: Vector) => HTMLImageElement = (src: string, size: Vector) => {
    const img = new Image(size.x, size.y)
    img.src = src
    return img
}

export const fillPicture = (ctx: CanvasRenderingContext2D, body: MoveItem | MoveItem[]) => {
    if (Array.isArray(body)) {
        body.forEach(item => {
            ctx.strokeStyle = 'white'
            ctx.strokeRect(item.coordinate.x, item.coordinate.y, item.size.x, item.size.y)
            ctx.drawImage(item.image, item.coordinate.x, item.coordinate.y, item.size.x, item.size.y)
        })
    } else {
        ctx.strokeStyle = 'white'
        ctx.strokeRect(body.coordinate.x, body.coordinate.y, body.size.x, body.size.y)
        ctx.drawImage(body.image, body.coordinate.x, body.coordinate.y, body.size.x, body.size.y)
    }
}

// 用于判断陨石是否与飞船碰撞的函数
export const isColliding = (Ispaceship: MoveItem, stone: MoveItem) => {
    const xdistance = Ispaceship.coordinate.x - stone.coordinate.x
    const ydistance = Ispaceship.coordinate.y - stone.coordinate.y
    if ((xdistance <= 0 && ydistance <= 0
        && -xdistance <= Ispaceship.size.x
        && -ydistance <= Ispaceship.size.y)
        || (xdistance <= 0 && ydistance >= 0
            && -xdistance <= Ispaceship.size.x
            && ydistance <= stone.size.y)
        || (xdistance >= 0 && ydistance <= 0
            && xdistance <= stone.size.x
            && -ydistance <= Ispaceship.size.y)
        || (xdistance >= 0 && ydistance >= 0
            && xdistance <= stone.size.x
            && ydistance <= stone.size.y)) {
        Ispaceship.destroyed = true
        stone.destroyed = true
    }
}