import { ReactElement, useEffect, useState, useRef } from "react";
import '../../assets/styles/harvest.less';
import insect1Img from '../../assets/images/harvest/insect1.png'
import insect2Img from '../../assets/images/harvest/insect2.png'
import branchImg from '../../assets/images/harvest/branch.png'
import mapleImg from '../../assets/images/harvest/maple.png'
import mushroomImg from '../../assets/images/harvest/mushroom.png'
import vineImg from '../../assets/images/harvest/vine.png'
import wheat1Img from '../../assets/images/harvest/wheat1.png'
import wheat2Img from '../../assets/images/harvest/wheat2.png'


// 以左上角为原点，向下为 y轴，向右为 x轴
type Vector = {
    x: number,
    y: number,
}

interface Item {
    coordinate: Vector,
    size: number,
    img: any,
    visible: boolean,
    type: string,
    key: number,
    boxStyle: string,
    isStop: boolean
}

//一些基础配置
const config = {
    isNew: true, //控制是否生成新物体,
    isStop: false,
    newTimes: 1
}

// 赋予物体一个left属性
function giveX(node: HTMLLIElement, item: Item): void {
    node.style.left = item.coordinate.x + 'vw'
}

// 设定物体的x坐标的值
function randomX() {
    let x;
    switch (config.newTimes) {
        case 1:
            config.newTimes++;
            x = (Math.random() * 25 + 0) / 3.75
            return x
        case 2:
            config.newTimes++;
            x = (Math.random() * 25 + 128.4) / 3.75
            return x
        case 3:
            config.newTimes = 1;
            x = (Math.random() * 25 + 128.4 * 2) / 3.75
            return x
        default:
            break;
    }
}

function changeY(node: HTMLLIElement, item: Item, setItems: ((func: (items: Item[]) => Item[]) => void)): void {
    setTimeout(() => {
        if (item.coordinate.y <= 99.9 && !item.isStop) {
            item.coordinate.y = item.coordinate.y + 0.5;
            node.style.top = item.coordinate.y + 'vh'
            changeY(node, item, setItems)
        }
        else {
            if ((item.type === 'wheat1' || item.type === 'wheat2') && !item.isStop) {
                if (item.visible) {
                    setItems((items: Item[]) => {
                        config.isNew = false
                        items.map(item => {
                            item.isStop = true
                        })
                        return items
                    })
                    gameOver()
                }
            }
        }
    }, 16.5)
}

const gameOver = () => {
    alert('Game Over')
}

const isGood = (item: Item) => item.type === 'wheat1' || item.type === 'wheat2' ? 1 : 0

const handleGoodClick = (node: HTMLLIElement, item: Item): void => {
    node.addEventListener('click', () => {
        item.visible = false
        node.style.display = "none"
    })
}
let x = 1
const handleInsectClick = (node: HTMLLIElement, setItems: ((func: (items: Item[]) => Item[]) => void)): void => {
    node.addEventListener('click', () => {
        config.isNew = false
        setItems((items: Item[]) => {
            items.map(item => {
                item.isStop = true
            })
            return items
        })
        gameOver()
    })
}

let itemNum = 0
const Harvest = (): ReactElement => {
    const [items, setItems] = useState<Item[]>([])
    const itemTypes: string[] = ['wheat1', 'wheat2', 'wheat1', 'wheat2', 'insect1', 'insect2', 'branch', 'maple', 'mushroom', 'vine']  //有哪些类型的物体
    const itemsRef = useRef<any>(null)
    useEffect(() => {
        setTimeout(() => {
            clearInterval(timer)
        }, 15000)

        const changeItemStatus = (item: Item) => {
            const itemNode = itemsRef.current.children[itemNum - 1]
            giveX(itemNode, item)
            changeY(itemNode, item, setItems)
            const beforeHandleInsectClick = () => {
                setItems(items => {
                    handleInsectClick(itemNode, setItems)
                    return items
                })
            }

            setItems((items: Item[]) => {
                isGood(item) ? handleGoodClick(itemNode, item) : beforeHandleInsectClick()
                // isGood(item) ? test(itemNode, item) : beforeHandleInsectClick()
                return items
            })
        }

        // 设置定时调用生成新物品
        let type: string, img: any;
        let timer = setInterval(() => {
            if (config.isNew) {
                switch (itemTypes[parseInt((Math.random() * 8).toString())]) {
                    case 'wheat1':
                        img = wheat1Img
                        type = 'wheat1'
                        break;
                    case 'wheat2':
                        img = wheat2Img
                        type = 'wheat2'
                        break;
                    case 'branch':
                        img = branchImg
                        type = 'branch'
                        break;
                    case 'maple':
                        img = mapleImg
                        type = 'maple'
                        break;
                    case 'mushroom':
                        img = mushroomImg
                        type = 'mushroom'
                        break;
                    case 'vine':
                        img = vineImg
                        type = 'vine'
                    case 'insect1':
                        img = insect1Img
                        type = 'insect1'
                        break;
                    case 'insect1':
                        img = insect1Img
                        type = 'insect1'
                        break;
                    case 'insect2':
                        img = insect2Img
                        type = 'insect2'
                        break;
                }
                const vector: Vector = {
                    x: randomX(),
                    y: 0
                }
                const itemObj: Item = {
                    type,
                    img,
                    visible: true,
                    coordinate: vector,
                    size: 1,  //所有的size先给1，后面再跟产品商量是否大小也是随机的,
                    key: itemNum++,
                    boxStyle: type,
                    isStop: false,
                }
                setItems((items: Item[]) => [...items, itemObj])
                changeItemStatus(itemObj)
            }
        }, 400)
    }, [])
    return (
        <div>
            <ul className='item-list' ref={itemsRef}>
                {items.map(item => {
                    return (
                        <li key={item.key} >
                            <div className={item.boxStyle} style={{ display: item.visible ? 'block' : 'none', backgroundImage: `url(${item.img})` }}>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default Harvest;