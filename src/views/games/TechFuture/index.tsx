import { useRef, ReactElement, useEffect, useState } from "react";

import '../../../assets/styles/techFuture.less';

import { background, juanjuan } from "../../../assets/images/tech-future/images";
import { generateItems } from "./utils/items";

import FailureWindow from "./components/FailureWindow";
import SuccessWindow from "./components/SuccessWindow";
import CountDown from "../../../components/CountDown";

const height = document.documentElement.clientHeight;
const width = document.documentElement.clientWidth;

const FPS = 60;
const gravity = 600;

const initalPlayerWidth = 138 / 667 * height;
const initalPlayerHeight = 80 / 667 * height;

let player: Player;
let camera: Vector;
let items: Reward[];

function init() {
    player = {
        coordinate: {
            x: 0.055 * height,
            y: height / 2,
        },
        velocity: {
            x: 300,
            y: 0,
        },
        size: {
            x: initalPlayerWidth,
            y: initalPlayerHeight
        },
        collision: {
            top: 17 / 667 * height,
            height: 57 / 667 * height,
            left: 30 / 667 * height,
            width: 100 / 667 * height
        },
        status: "normal",
        image: juanjuan,
    }

    camera = {
        x: 0,
        y: 0
    }

    items = generateItems();
}

function drawSprite(ctx: CanvasRenderingContext2D, reward: Reward) {
    // ctx.strokeRect(
    //     reward.coordinate.x - camera.x,
    //     reward.coordinate.y - camera.y,
    //     reward.size.x,
    //     reward.size.y
    // );
    ctx.drawImage(
        reward.image,
        reward.coordinate.x - camera.x,
        reward.coordinate.y - camera.y,
        reward.size.x,
        reward.size.y
    );
}

function graphicalUpdate(context: CanvasRenderingContext2D) {
    context.drawImage(background, -camera.x, -camera.y, height * background.width / background.height, height);

    // context.strokeRect(
    //     player.coordinate.x + player.collision.left - camera.x,
    //     player.coordinate.y + player.collision.top - camera.y,
    //     player.collision.width,
    //     player.collision.height
    // );
    context.drawImage(
        player.image,
        player.coordinate.x - camera.x,
        player.coordinate.y - camera.y,
        player.size.x,
        player.size.y
    );
    items.forEach(item => {
        if (!item.visible) return;
        drawSprite(context, item);
    })

    // console.log(player, items)
}

function physicalUpdate() {
    player.velocity.y = gravity / FPS + player.velocity.y;

    player.coordinate = {
        x: player.velocity.x / FPS + player.coordinate.x,
        y: player.velocity.y / FPS + player.coordinate.y,
    }
    if (
        background.width / background.height * height - player.coordinate.x >
        width - 37 / 667 * height
    ) {
        camera.x = player.coordinate.x - 37 / 667 * height;
    }
    if (player.coordinate.y < 0) {
        player.coordinate.y = 0;
        player.velocity.y = -player.velocity.y / 2;
    }
    if (player.coordinate.y + player.size.y > height) {
        player.coordinate.y = height - player.size.y;
        player.velocity.y = -player.velocity.y / 2;
    }
    items.filter((item) => item.visible).forEach((item) => {
        if (isColliding(item)) {
            item.visible = false;
            player.status = "scale_up";
        }
    })
    if (player.status === "scale_up") {
        player.size.x *= 1.01;
        player.size.y *= 1.01;
        player.collision.height *= 1.01;
        player.collision.top *= 1.01;
        if (player.size.x > initalPlayerWidth * 1.1) {
            player.status = "scale_down";
        }
    } else if (player.status === "scale_down") {
        player.size.x *= 0.99;
        player.size.y *= 0.99;

        player.collision.height *= 0.99;
        player.collision.top *= 0.99;
        if (player.size.x <= initalPlayerWidth) {
            player.status = "normal";
        }
    }
}

function isColliding(reward: Reward): boolean {
    if (
        Math.abs(
            (player.coordinate.x + player.collision.left + player.collision.width / 2) -
            (reward.coordinate.x + reward.size.x / 2)
        ) < (player.collision.width + reward.size.x) / 2 &&
        Math.abs(
            (player.coordinate.y + player.collision.top + player.collision.height / 2) -
            (reward.coordinate.y + reward.size.y / 2)
        ) < (player.collision.height + reward.size.y) / 2
    ) {
        return true;
    } else {
        return false;
    }
}

function liftPlayer() {
    player.velocity.y = -300;
}


const TechFuture = (): ReactElement => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<"TO_SUCCESS" | "SUCCESS" | "FAILURE" | "PLAYING">("PLAYING");
    let context: CanvasRenderingContext2D;
    useEffect(() => {
        if (!canvasRef.current) return;
        canvasRef.current.setAttribute("height", height.toString());
        canvasRef.current.setAttribute("width", width.toString());
        context = canvasRef.current.getContext('2d')!;
        // context.strokeStyle = "red"

        init();

        const tempTimer = setInterval(() => graphicalUpdate(context), 1000 / FPS)

        // 3, 2, 1, Go 倒计时后才会进行物理运动的更新；
        // 但倒计时的同时会同时进行显示的渲染，避免白屏。
        let frameTimer: NodeJS.Timer;
        const countdownTimer = setTimeout(() => {
            // 清除临时渲染计时器，使得系统只存在一个计时器，优化性能
            clearInterval(tempTimer);
            frameTimer = setInterval(() => {
                physicalUpdate();
                graphicalUpdate(context)

                // 判断是否游戏是否成功
                if (gameState === "PLAYING") {
                    if (items.every(item => !item.visible)) {
                        setGameState("TO_SUCCESS");
                        setTimeout(() => {
                            setGameState("SUCCESS");
                            clearInterval(frameTimer);
                        }, 1000)
                    }
                }
                // 判断是否游戏是否失败
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    if (item.visible && item.coordinate.x + item.size.x < player.coordinate.x) {
                        setGameState("FAILURE");
                        clearInterval(frameTimer);
                        break;
                    }
                }
            }, 1000 / FPS);
        }, 4000)

        return () => {
            clearInterval(tempTimer);
            clearInterval(frameTimer);
            clearTimeout(countdownTimer);
        }
    }, []);


    return <div className="tech-future">
        <CountDown />
        {(() => {
            if (gameState === "FAILURE") {
                return <FailureWindow />
            } else if (gameState === "SUCCESS") {
                return <SuccessWindow />
            } else {
                return null;
            }
        })()}
        <canvas ref={canvasRef} onClick={liftPlayer}></canvas>
    </div>
}

export default TechFuture;