import { useRef, ReactElement, useEffect } from "react";

import '../../../assets/styles/techFuture.less'

import { background, juanjuan } from "../../../assets/images/tech-future/images";
import { items } from "./items";


const height = document.documentElement.clientHeight;
const width = document.documentElement.clientWidth;

const FPS = 60;
const gravity = 600;

const initalPlayerWidth = 138 / 667 * height;
const initalPlayerHeight = 80 / 667 * height;

const player: MovableBody = {
    coordinate: {
        x: 0.055 * height,
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
    status: "normal",
    image: juanjuan,
}

const camera: Vector = {
    x: 0,
    y: 0
}

function drawSprite(ctx: CanvasRenderingContext2D, item: Item) {
    ctx.strokeRect(
        item.coordinate.x - camera.x,
        item.coordinate.y - camera.y,
        item.size.x,
        item.size.y
    );
    ctx.drawImage(
        item.image,
        item.coordinate.x - camera.x,
        item.coordinate.y - camera.y,
        item.size.x,
        item.size.y
    );
}

function render(context: CanvasRenderingContext2D) {
    context.drawImage(background, -camera.x, -camera.y, height * background.width / background.height, height);

    context.strokeRect(
        player.coordinate.x - camera.x,
        player.coordinate.y - camera.y,
        player.size.x,
        player.size.y
    );
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
}

function isColliding(body1: BasicBody, body2: BasicBody): boolean {
    if (
        Math.abs(
            (body1.coordinate.x + body1.size.x / 2) -
            (body2.coordinate.x + body2.size.x / 2)
        ) < (body1.size.x + body2.size.x) / 2 &&
        Math.abs(
            (body1.coordinate.y + body1.size.y / 2) -
            (body2.coordinate.y + body2.size.y / 2)
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
        context.strokeStyle = "red"
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
        items.filter((item)=> item.visible).forEach((item, i) => {
            console.log(i)
            if (isColliding(player, item)) {
                item.visible = false;
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