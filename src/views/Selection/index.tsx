import { useState, ReactElement, useEffect, useRef } from "react";
import Sentakushi from "./sentakushi";
import "../../assets/styles/selection.less";
import { API_URL } from "../../config";
import Share from "../../components/Share";

type GameDones = {
    harvest: boolean;
    interstellar_trip: boolean;
    anti_epidemic: boolean;
    tech_future: boolean;
};

async function getState(): Promise<GameDones> {
    if (sessionStorage.getItem("stuID")) {
        const res = await fetch(
            `${API_URL}/status?stu_number=${sessionStorage.getItem("stuID")}`
        );
        const data = await res.json();
        if (data.info !== "success")
            return {
                harvest: false,
                interstellar_trip: false,
                anti_epidemic: false,
                tech_future: false,
            };
        return data.data;
    } else {
        return {
            harvest: localStorage.getItem("harvest") ? true : false,
            interstellar_trip: localStorage.getItem("interstellar_trip")
                ? true
                : false,
            anti_epidemic: localStorage.getItem("anti_epidemic") ? true : false,
            tech_future: localStorage.getItem("tech_future") ? true : false,
        };
    }
}

function getScore(dones: GameDones) {
    let score = 0;
    if (dones.harvest) score += 50;
    if (dones.interstellar_trip) score += 50;
    if (dones.anti_epidemic) score += 50;
    if (dones.tech_future) score += 50;
    if (score >= 200) score = 300;
    return score;
}

const Selection = (): ReactElement => {
    const [dones, setDones] = useState({
        harvest: false,
        interstellar_trip: false,
        anti_epidemic: false,
        tech_future: false,
    });

    const [obj, setObj] = useState({ flag: false, click: false, share: false });

    let shareRef = useRef();

    // localStorage.removeItem("flag")
    // console.log(localStorage);


    useEffect(() => {
        getState().then((state) => setDones(state));
    }, []);

    useEffect(() => {

        console.log(dones);


        if (
            dones["harvest"] == true &&
            dones["interstellar_trip"] == true &&
            dones["anti_epidemic"] == true &&
            dones["tech_future"] == true
        ) {

            // 只有第一次挑战成功才会自动出现弹窗
            if (!localStorage.flag) {
                setObj({ flag: true, click: false, share: false });
                localStorage.setItem("flag", "true");

            } else {
                setObj({ flag: false, click: false, share: true });
            }
            


        }
    }, [dones]);


    const shareClick = () => {

        setObj({ click: !obj.click, flag: true, share: false });

        console.log(obj);
    }

    const fn = () => {
        setObj({ click: !obj.click, flag: true, share: false });
    }

    return (
        <div className="selection">
            
            {obj.flag ? <Share pro={{ fn, flag: true }} /> : <></>}
            {obj.click ? <Share pro={{ fn }} /> : <></>}

            <div className="content">
                <div className="sentakushis">
                    <Sentakushi type="harvest" done={dones.harvest} />
                    <Sentakushi type="interstellarTrip" done={dones.interstellar_trip} />
                    <Sentakushi type="antiEpidemic" done={dones.anti_epidemic} />
                    <Sentakushi type="techFuture" done={dones.tech_future} />
                </div>
                <p>当前总积分： {getScore(dones)}</p>
            </div>
            {obj.flag || obj.share ? <div className="share" onClick={shareClick} ref={shareRef}></div> : <></>}
        </div>
    );
};

export default Selection;
