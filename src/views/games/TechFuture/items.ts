const height = document.documentElement.clientHeight;
const width = document.documentElement.clientWidth;

import { juanjuan, itemImages } from "../../../assets/images/tech-future/images";

const items: Item[] = [{
    coordinate: { x: 0.331, y: 0.610 },
    size: { x: 0.132, y: 0.130 },
}, {
    coordinate: { x: 0.403, y: 0.306 },
    size: { x: 0.160, y: 0.156 },
}, {
    coordinate: { x: 0.690, y: 0.468 },
    size: { x: 0.157, y: 0.159 },
}, {
    coordinate: { x: 0.993, y: 0.528 },
    size: { x: 0.160, y: 0.162 },
}, {
    coordinate: { x: 1.100, y: 0.288 },
    size: { x: 0.189, y: 0.192 },
}, {
    coordinate: { x: 1.465, y: 0.552 },
    size: { x: 0.177, y: 0.178 },
}, {
    coordinate: { x: 1.760, y: 0.384 },
    size: { x: 0.112, y: 0.109 },
}, {
    coordinate: { x: 1.982, y: 0.259 },
    size: { x: 0.123, y: 0.124 },
}, {
    coordinate: { x: 2.123, y: 0.481 },
    size: { x: 0.189, y: 0.192 },
}, {
    coordinate: { x: 2.493, y: 0.537 },
    size: { x: 0.168, y: 0.166 },
}, {
    coordinate: { x: 2.804, y: 0.363 },
    size: { x: 0.213, y: 0.216 },
}, {
    coordinate: { x: 3.163, y: 0.310 },
    size: { x: 0.160, y: 0.156 },
}, {
    coordinate: { x: 3.333, y: 0.522 },
    size: { x: 0.148, y: 0.150 },
}, {
    coordinate: { x: 3.564, y: 0.370 },
    size: { x: 0.166, y: 0.165 },
}].map((v, i) => ({
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
}))

export { items };