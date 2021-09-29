import { ReactElement, useRef, useEffect, useState } from "react";

import styles from "../../../assets/styles/interstellarTrip.module.less"

import { CountDown } from "../../../components"
// type中导出一些类和接口
import {
    ISpaceship, IBaseStone, Vector, IPicture,
    MoveItem, IStaticPage, staticPicture
} from "./type"

import { StonesProperties, SpacecraftSrc, BgcSrc } from "./type"

// 图片也放在 type 里导出
import { spaceLight } from './type'
// 用于绘制画布的函数
import { fillPicture, isColliding } from "./utils"

import { Success, Mask, Failure } from "./cpns"

let Stones: MoveItem[]

let player: MoveItem

let light: MoveItem

let bgc: MoveItem

let vectoryPage: staticPicture

let faillingPage: staticPicture

let againBtn: staticPicture

let changeBtn: staticPicture

const FPS = 100;

const InterstellarTrip = (): ReactElement => {
    const canvasRef: React.RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null)
    let context: CanvasRenderingContext2D
    let coordX: number = 0
    let coordY: number = 0
    let counter: number = 0
    let lastX: number = 0
    let lastY: number = 0
    let moveCoordX: number
    let moveCoordY: number
    const [state, setState] = useState(0)
    const [status, setStatus] = useState<"LOADING" | "COMPLETED">("LOADING")
    const height = document.documentElement.clientHeight;
    const width = document.documentElement.clientWidth;

    const ratio = width / 375;

    /* 这里修改这个数组是为了对屏幕的宽度和高度做适配
        coordinate.x 和 coordinate 分别加上 size.x/2 和 size.y/2 是因为 
        视觉给的图都是从左边框和上边框的中心位置开始计算
        但是实际 canvas 绘图是从左上角绘制
    */
    const StonesProperties1: IPicture[] = StonesProperties.map((item) => {
        // item.coordinate.x = (item.coordinate.x - item.size.x * ratio / 2) * ratio
        const x1 = (item.coordinate.x) * ratio
        const y1 = item.coordinate.y - 2400 + height
        const x2 = item.size.x * ratio
        const y2 = item.size.y * ratio
        const velocity = { x: 0, y: (width * 6.4 - height) / (15 * FPS) }
        return {
            coordinate: { x: x1, y: y1 },
            size: { x: x2, y: y2 },
            velocity,
            src: item.src,
            destroyed: item.destroyed
        }
    })

    Stones = Array.from({ length: 27 }, (_, i) => (
        new MoveItem(StonesProperties1[i])
    ))

    player = new MoveItem({
        coordinate: { x: (width - 60 * ratio) / 2, y: height - 150 * ratio },
        size: { x: 60 * ratio, y: 82 * ratio },
        velocity: { x: 0, y: 0 },
        destroyed: false,
        src: SpacecraftSrc
    })

    light = new MoveItem({
        coordinate: { x: (width - 25 * ratio) / 2, y: height - 85 * ratio },
        size: { x: 25 * ratio, y: 43 * ratio },
        velocity: { x: 0, y: 0 },
        destroyed: false,
        src: spaceLight
    })

    bgc = new MoveItem({
        coordinate: { x: 0, y: -width * 6.4 + height },
        size: { x: width, y: width * 6.4 },
        velocity: { x: 0, y: (width * 6.4 - height) / (15 * FPS) },
        src: BgcSrc,
    })
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
            if (player.coordinate.x <= 0) {
                player.changeSpeed({ x: 1.5, y: 0 })
                light.changeSpeed({ x: 1.5, y: 0 })
            } else if (player.coordinate.x + player.size.x + 5 > width) {
                player.changeSpeed({ x: -1.5, y: 0 })
                light.changeSpeed({ x: -1.5, y: 0 })
            }
            else if (Math.abs(moveCoordX - player.coordinate.x - player.size.x / 2) >= 10) {
                if (moveCoordX - player.coordinate.x > 0) {
                    player.changeSpeed({ x: 1.5, y: 0 })
                    light.changeSpeed({ x: 1.5, y: 0 })
                } else {
                    player.changeSpeed({ x: -1.5, y: 0 })
                    light.changeSpeed({ x: -1.5, y: 0 })
                }
            } else {
                player.changeSpeed({ x: 0, y: 0 })
                light.changeSpeed({ x: 0, y: 0 })
            }
        }

    }

    const spaceMoveEnd = () => {
        moveCoordX = player.coordinate.x + player.size.x / 2
        player.velocity.x = 0
    }
    let timer: NodeJS.Timeout
    useEffect(() => {
        canvasRef.current?.setAttribute("height", height.toString());
        canvasRef.current?.setAttribute("width", width.toString());
        context = canvasRef.current?.getContext('2d')!;

        /*算出比例，根据比例适配不同屏幕 */
        if (status === "LOADING") {
            if (!context) return
            let timer0 = setInterval(() => {
                fillPicture(context, bgc)
                fillPicture(context, player)
                fillPicture(context, light)
                fillPicture(context, Stones)
            }, 100)
            setTimeout(() => {
                setStatus("COMPLETED")
                clearInterval(timer0)
            }, 4000)
        }
        if (status === "COMPLETED") {
            timer = setInterval(() => {
                if (coordX <= lastX + player.size.x + 30
                    && coordX >= lastX - 30
                    && coordY <= lastY + player.size.y + 50
                    && coordY >= lastY - 50
                ) {
                    if (player.coordinate.x <= 0) {
                        player.changeSpeed({ x: 1.5, y: 0 })
                        light.changeSpeed({ x: 1.5, y: 0 })
                    } else if (player.coordinate.x + player.size.x + 5 > width) {
                        player.changeSpeed({ x: -1.5, y: 0 })
                        light.changeSpeed({ x: -1.5, y: 0 })
                    }
                    else if (Math.abs(moveCoordX - player.coordinate.x - player.size.x / 2) >= 10) {
                        if (moveCoordX - player.coordinate.x > 0) {
                            player.changeSpeed({ x: 1.5, y: 0 })
                            light.changeSpeed({ x: 1.5, y: 0 })
                        } else {
                            player.changeSpeed({ x: -1.5, y: 0 })
                            light.changeSpeed({ x: -1.5, y: 0 })
                        }
                    } else {
                        player.changeSpeed({ x: 0, y: 0 })
                        light.changeSpeed({ x: 0, y: 0 })
                    }
                }

                if (counter > 15 * FPS) {
                    // 游戏结束
                    if (!context) return
                    context.clearRect(0, 0, width, height)
                    fillPicture(context, bgc)
                    fillPicture(context, player)
                    fillPicture(context, light)
                    fillPicture(context, Stones)
                    player.coordinate.x += player.velocity.x
                    light.coordinate.x += light.velocity.x
                    player.coordinate.y += -(width * 6.4 - height) / (15 * FPS)
                    light.coordinate.y += -(width * 6.4 - height) / (15 * FPS)
                    if (player.coordinate.y <= 10) {
                        clearInterval(timer)
                        setState(2)
                    }
                } else if (!player.destroyed) {
                    // 飞船没有被摧毁，游戏也还没有结束
                    if (!context) return
                    context.clearRect(0, 0, width, height)
                    counter++
                    fillPicture(context, bgc)
                    fillPicture(context, player)
                    fillPicture(context, light)
                    fillPicture(context, Stones)
                    player.coordinate.x += player.velocity.x
                    light.coordinate.x += light.velocity.x
                    bgc.coordinate.y += bgc.velocity.y
                    Stones.forEach(item => {
                        item.changeSpeed({ x: 0, y: (width * 6.4 - height) / (15 * FPS) })
                        isColliding(player, item)
                    })
                } else {
                    // 飞船被摧毁
                    if (!context) return
                    context.clearRect(0, 0, width, height)
                    fillPicture(context, bgc)
                    fillPicture(context, Stones)
                    setState(3)
                    clearInterval(timer)
                }
            }
                , 1000 / FPS)
        }
    }, [status])


    return (
        <div className={styles.interstellar_trip}>
            {(() => {
                if (state == 2) {
                    return (
                        <>
                            <Mask />
                            <Success />
                        </>
                    )
                } else if (state == 3) {
                    return (
                        <>
                            <Mask />
                            <Failure />
                        </>
                    )
                }
            })()}
            {(() => {
                if (status == 'LOADING') {
                    return (<CountDown />)
                }
            })()}
            <canvas
                ref={canvasRef}
                id={styles.interstellartrip}
                onTouchStart={spaceMoveStart}
                onTouchMove={spaceMoved}
                onTouchEnd={spaceMoveEnd} >
            </canvas>
        </div>
    )
}


export default InterstellarTrip;