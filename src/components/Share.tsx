import { ReactElement, useEffect, useRef } from "react";
import "../assets/styles/share.less";
import { Link } from "react-router-dom";

import day1 from "../assets/images/share/day.png";
import day2 from "../assets/images/share/day1.png";
import code1 from "../assets/images/share/code.png";
import back from "../assets/images/share/back.png";
import juanImg from "../assets/images/share/juan.png";
import smallcode from "../assets/images/share/smallcode.png";

const Share = (fn, flag): ReactElement => {
    let endRef: React.RefObject<HTMLDivElement> = useRef < HTMLDivElement > (null);

    useEffect(() => {
        let end = endRef.current;

        let day = end.querySelector(".day");
        let img = end.querySelector(".img");
        let code = img.querySelector("img");
        let cha = end.querySelector(".cha");
        // console.log(pro);

        console.log(fn.pro);



        // if(pro.click==true){
        //     console.log(1);
        // 	end.style.display="table";
        // }

        console.log(flag);

        cha.addEventListener("click", function () {
            if (!fn.pro.flag) {
                fn.pro.fn();
            }

            end.style.display = "none";
        });

        let arrImg = [0, 1];
        function randomSort(a: number, b: number) {
            return Math.random() > 0.5 ? 1 : -1;
        }

        arrImg.sort(randomSort);

        if (arrImg[0] === 0) {
            day.style.backgroundImage = `url(${day1})`;
            cha.style.top = "9vw";
        } else {
            day.style.backgroundImage = `url(${day2})`;
            day.style.height = "71.5vh";
        }

        img.addEventListener("click", function () {
            img.style.display = "none";
        });

        code.style.marginTop =
            document.body.clientHeight * 0.5 - document.body.clientWidth * 0.5 + "px";
    }, []);

    return (
        <div className="end" ref={endRef}>
            <div className="day">
                <div className="cha"></div>
                <div className="juan">
                    <img src={smallcode} alt="" />
                </div>
            </div>
            <div className="img">
                <img src={code1} alt="" />
            </div>
        </div>
    );
};

export default Share;
