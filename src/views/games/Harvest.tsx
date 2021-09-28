import { ReactElement, useEffect, useState, useRef } from "react";
import { withRouter } from 'react-router-dom';
import '../../assets/styles/harvest.less';
import insect1Img from '../../assets/images/harvest/insect1.png'
import insect2Img from '../../assets/images/harvest/insect2.png'
import branchImg from '../../assets/images/harvest/branch.png'
import mapleImg from '../../assets/images/harvest/maple.png'
import mushroomImg from '../../assets/images/harvest/mushroom.png'
import vineImg from '../../assets/images/harvest/vine.png'
import wheat1Img from '../../assets/images/harvest/wheat1.png'
import wheat2Img from '../../assets/images/harvest/wheat2.png'
import click1Img from '../../assets/images/harvest/click-1.png'
import click2Img from '../../assets/images/harvest/click-2.png'
import click3Img from '../../assets/images/harvest/click-3.png'
import click4Img from '../../assets/images/harvest/click-4.png'
import click5Img from '../../assets/images/harvest/click-5.png'
import click6Img from '../../assets/images/harvest/click-6.png'
import click7Img from '../../assets/images/harvest/click-7.png'
import click8Img from '../../assets/images/harvest/click-8.png'
import click9Img from '../../assets/images/harvest/click-9.png'

// 以左上角为原点，向下为 y轴，向右为 x轴
type Vector = {
    x: number,
    y: number,
}

interface Item {
    coordinate: Vector,
    img: any,
    visible: boolean,
    type: string,
    key: number,
    boxStyle: string,
    isStop: boolean
}

//一些基础配置
const config = {
    isNew: true, //  控制是否生成新物体,
    isStop: false,
    newTimes: 1,
    isSuccess: true, //  设置是否成功
    isLast: false,
    itemNum: 0, //  物体数
    wheatNum: 0,  //  麦穗数
}

// 赋予物体一个left属性
function giveXY(node: HTMLLIElement, item: Item): void {
    node.style.left = item.coordinate.x + 'vw'
    node.style.transform = `translateY(${item.coordinate.y}vh)`
}

// 设定物体的x坐标的值
function randomX() {
    let x = (Math.random() * 25 + (config.newTimes - 1) * 128.4) / 3.75
    if (config.newTimes === 3)
        config.newTimes = 1;
    else
        config.newTimes++;
    return x
    // switch (config.newTimes) {
    // case 1:
    //     config.newTimes++;
    //     x = (Math.random() * 25 + 0) / 3.75
    //     return x
    // case 2:
    //     config.newTimes++;
    //     x = (Math.random() * 25 + 128.4) / 3.75
    //     return x
    // case 3:
    //     config.newTimes = 1;
    //     x = (Math.random() * 25 + 128.4 * 2) / 3.75
    //     return x
    // default:
    //     return 0;
    // }
}

// 物体向下移动
function changeY(node: HTMLLIElement, item: Item, setItems: ((func: (items: Item[]) => Item[]) => void), gameOverPopNode: React.RefObject<HTMLDivElement>, coverNode: React.RefObject<HTMLDivElement>): void {
    // const timer = setInterval(() => {
    //     if (item.coordinate.y <= 100 && !item.isStop) {
    //         item.coordinate.y += 1.5;
    //         node.style.transform = 'translateY(' + item.coordinate.y + 'vh)'
    //     }
    //     else {
    //         clearInterval(timer)
    //         if ((item.type === 'wheat1' || item.type === 'wheat2') && !item.isStop) {
    //             if (item.visible) {
    //                 stopMoveAndNew(setItems)
    //                 gameOver(gameOverPopNode, coverNode)
    //             }
    //         }
    //         if (item.type !== 'wheat1' && item.type !== 'wheat2' && !item.isStop) {
    //             node.style.zIndex = '-100'
    //         }
    //     }
    // }, 16.5)
    setTimeout(() => {
        if (item.coordinate.y <= 99 && !item.isStop) {
            item.coordinate.y += 1;
            node.style.transform = 'translateY(' + item.coordinate.y + 'vh)'
            changeY(node, item, setItems, gameOverPopNode, coverNode)
            // console.log(item.coordinate.y);
        }
        else {
            if ((item.type === 'wheat1' || item.type === 'wheat2') && !item.isStop) {
                if (item.visible) {
                    stopMoveAndNew(setItems)
                    gameOver(gameOverPopNode, coverNode)
                }
            }
            if (item.type !== 'wheat1' && item.type !== 'wheat2' && !item.isStop) {
                node.style.zIndex = '-100'
            }
        }
    }, 16.5)
}

// 游戏失败
const gameOver = (successPopNode: React.RefObject<HTMLDivElement>, coverNode: React.RefObject<HTMLDivElement>) => {
    config.isSuccess = false
    successPopNode!.current!.style.display = 'block';
    successPopNode!.current!.style.top = '65.6vw'
    coverNode!.current!.style.display = 'block'
}

// 游戏成功
const success = (gameOverPopNode: React.RefObject<HTMLDivElement>, containerNode: React.RefObject<HTMLDivElement>, coverNode: React.RefObject<HTMLDivElement>) => {
    containerNode!.current!.style!.overflowY = 'scroll'
    gameOverPopNode!.current!.style.display = 'block'
    gameOverPopNode!.current!.style.top = '37.6vw'
    containerNode!.current!.style!.height = '130vh'
    coverNode!.current!.style.display = 'block'
}

// 游戏成功
const isWheat = (item: Item) => item.type === 'wheat1' || item.type === 'wheat2' ? 1 : 0

const handleGoodClick = (node: HTMLLIElement, item: Item, wheatNum: number, successPopNode: React.RefObject<HTMLDivElement>, containerNode: React.RefObject<HTMLDivElement>, coverNode: React.RefObject<HTMLDivElement>): void => {
    node.addEventListener('touchstart', (e) => {
        e.preventDefault()
        const stars: any = node.children[0] as HTMLUListElement
        node.style.transition = 'opacity 0.5s'
        node.style.opacity = '0'
        stars.style.opacity = '1'
        stars.children[0].style.transform = `translate(1vw,-16vw)`;
        stars.children[1].style.transform = `translate(10vw,-10vw)`;
        stars.children[2].style.transform = `translate(11vw,-4vw)`;
        stars.children[3].style.transform = `translate(11vw,3vw)`;
        stars.children[4].style.transform = `translate(5vw,10vw)`;
        stars.children[5].style.transform = `translate(-10vw,6vw)`;
        stars.children[6].style.transform = `translate(-12vw,-1vw)`;
        stars.children[7].style.transform = `translate(-12vw,-9vw)`;
        stars.children[8].style.transform = `translate(-6vw,-14vw)`;
        setTimeout(() => {
            node.style.display = 'none';
            item.visible = false;
            // console.log('itemNum:', config.itemNum);
            // console.log('wheatNum:', config.wheatNum);
            if (config.isLast && wheatNum === config.wheatNum) {
                console.log('sucess');
                setTimeout(() => success(successPopNode, containerNode, coverNode), 500)
            }
        }, 500);
    })
}

const handleInsectClick = (node: HTMLLIElement, setItems: ((func: (items: Item[]) => Item[]) => void), gameOverPopNode: React.RefObject<HTMLDivElement>, coverNode: React.RefObject<HTMLDivElement>): void => {
    node.addEventListener('touchstart', (e) => {
        e.preventDefault()
        stopMoveAndNew(setItems)
        gameOver(gameOverPopNode, coverNode)
    })
}

const stopMoveAndNew = (setItems: ((func: (items: Item[]) => Item[]) => void)) => {
    config.isNew = false
    setItems((items: Item[]) => {
        items.map(item => {
            item.isStop = true
        })
        return items
    })
}

const Harvest = (props: any): ReactElement => {
    const [items, setItems] = useState<Item[]>([])
    const itemTypes: string[] = ['wheat1', 'wheat2', 'wheat1', 'wheat2', 'insect1', 'insect2', 'branch', 'maple', 'mushroom', 'vine']  //有哪些类型的物体
    const itemsRef: React.RefObject<HTMLUListElement> = useRef<HTMLUListElement>(null)
    const gameOverPopNode: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
    const coverNode: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
    const successPopNode: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
    const containerNode: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

    const jumpToChooseGames = () => {
        props.history.push('/selection')
    }

    useEffect(() => {
        setTimeout(() => {
            clearInterval(timer)  //清除添加物体的interval
            config.isLast = true
        }, 15000)

        //给予物体状态
        const changeItemStatus = (item: Item, gameOverPopNode: React.RefObject<HTMLDivElement>, coverNode: React.RefObject<HTMLDivElement>) => {
            const itemNode: HTMLLIElement = itemsRef.current!.children[config.itemNum - 1] as HTMLLIElement
            giveXY(itemNode, item)
            changeY(itemNode, item, setItems, gameOverPopNode, coverNode)
            const beforeHandleInsectClick = () => {
                setItems(items => {
                    handleInsectClick(itemNode, setItems, gameOverPopNode, coverNode)
                    return items
                })
            }

            setItems((items: Item[]) => {
                isWheat(item) ? handleGoodClick(itemNode, item, config.wheatNum, successPopNode, containerNode, coverNode) : beforeHandleInsectClick()
                return items
            })
        }

        // 设置定时调用生成新物品
        let intervalTime = [150, 160, 170, 180, 190, 200]
        let type: string, img: any;
        let timer = setInterval(() => {
            if (config.isNew) {
                switch (itemTypes[parseInt((Math.random() * 8).toString())]) {
                    case 'wheat1':
                        config.wheatNum++;
                        img = wheat1Img
                        type = 'wheat1'
                        break;
                    case 'wheat2':
                        config.wheatNum++;
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
                    y: -15
                }
                const itemObj: Item = {
                    type,
                    img,
                    visible: true,
                    coordinate: vector,
                    key: config.itemNum++,
                    boxStyle: type,
                    isStop: false,
                }
                setItems((items: Item[]) => [...items, itemObj])
                changeItemStatus(itemObj, gameOverPopNode, coverNode)
            }
        }, intervalTime[parseInt((Math.random() * 6).toString())])
    }, [])
    return (
        <div className="container" ref={containerNode}>
            <ul className='item-list' ref={itemsRef}>
                {items.map(item => {
                    return (
                        <li key={item.key} >
                            <ul id={`star-ul-${item.key}`}>
                                <li style={{ backgroundImage: `url(${click1Img})` }} className="click1-icon"></li>
                                <li style={{ backgroundImage: `url(${click2Img})` }} className="click2-icon"></li>
                                <li style={{ backgroundImage: `url(${click3Img})` }} className="click3-icon"></li>
                                <li style={{ backgroundImage: `url(${click4Img})` }} className="click4-icon"></li>
                                <li style={{ backgroundImage: `url(${click5Img})` }} className="click5-icon"></li>
                                <li style={{ backgroundImage: `url(${click6Img})` }} className="click6-icon"></li>
                                <li style={{ backgroundImage: `url(${click7Img})` }} className="click7-icon"></li>
                                <li style={{ backgroundImage: `url(${click8Img})` }} className="click8-icon"></li>
                                <li style={{ backgroundImage: `url(${click9Img})` }} className="click9-icon"></li>
                            </ul>
                            <div className={item.boxStyle} style={{ display: item.visible ? 'block' : 'none', backgroundImage: `url(${item.img})` }}>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <div className="cover" ref={coverNode}></div>
            <div className="successPop" ref={successPopNode}>
                <div className="successPopBackBtn" onClick={jumpToChooseGames}></div>
            </div>
            <div className="gameOverPop" ref={gameOverPopNode}>
                <div className="gameOverBtn1" onClick={() => location.reload()} ></div>
                <div className="gameOverBtn2" onClick={jumpToChooseGames}></div>
            </div>
        </div>
    )
}

export default withRouter(Harvest);