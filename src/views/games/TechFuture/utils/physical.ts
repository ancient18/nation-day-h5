import {
    height, width,
    FPS, gravity,
    initalPlayerWidth, initalPlayerHeight,
    player, camera, items,
} from "../data"

import { background } from "../../../../assets/images/tech-future/images";

export default function physicalUpdate() {
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
    items.filter((item: any) => item.visible).forEach((item: any) => {
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
