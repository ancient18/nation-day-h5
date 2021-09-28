import { Vector } from "../type"

import { ISpaceship, IBaseStone, MoveItem, staticPicture } from '../type'

export const createImage: (src: string, size: Vector) => HTMLImageElement = (src: string, size: Vector) => {
    const img = new Image(size.x, size.y)
    img.src = src
    return img
}

export const fillPicture = (ctx: CanvasRenderingContext2D, body: MoveItem | MoveItem[] | staticPicture) => {
    if (Array.isArray(body)) {
        body.forEach(item => {
            // ctx.strokeStyle = 'white'
            // ctx.strokeRect(item.coordinate.x + item.size.x * 0.05, item.coordinate.y, item.size.x * 0.9, item.size.y * 0.9)
            ctx.drawImage(item.image, item.coordinate.x, item.coordinate.y, item.size.x, item.size.y)
        })
    } else {
        // ctx.strokeStyle = 'white'
        // ctx.strokeRect(body.coordinate.x + body.size.x * 0.05, body.coordinate.y, body.size.x * 0.9, body.size.y * 0.9)

        ctx.drawImage(body.image, body.coordinate.x, body.coordinate.y, body.size.x, body.size.y)
    }
}

// 用于判断陨石是否与飞船碰撞的函数
export const isColliding = (spaceship: MoveItem, stone: MoveItem) => {
    //  首先计算出 陨石 和 飞船中心距离
    const xDistance = Math.abs(stone.coordinate.x + stone.size.x / 2 - spaceship.coordinate.x - spaceship.size.x / 2)
    // 根据产品的意见，将飞机拆分成机身机翼两个部分, x1 是机身中心到边界距离， x2是机翼到边界距离
    const x1 = spaceship.size.x / 6
    const x2 = spaceship.size.x / 4

    const yDistance = stone.size.y + stone.coordinate.y - spaceship.coordinate.y

    const y1 = spaceship.size.y / 2
    const y2 = spaceship.size.y * 3 / 4
    const y3 = spaceship.size.y + stone.size.y

    if (yDistance >= 30 && yDistance <= y1 && xDistance <= x1 + stone.size.x / 2) {
        console.log('1')
        stone.destroyed = true
        spaceship.destroyed = true
    } else if (yDistance >= y1 && yDistance <= y2 && xDistance <= x2 + stone.size.x / 2) {
        console.log('2')
        stone.destroyed = true
        spaceship.destroyed = true
    } else if (yDistance >= y2 && yDistance <= y3 - 10 && xDistance <= x1 + stone.size.x / 3) {
        console.log('3')
        stone.destroyed = true
        spaceship.destroyed = true
    }

}