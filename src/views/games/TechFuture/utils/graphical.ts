import {
    height, width,
    player, camera, items,
} from "../data";

import { background } from "../../../../assets/images/tech-future/images";

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

export default function graphicalUpdate(context: CanvasRenderingContext2D) {
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
