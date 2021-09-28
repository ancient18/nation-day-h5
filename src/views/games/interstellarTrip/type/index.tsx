
import spacecraft from "../../../../assets/images/interstellarTrip/Spacecraft.png"
import bgc from "../../../../assets/images/interstellarTrip/bgc.png"
import light from "../../../../assets/images/interstellarTrip/light.png"

import { Vector, MoveItem, staticPicture } from "./baseItem"
import { StonesProperties } from "./stones"
import type { ISpaceship, IBaseStone, IPicture, IStaticPage } from "./baseItem"
/*将所有陨石作为一个数组导出，便于随机生成*/

// console.log(IPicture)
/*导出飞船图片的路径*/
// 6665656
export { spacecraft as SpacecraftSrc }

/*导出背景图片的路径*/
export { bgc as BgcSrc }

export { MoveItem, staticPicture }
export type { Vector, ISpaceship, IBaseStone, IPicture, IStaticPage }

export { StonesProperties }
export { light as spaceLight }
