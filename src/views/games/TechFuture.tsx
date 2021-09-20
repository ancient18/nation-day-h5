import { useRef, ReactElement, useEffect } from "react";

import '../../assets/styles/techFuture.less'

// @ts-ignore
import { juanjuan } from "../../assets/images/tech-future/images.ts"

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

const sprites: RewardingItem[] = [{
    coordinate: { x: 0.331, y: 0.610 },
    size: { x: 0.132, y: 0.130 },
    visible: true
}, {
    coordinate: { x: 0.403, y: 0.306 },
    size: { x: 0.160, y: 0.156 },
    visible: true
}, {
    coordinate: { x: 0.690, y: 0.468 },
    size: { x: 0.157, y: 0.159 },
    visible: true
}, {
    coordinate: { x: 0.993, y: 0.528 },
    size: { x: 0.160, y: 0.162 },
    visible: true
}, {
    coordinate: { x: 1.100, y: 0.288 },
    size: { x: 0.189, y: 0.192 },
    visible: true
}, {
    coordinate: { x: 1.465, y: 0.552 },
    size: { x: 0.177, y: 0.178 },
    visible: true
}, {
    coordinate: { x: 1.760, y: 0.384 },
    size: { x: 0.112, y: 0.109 },
    visible: true
}, {
    coordinate: { x: 1.982, y: 0.259 },
    size: { x: 0.123, y: 0.124 },
    visible: true
}, {
    coordinate: { x: 2.123, y: 0.481 },
    size: { x: 0.189, y: 0.192 },
    visible: true
}, {
    coordinate: { x: 2.493, y: 0.537 },
    size: { x: 0.168, y: 0.166 },
    visible: true
}, {
    coordinate: { x: 2.804, y: 0.363 },
    size: { x: 0.213, y: 0.216 },
    visible: true
}, {
    coordinate: { x: 3.163, y: 0.310 },
    size: { x: 0.160, y: 0.156 },
    visible: true
}, {
    coordinate: { x: 3.333, y: 0.522 },
    size: { x: 0.148, y: 0.150 },
    visible: true
}, {
    coordinate: { x: 3.564, y: 0.370 },
    size: { x: 0.166, y: 0.165 },
    visible: true
}]


const height = document.documentElement.clientHeight;
const width = document.documentElement.clientWidth;

const FPS = 60;
const gravity = 600;

const initalPlayerWidth = 112;
const initalPlayerHeight = 80;

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
        x: initalPlayerWidth,
        y: initalPlayerHeight
    },
    status: "normal"
}

const camera: Vector = {
    x: 0,
    y: 0
}

function render(context: CanvasRenderingContext2D) {
    context.drawImage(
        juanjuan,
        player.coordinate.x - camera.x,
        player.coordinate.y - camera.y,
        player.size.x,
        player.size.y
    );
    sprites.forEach(sprite => {
        if (!sprite.visible) return;
        console.log(sprite.coordinate.y);
        
        console.log(`context.fillRect(
            ${sprite.coordinate.x * height} - ${camera.x},
            ${sprite.coordinate.y * height} - ${camera.y},
            ${sprite.size.x * height},
            ${sprite.size.y * height}
        )`)
        context.fillRect(
            sprite.coordinate.x * height - camera.x,
            sprite.coordinate.y * height - camera.y,
            sprite.size.x * height,
            sprite.size.y * height
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
    useEffect(() => {
        canvasRef.current!.setAttribute("height", height.toString());
        canvasRef.current!.setAttribute("width", width.toString());
        context = canvasRef.current?.getContext('2d')!;
        player.coordinate.y = height / 2;
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
        camera.x = player.coordinate.x - 0.055 * height;
        if (player.coordinate.y < 0) {
            player.coordinate.y = 0;
            player.velocity.y = -player.velocity.y / 2;
        }
        if (player.coordinate.y + player.size.y > height) {
            player.coordinate.y = height - player.size.y;
            player.velocity.y = -player.velocity.y / 2;
        }
        sprites.filter(sprite => sprite.visible).forEach(sprite => {
            if (isColliding(player, sprite)) {
                sprite.visible = false;
                player.status = "scale_up";
            }
        })
        if (player.status === "scale_up") {
            player.size.x += 1;
            player.size.y += 1;
            if (player.size.x > initalPlayerWidth * 1.1) {
                player.status = "scale_down";
            }
        } else if (player.status === "scale_down") {
            player.size.x -= 1;
            player.size.y -= 1;
            if (player.size.x <= initalPlayerWidth) {
                player.status = "normal";
            }
        }
    }, 1000 / FPS);
    return (
        <canvas ref={canvasRef} onClick={liftPlayer}></canvas>
    )
}

export default TechFuture;