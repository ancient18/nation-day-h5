import { ReactElement, useRef, useEffect, useState, TouchEventHandler } from "react";
import "../../assets/styles/AntiEpidemic/AntiEpidemic.less";
import BigDiv from "./BigDiv";

const AntiEpidemic = (): ReactElement => {
  let boxRef: any = useRef();
  // let btRef = useRef();
  let defateRef: any = useRef();
  let victoryRef: any= useRef();
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

    console.log(window.location.pathname);
    console.log(window.location);

    defate.querySelector(".left")!.addEventListener("touchstart", function () {
      location.reload();
      defate.style.display = "none";
    });

    defate.querySelector(".right")!.addEventListener("touchstart", function () {
      location.href="/#/"
      // location.hash.replace("#/");
      defate.style.display = "none";
    });

    victory.querySelector(".bottom")!.addEventListener("touchstart", function () {
      console.log(1);
      location.href="/#/"
      // location.hash.replace("#/");
      console.log(location.hash);
      victory.style.display = "none";
    });

    // 设置垂直居中
    box.style.marginTop =
      document.body.clientHeight * 0.5 - document.body.clientWidth * 0.4 + "px";

    let arr: any = [];

    (allDiv[4].querySelector(".front") as HTMLElement).style.backgroundImage =
      "url(/src/assets/images/AntiEpidemic/front.png)";

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
          (allDiv[i].querySelector(".front") as HTMLElement).style.display="none";
        },120)
       
      }
    }, 3000);

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
          box.addEventListener("touchstart", fn);
        }, 1000);
      }, 8000);
    }, 5000);

    // 点击事件
    function fn(e: any) {
      // console.log(e.target.style["cursor"]);
      // 移除点击事件
      box.removeEventListener("touchstart", fn);
      if (e.path[1] === allDiv[4]) {
        // 找到没带口罩的卷卷
        e.path[1].style.transform = `rotateY(${0}deg)`;
        e.path[1].querySelector(".front").style.display="table";
        // 延迟一秒翻开其余盒子
        setTimeout(function () {
          for (let i = 0, len = allDiv.length; i < len; i++) {
            if (i !== 4) {
              allDiv[i].style.transform = `rotateY(${0}deg)`;
              (allDiv[i].querySelector(".front") as HTMLElement).style.display="table";
            }
          }
        }, 1000);
        window.setTimeout(function () {
          victory.style.display = "table";
        }, 2000);
      } else {
        // 没找到
        e.path[1].style.transform = `rotateY(${0}deg)`;
        console.log(e.path[0]);
        e.path[1].querySelector(".front").style.display="table";
        // 延迟一秒翻开其余盒子
        setTimeout(function () {
          for (let i = 0, len = allDiv.length; i < len; i++) {
            if (e.target !== e.path[1]) {
              allDiv[i].style.transform = `rotateY(${0}deg)`;
              (allDiv[i].querySelector(".front") as HTMLElement).style.display="table";
            }
          }
        }, 1000);
        window.setTimeout(function () {
          defate.style.display = "table";
        }, 2000);
      }
    }
  }, [flag]);

  return (
    <div className="body">
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
        <div className="right"></div>
      </div>

      <div className="victory" ref={victoryRef}>
        <div className="backgroundImage">
          <div className="bottom"></div>
        </div>
      </div>
      {/* <button ref={btRef}>点我开始游戏</button> */}
    </div>
  );
};

export default AntiEpidemic;
