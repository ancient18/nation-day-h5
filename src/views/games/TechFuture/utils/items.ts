const height = document.documentElement.clientHeight;
const width = document.documentElement.clientWidth;

import { itemImages } from "../../../../assets/images/tech-future/images";

const items = [
    // rocket
    {
        coordinate: { x: 0.331, y: 0.610 },
        size: { x: 0.132, y: 0.130 },
    },
    // satellite
    {
        coordinate: { x: 0.403, y: 0.306 },
        size: { x: 0.160, y: 0.156 },
    },
    // ship
    {
        coordinate: { x: 0.690, y: 0.468 },
        size: { x: 0.157, y: 0.159 },
    },
    // transmitter
    {
        coordinate: { x: 0.993, y: 0.528 },
        size: { x: 0.160, y: 0.162 },
    },
    // telescope
    {
        coordinate: { x: 1.100, y: 0.288 },
        size: { x: 0.189, y: 0.192 },
    },
    // robot
    {
        coordinate: { x: 1.465, y: 0.552 },
        size: { x: 0.177, y: 0.178 },
    },
    // 5g
    {
        coordinate: { x: 1.760, y: 0.384 },
        size: { x: 0.112, y: 0.109 },
    },
    // robot
    {
        coordinate: { x: 1.982, y: 0.259 },
        size: { x: 0.123, y: 0.124 },
    },
    // telescope
    {
        coordinate: { x: 2.123, y: 0.481 },
        size: { x: 0.184, y: 0.187 },
    },
    // rocket
    {
        coordinate: { x: 2.493, y: 0.537 },
        size: { x: 0.163, y: 0.162 },
    },
    // ship
    {
        coordinate: { x: 2.804, y: 0.363 },
        size: { x: 0.213, y: 0.216 },
    },
    // 5g
    {
        coordinate: { x: 3.163, y: 0.310 },
        size: { x: 0.160, y: 0.156 },
    },
    // robot
    {
        coordinate: { x: 3.333, y: 0.522 },
        size: { x: 0.141, y: 0.141 },
    },
    // destination
    {
        coordinate: { x: 3.564, y: 0.370 },
        size: { x: 0.166, y: 0.165 },
    }
]

function generateItems(): Reward[] {
    return items.map((v, i) => ({
        coordinate: {
            x: v.coordinate.x * height,
            y: v.coordinate.y * height
        },
        size: {
            x: v.size.x * height,
            y: v.size.y * height
        },
        visible: true,
        image: itemImages[i]
    }));
}

export { generateItems };