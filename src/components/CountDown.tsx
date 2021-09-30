import { ReactElement, useEffect, useRef } from "react";
import "../assets/styles/countDown.less";

const CountDown = (): ReactElement => {
    let countRef = useRef<HTMLDivElement>(null);

    let goRef = useRef<HTMLDivElement>(null);
    let oneRef = useRef<HTMLDivElement>(null);
    let twoRef = useRef<HTMLDivElement>(null);
    let threeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let countdown = countRef.current;

        let go = goRef.current!;
        let one = oneRef.current!;
        let two = twoRef.current!;
        let three = threeRef.current!;

        function fn(ball: HTMLDivElement) {
            return new Promise(resolve => {
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

        async function transition() {
            await fn(three);
            await fn(two);
            await fn(one);
            await fn(go);
            
            countdown!.style.display = "none";
        }

        transition();
    }, []);

    return (
        <div className="countdown" ref={countRef}>
            <div className="go" ref={goRef}></div>
            <div className="one" ref={oneRef}></div>
            <div className="two" ref={twoRef}></div>
            <div className="three" ref={threeRef}></div>
        </div>
    );
};

export default CountDown;
