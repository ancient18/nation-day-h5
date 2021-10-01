import { generateItems } from "../utils/items";

import { juanjuan } from "../../../../assets/images/tech-future/images";

export function init() {
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

export const height = document.documentElement.clientHeight;
export const width = document.documentElement.clientWidth;

export const FPS = 60;
export const gravity = 600; 

export const initalPlayerWidth = 138 / 667 * height;
export const initalPlayerHeight = 80 / 667 * height;

export let player: Player;
export let camera: Vector;
export let items: Reward[];