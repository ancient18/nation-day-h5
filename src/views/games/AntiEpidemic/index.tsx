import {
    ReactElement,
    useRef,
    useEffect,
    useState,
    TouchEventHandler,
} from "react";

import {
    Link
} from "react-router-dom";

import "../../../assets/styles/AntiEpidemic/AntiEpidemic.less";
import BigDiv from "./BigDiv";
import CountDown from "../../../components/CountDown";
// import Share from "../../../components/Share"
import { API_URL } from "../../../config";
import choose from "../../../assets/images/AntiEpidemic/choose.png";
import front from "../../../assets/images/AntiEpidemic/front.png";
import arrow from "../../../assets/images/AntiEpidemic/arrow.png";
 
const AntiEpidemic = (): ReactElement => {
    let boxRef: any = useRef();
    // let btRef = useRef();
    let defateRef: any = useRef();
    let victoryRef: any = useRef();
    let [flag, setflag] = useState(false);

    

    const change = () => {
        setflag(!flag);
    };


    useEffect(() => {
        if (!boxRef.current) return;
        if (!defateRef.current) return;
        if (!victoryRef.current) return;
        // 渲染完成后获取 DOM 元素
        let box = boxRef.current; //外面的大盒子
        let allDiv = Array.from(box.querySelectorAll(".big")) as HTMLElement[]; //里面的九个盒子
        // let bt = btRef.current; //按钮
        let defate = defateRef.current;
        let victory = victoryRef.current;

        for(let i = 0, len = allDiv.length; i < len; i++){
            allDiv[i].querySelector(".back").innerHTML=i;
        }

        defate.querySelector(".left")!.addEventListener("touchend", function () {
            location.reload();
            
        });

        

        // 设置垂直居中
        box.style.marginTop =
            document.body.clientHeight * 0.5 - document.body.clientWidth * 0.4 + "px";

        let arr: any = [];

        (allDiv[4].querySelector(".front") as HTMLElement).style.backgroundImage =`url(${front})`;

        // px转化为vw
        function Transform(length: number) {
            return (length / document.body.clientWidth) * 100;
        }

        // 盒子初始赋值以及交换位置
        function Translate() {
            for (let i = 0, len = allDiv.length; i < len; i++) {
                allDiv[i].style.left = arr[i].left + "vw";
                allDiv[i].style.top = arr[i].top + "vw";
            }
        }

        //   存绝对定位的值
        for (let i = 0, len = allDiv.length; i < len; i++) {
            arr.push({
                left: Transform(allDiv[i].offsetLeft),
                top: Transform(allDiv[i].offsetTop),
            });
        }

        // 进行初始赋值
        Translate();

        console.log(arr);

        // 设置随机
        function randomsort(a: number, b: number) {
            return Math.random() > 0.5 ? 1 : -1;
        }

        // 三秒后开始游戏
        setTimeout(function () {
            for (let i = 0, len = allDiv.length; i < len; i++) {
                allDiv[i].style.transform = `rotateY(${180}deg)`;
                setTimeout(function () {
                    (allDiv[i].querySelector(".front") as HTMLElement).style.display =
                        "none";
                }, 300);
            }
        }, 5000);

        // 游戏开始运动

        setTimeout(function () {
            // 第一次打乱
            // 随机排序;
            arr.sort(randomsort);
            Translate();

            let timer = setInterval(function () {
                // 每隔一段时间打乱位置
                arr.sort(randomsort);
                Translate();
            }, 1000);

            setTimeout(function () {
                // 四秒之后停止运动
                clearTimeout(timer);
                // 添加点击事件,动画完成后才能点击
                setTimeout(function () {
                    box.addEventListener("touchend", fn);
                }, 1000);
            }, 6000);
        }, 6000);

        // 点击事件
        function fn(e: any) {
            console.log(e.target.innerHTML);
            
            // 移除点击事件
            box.removeEventListener("touchend", fn);
           console.log(e);
            if(e.target.innerHTML==4){
                for(let i=0, len = allDiv.length; i < len;i++){
                    if(allDiv[i].querySelector(".back").innerHTML==4){
                        allDiv[i].style.transform = `rotateY(${0}deg)`;
                        setTimeout(function () {
                            allDiv[i].querySelector(".front").style.display = "table";
                        }, 300);
                        setTimeout(function () {
                            for (let i = 0, len = allDiv.length; i < len; i++) {
                                if (i !== 4) {
                                    allDiv[i].style.transform = `rotateY(${0}deg)`;
                                    setTimeout(function () {
                                        (
                                            allDiv[i].querySelector(".front") as HTMLElement
                                        ).style.display = "table";
                                    }, 300);
                                }
                            }
                        }, 1000);
                        window.setTimeout(function () {
                            victory.style.display = "table";
                        }, 2000);

                        if (sessionStorage.getItem('stuID')) {

                            // 给后端发请求

                            async function an() {
                                const res = await fetch(`${API_URL}/anti_epidemic`, {
                                    method: "POST",
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        'stu_number': sessionStorage.getItem('stuID')
                                    })
                                })
                                const data = await res.json()
                            }
                            an();
                            // console.log(data);
                        } else {
                            localStorage.setItem("anti_epidemic", 'true')
                            
                        }
                    }
                }
            }
            else {
                console.log(e);
                // 没找到
                for(let i=0, len = allDiv.length; i < len;i++){
                    if(allDiv[i].querySelector(".back").innerHTML==e.target.innerHTML){
                        allDiv[i].style.transform = `rotateY(${0}deg)`;
                        setTimeout(function () {
                            allDiv[i].querySelector(".front").style.display = "table";
                        }, 300);
                        setTimeout(function () {
                            for (let i = 0, len = allDiv.length; i < len; i++) {
                                if (allDiv[i].querySelector(".back").innerHTML!=e.target.innerHTML) {
                                    allDiv[i].style.transform = `rotateY(${0}deg)`;
                                    setTimeout(function () {
                                        (
                                            allDiv[i].querySelector(".front") as HTMLElement
                                        ).style.display = "table";
                                    }, 300);
                                }
                            }
                        }, 1000);
                        window.setTimeout(function () {
                            defate.style.display = "table";
                        }, 2000);
                    }
                }


               
            }
        }
    }, [flag]);

    return (
        <div className="body">
            {/* <Share/> */}
            <CountDown/>
            <div className="box" ref={boxRef}>
                <BigDiv />
                <BigDiv />
                <BigDiv />
                <BigDiv />
                <BigDiv />
                <BigDiv />
                <BigDiv />
                <BigDiv />
                <BigDiv />
            </div>
            <div className="defate" ref={defateRef}>
                <div className="left"></div>
                <div className="right">
                <Link to="/selection">
                    <img src={choose} alt=""/>
                </Link>
                </div>
            </div>

            <div className="victory" ref={victoryRef}>
                <div className="backgroundImage">
                    <div className="bottom">
                        <Link to="/selection">
                            <img src={arrow} alt=""/>
                        </Link>
                    </div>
                </div>
            </div>
            {/* <button ref={btRef}>点我开始游戏</button> */}
        </div>
    );
};

export default AntiEpidemic;
