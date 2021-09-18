import { useRef, ReactElement, useEffect } from "react";

import '../../assets/styles/techFuture.less'

type Vector = {
    x: number,
    y: number,
}

interface BasicBody {
    coordinate: Vector,
    size: Vector,
    visible: boolean
}

interface MovableBody extends BasicBody {
    velocity: Vector,
    status: string,
}

const sprites: BasicBody[] = Array.from({ length: 1000 }, (_, i) => ({
    coordinate: { x: 100 + 200 * i, y: Math.random() },
    size: { x: 40, y: 40 },
    visible: true
}))

const FPS = 60;
const gravity = 600;

const player: MovableBody = {
    coordinate: {
        x: 0,
        y: 100,
    },
    velocity: {
        x: 50,
        y: 0,
    },
    size: {
        x: 50,
        y: 50
    },
    status: "normal",
    visible: true
}

const camera: Vector = {
    x: 0,
    y: 0
}

function render(context: CanvasRenderingContext2D) {
    context.fillRect(
        player.coordinate.x - camera.x,
        player.coordinate.y - camera.y,
        player.size.x,
        player.size.y);
    sprites.forEach(sprite => {
        if (!sprite.visible) return;
        context.fillRect(
            sprite.coordinate.x - camera.x,
            sprite.coordinate.y - camera.y,
            sprite.size.x,
            sprite.size.y
        );
    })
}

function isColliding(body1: BasicBody, body2: BasicBody): boolean {
    if (
        Math.abs(
            (body1.coordinate.x + body1.size.x) -
            (body2.coordinate.x + body2.size.x)
        ) < (body1.size.x + body2.size.x) / 2 &&
        Math.abs(
            (body1.coordinate.y + body1.size.y) -
            (body2.coordinate.y + body2.size.y)
        ) < (body1.size.y + body2.size.y) / 2
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
    let context: CanvasRenderingContext2D;
    let height = 0;
    let width = 0;
    useEffect(() => {
        height = document.documentElement.clientHeight;
        width = document.documentElement.clientWidth;
        canvasRef.current!.setAttribute("height", height.toString());
        canvasRef.current!.setAttribute("width", width.toString());
        context = canvasRef.current?.getContext('2d')!;
        player.coordinate.y = height / 2;
        sprites.forEach(sprite => sprite.coordinate.y = sprite.coordinate.y * height)
    }, []);
    setInterval(() => {
        if (!context) return;
        context.clearRect(0, 0, width, height);
        render(context);
        player.velocity.y = gravity / FPS + player.velocity.y;

        player.coordinate = {
            x: player.velocity.x / FPS + player.coordinate.x,
            y: player.velocity.y / FPS + player.coordinate.y,
        }
        camera.x = player.coordinate.x - 50;
        if (player.coordinate.y < 0) {
            player.coordinate.y = 0;
            player.velocity.y = -player.velocity.y / 2;
        }
        if (player.coordinate.y + player.size.y > height) {
            player.coordinate.y = height - player.size.y;
            player.velocity.y = -player.velocity.y / 2;
        }
        sprites.forEach(sprite => {
            if (isColliding(player, sprite)) {
                sprite.visible = false;
                player.status = "scale_up";
            }
        })
        // if (player.status === "scale_up") {
        //     console.log("scale_up", player.size.x)
        //     player.size.x += 3;
        //     player.size.y += 3;
        //     if (player.size.x > 60) {
        //         player.status = "scale_down";
        //     }
        // } else if (player.status === "scale_down") {
        //     console.log("scale_down", player.size.x)
        //     player.size.x -= 3;
        //     player.size.y -= 3;
        //     if (player.size.x <= 50) {
        //         player.status = "normal";
        //     }
        // }
    }, 1000 / FPS);
    return (
        <canvas ref={canvasRef} onClick={liftPlayer}></canvas>
    )
}

export default TechFuture;