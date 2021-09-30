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

    const [obj, setObj] = useState({ flag: false });

    useEffect(() => {
        getState().then((state) => setDones(state));
    }, []);

    // <<<<<<< HEAD
    useEffect(() => {
        console.log(dones);
        //    if(dones["harvest"]==true&&dones["interstellar_trip"]==true&&dones["anti_epidemic"]==true&&dones["tech_future"]==true){
        //        if(localStorage["flag"]){
        //         localStorage.setItem("flag","false")
        //        }
        //        else{
        //         localStorage.setItem("flag","true")
        //        }
        //    }

        if (
            dones["harvest"] == true &&
            dones["interstellar_trip"] == true &&
            dones["anti_epidemic"] == true &&
            dones["tech_future"] == true
        ) {
            setObj({ flag: true });
        }
    }, [dones]);

    // if(localStorage.flag==true){
    //        return (
    //         <div className="selection">
    //             <Share />
    //             <div className="content">
    //                 <div className="sentakushis">
    //                     <Sentakushi type="harvest" done={dones.harvest} />
    //                     <Sentakushi type="interstellarTrip" done={dones.interstellar_trip} />
    //                     <Sentakushi type="antiEpidemic" done={dones.anti_epidemic} />
    //                     <Sentakushi type="techFuture" done={dones.tech_future} />
    //                 </div>
    //                 <p>当前总积分： {getScore(dones)}</p>
    //             </div>
    //         </div>
    //     )
    // }else{

    // }

    // =======
    // >>>>>>> 34c2083bfb06a79879dc1bbbf839622dbfabffea
    return (
        <div className="selection">
            <Share pro={obj} />
            <div className="content">
                <div className="sentakushis">
                    <Sentakushi type="harvest" done={dones.harvest} />
                    <Sentakushi type="interstellarTrip" done={dones.interstellar_trip} />
                    <Sentakushi type="antiEpidemic" done={dones.anti_epidemic} />
                    <Sentakushi type="techFuture" done={dones.tech_future} />
                </div>
                <p>当前总积分： {getScore(dones)}</p>
            </div>
        </div>
    );
};

export default Selection;
