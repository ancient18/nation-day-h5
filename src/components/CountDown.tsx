import { ReactElement, useEffect, useRef } from "react";
import "../assets/styles/countDown.less";

const CountDown = (): ReactElement => {
  let countRef: any = useRef();

  useEffect(() => {
    let countdown:any  = countRef.current;
    console.log(countdown);
    let go = countdown.querySelector(".go");
    let one = countdown.querySelector(".one");
    let two = countdown.querySelector(".two");
    let three = countdown.querySelector(".three");

    function fn(ball:any) {
      return new Promise((resolve, reject) => {
        ball.style.display = "table";
        setTimeout(function () {
          ball.style.transform = `scale(${1})`;
          setTimeout(function () {
            ball.style.display = "none";
            resolve(fn);
          }, 1000);
        }, 20);
      });
    }

    // fn(three).then((fn)=>{fn(two).then((fn)=>{fn(one).then((fn)=>{fn(go)})})})

    async function Transition() {
      await fn(three);
      await fn(two);
      await fn(one);
      await fn(go);
      countdown.style.display = "none";
    }

    Transition();
  }, []);

  return (
    <div className="countdown" ref={countRef}>
      <div className="go"></div>
      <div className="one"></div>
      <div className="two"></div>
      <div className="three"></div>
    </div>
  );
};

export default CountDown;
