import { useRef, ReactElement, useEffect, useState } from "react";

import '../../../assets/styles/techFuture.less';

import FailureWindow from "./components/FailureWindow";
import SuccessWindow from "./components/SuccessWindow";
import CountDown from "../../../components/CountDown";

import {
    height, width,
    FPS, player, items,
    init
} from "./data"

import graphicalUpdate from "./utils/graphical";
import physicalUpdate from "./utils/physical";

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