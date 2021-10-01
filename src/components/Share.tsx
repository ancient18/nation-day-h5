import { ReactElement, useEffect, useRef } from "react";
import "../assets/styles/share.less";
import { Link } from "react-router-dom";


import background1 from "../assets/images/share/background1.png";
import background2 from "../assets/images/share/background2.png";

const Share = (fn, flag): ReactElement => {
    let endRef: React.RefObject<HTMLDivElement> = useRef < HTMLDivElement > (null);

    useEffect(() => {
        let end = endRef.current;

        
        let code = end.querySelector("img");
        let cha = end.querySelector(".cha");

        

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
            
            code.src=background1
        } else {
            code.src=background2
        }

       
    }, []);

    return (
        <div className="end" ref={endRef}>
            <div className="day">
                <img src={background1} alt=""/>
                <div className="cha"></div>
            </div>
        </div>
    );
};

export default Share;
