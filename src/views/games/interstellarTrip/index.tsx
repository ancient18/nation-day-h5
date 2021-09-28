import { ReactElement, useRef, useEffect } from "react";

import "../../../assets/styles/interstellarTrip.less"

import {
    ISpaceship, IBaseStone, Vector, IPicture,
    MoveItem
} from "./type"

import { StonesProperties, SpacecraftSrc, BgcSrc } from "./type"

// 用于绘制画布的函数
import { fillPicture, isColliding } from "./utils"

let Stones: MoveItem[]

let player: MoveItem

let bgc: MoveItem

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

        // let moveStatus: boolean = false

        if (coordX <= lastX + player.size.x + 30
            && coordX >= lastX - 30
            && coordY <= lastY + player.size.y + 50
            && coordY >= lastY - 50
        ) {
            if (Math.abs(moveCoordX - player.coordinate.x) >= 10) {
                moveCoordX - player.coordinate.x > 0 ? player.changeSpeed({ x: 1, y: 0 }) : player.changeSpeed({ x: -1, y: 0 })
            } else {
                player.changeSpeed({ x: 0, y: 0 })
            }
        }

    }

    const spaceMoveEnd = () => {
        moveCoordX = player.coordinate.x + player.size.x / 2
        player.velocity.x = 0
    }

    useEffect(() => {
        height = document.documentElement.clientHeight;
        width = document.documentElement.clientWidth;
        canvasRef.current!.setAttribute("height", height.toString());
        canvasRef.current!.setAttribute("width", width.toString());
        context = canvasRef.current?.getContext('2d')!;
        {/*算出比例，根据比例适配不同屏幕 */ }
        const ratio = width / 375;

        StonesProperties.forEach((item) => {
            item.coordinate.x *= ratio
            item.coordinate.y = Math.floor(12 * Math.random()) * ((-height - 300) / 12)
            item.size.x = item.size.x * ratio / 2
            item.size.y = item.size.y * ratio / 2
        })

        Stones = Array.from({ length: 15 }, (_, i) => (
            new MoveItem(StonesProperties[Math.floor(Math.random() * 17)])
        ))

        console.log(Stones);


        player = new MoveItem({
            coordinate: { x: (width - 60 * ratio) / 2, y: height - 100 * ratio },
            size: { x: 60 * ratio, y: 80 * ratio },
            velocity: { x: 0, y: 0 },
            destroyed: false,
            src: SpacecraftSrc
        })

        bgc = new MoveItem({
            coordinate: { x: 0, y: -width * 6.4 + height },
            size: { x: width, y: width * 6.4 },
            velocity: { x: 0, y: (width * 6.4 - height) / (15 * FPS) },
            src: BgcSrc,
        })

        setInterval(() => {

            if (coordX <= lastX + player.size.x + 30
                && coordX >= lastX - 30
                && coordY <= lastY + player.size.y + 50
                && coordY >= lastY - 50
            ) {
                if (Math.abs(moveCoordX - player.coordinate.x - player.size.x / 2) >= 10) {
                    moveCoordX - player.coordinate.x > 0 ? player.changeSpeed({ x: 1, y: 0 }) : player.changeSpeed({ x: -1, y: 0 })
                } else {
                    player.changeSpeed({ x: 0, y: 0 })
                }
            }

            if (counter > 12 * FPS) {
                if (!context) return
                context.clearRect(0, 0, width, height)
                context.fillStyle = "pink"
                context.font = "48px serif";
                context.fillText("挑战成功", 100, 250)
            } else if (!player.destroyed) {
                if (!context) return
                context.clearRect(0, 0, width, height)
                counter++
                fillPicture(context, bgc)
                fillPicture(context, player)
                fillPicture(context, Stones)
                player.coordinate.x += player.velocity.x
                bgc.coordinate.y += bgc.velocity.y
                Stones.forEach(item => {
                    item.changeSpeed({ x: 0, y: 1 })
                    isColliding(player, item)
                })

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