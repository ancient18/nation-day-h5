import { ReactElement, useRef, useEffect } from "react";

import "../../../assets/styles/interstellarTrip.less"

import {
    StonesSrc, SpacecraftSrc, Spaceship,
    BaseStone, Vector, Picture, BgcSrc
} from "./type"

// 用于绘制画布的函数
const fillPicture = (ctx: CanvasRenderingContext2D, body: Spaceship | Picture | BaseStone | BaseStone[]) => {
    if (Array.isArray(body)) {
        body.forEach(item => {
            const img = new Image();
            img.onload = function () {
                ctx.drawImage(img, item.coordinate.x, item.coordinate.y, item.size.x, item.size.y)
            }
            img.src = item.src
        })
    } else {
        const img = new Image();
        img.onload = function () {
            ctx.drawImage(img, body.coordinate.x, body.coordinate.y, body.size.x, body.size.y)
        }
        img.src = body.src
    }
}

// 用于判断陨石是否与飞船碰撞的函数
const isColliding = (spaceship: Spaceship, stone: BaseStone) => {
    const xdistance = spaceship.coordinate.x - stone.coordinate.x
    const ydistance = spaceship.coordinate.y - stone.coordinate.y
    if ((xdistance <= 0 && ydistance <= 0
        && -xdistance <= spaceship.size.x
        && -ydistance <= spaceship.size.y)
        || (xdistance <= 0 && ydistance >= 0
            && -xdistance <= spaceship.size.x
            && ydistance <= stone.size.y)
        || (xdistance >= 0 && ydistance <= 0
            && xdistance <= stone.size.x
            && -ydistance <= spaceship.size.y)
        || (xdistance >= 0 && ydistance >= 0
            && xdistance <= stone.size.x
            && ydistance <= stone.size.y)) {
        spaceship.destroyed = true
    }
}

let Stones: BaseStone[]

let player: Spaceship

let bgc: Picture

const FPS = 100;

const InterstellarTrip = (): ReactElement => {
    const canvasRef: React.RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null)
    let context: CanvasRenderingContext2D
    let height: number = 0
    let width: number = 0
    let coordX: number = 0
    let coordY: number = 0
    let counter: number = 0
    let lastX: number = 0
    let lastY: number = 0
    let moveCoordX: number
    let moveCoordY: number

    const spaceMoveStart = (e: React.TouchEvent) => {
        coordX = e.targetTouches[0].clientX
        coordY = e.targetTouches[0].clientY
        lastX = player.coordinate.x
        lastY = player.coordinate.y
    }

    const spaceMoved = (e: React.TouchEvent) => {
        moveCoordX = e.targetTouches[0].clientX
        moveCoordY = e.targetTouches[0].clientY

        let timer: NodeJS.Timer

        let moveStatus: boolean = false

        // timer = setInterval(() => {
        //     player.velocity.x = 0
        //     moveStatus = true
        // }, 200)
        if (coordX <= lastX + player.size.x + 100
            && coordX >= lastX - 100
            && coordY <= lastY + player.size.y + 50
            && coordY >= lastY - 50
        ) {

            if (Math.abs(moveCoordX - player.coordinate.x) >= 10) {
                moveCoordX - player.coordinate.x > 0 ? player.velocity.x = 2 : player.velocity.x = -2
            } else {
                player.velocity.x = 0
            }
        }

    }

    const spaceMoveEnd = () => {
        player.velocity.x = 0
    }

    useEffect(() => {
        height = document.documentElement.clientHeight;
        width = document.documentElement.clientWidth;
        canvasRef.current!.setAttribute("height", height.toString());
        canvasRef.current!.setAttribute("width", width.toString());
        context = canvasRef.current?.getContext('2d')!;
        Stones = Array.from({ length: 15 }, (v, i) => ({
            coordinate: { x: width * (0.9 - Math.random()), y: -height * 2 / 15 * i },
            size: { x: 40, y: 40 },
            velocity: { x: 0, y: 1 },
            src: StonesSrc[Math.floor(Math.random() * 15)]
        }))

        player = {
            coordinate: { x: (width - 60) / 2, y: height - 100 },
            size: { x: 60, y: 80 },
            velocity: { x: 0, y: 20 },
            destroyed: false,
            src: SpacecraftSrc
        }

        bgc = {
            coordinate: { x: 0, y: -width * 6.4 + height },
            size: { x: width, y: width * 6.4 },
            velocity: { x: 0, y: width * 6.4 / (15 * FPS) },
            src: BgcSrc
        }

        moveCoordX = player.coordinate.x
        moveCoordY = player.coordinate.y

        setInterval(() => {

            if (Math.abs(moveCoordX - player.coordinate.x) >= 10) {
                moveCoordX - player.coordinate.x > 0 ? player.velocity.x = 2 : player.velocity.x = -2
            } else {
                player.velocity.x = 0
            }

            if (counter > 15 * FPS) {
                if (!context) return
                context.clearRect(0, 0, width, height)
                context.fillStyle = "pink"
                context.font = "48px serif";
                context.fillText("挑战成功", 100, 250)
            } else if (!player.destroyed) {
                if (!context) return
                counter++
                // fillCanvas(context, player, "pink")
                bgc.coordinate.y += bgc.velocity.y
                Stones.forEach(item => {
                    // item.coordinate.x += item.velocity.x
                    item.coordinate.y += item.velocity.y
                    // isColliding(player, item)
                })
                fillPicture(context, Stones)
                fillPicture(context, bgc)
                fillPicture(context, player)
                // fillPicture(context, player)

            } else {
                if (!context) return
                context.clearRect(0, 0, width, height)
                context.fillStyle = "pink"
                context.font = "48px serif";
                context.fillText("游戏结束", 100, 250)
            }
        }, 1000 / FPS)

    })


    return (
        <canvas
            ref={canvasRef}
            id="interstellartrip"
            onTouchStart={spaceMoveStart}
            onTouchMove={spaceMoved}
            onTouchEnd={spaceMoveEnd} >
        </canvas>
    )
}


export default InterstellarTrip;