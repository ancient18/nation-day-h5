import { ReactElement, useState } from "react";
import { withRouter } from 'react-router-dom'
import { Route } from "react-router-dom";
import '../../src/assets/styles/home.less'
import '../../src/assets/font/font.less'
import Harvest from "./games/Harvest"

const Home = (props: any): ReactElement => {
    let [stuID, setStuID] = useState<any>(0);
    let stuIDNode: HTMLInputElement | null, coverNode: HTMLDivElement | null, loginPopNode: HTMLDivElement | null, rulePopNode: HTMLDivElement | null;

    const handleConfirmID = () => {
        stuID = stuIDNode!.value;
        const reNumber = /^\d+$/;
        const reRealNumber1 = /^[1-9]\d*[.]\d+$/
        console.log('reNumber:', reNumber.test(stuID));
        console.log();

        // fetch(`https://be-dev.redrock.cqupt.edu.cn/national-day/status?stu_number=${stuID}`).then((res) => { 
        // })
    }

    const handleNoID = () => {
        showHome()
    }

    const showHome = () => {
        coverNode!.style!.display = 'none';
        loginPopNode!.style!.transform = 'translateY(100vh)'
    }

    const jumpToChooseGames = () => {
        props.history.push('/selection')
    }

    const getRule = () => {
        rulePopNode!.style!.transform = 'translateY(12.54vw)'
        coverNode!.style!.display = 'block';
    }
    const closeRulePop = () => {
        rulePopNode!.style!.transform = 'translateY(100vh)'
        coverNode!.style!.display = 'none';
    }
    return (
        <div>
            <div className="home">
                <div className="cover" ref={currentNode => coverNode = currentNode}></div>
                <div className="loginPop" ref={currentNode => loginPopNode = currentNode}>
                    <div className="loginPop-input-box" >
                        <input type="text" name="" id="" className="loginPop-input" ref={currentNode => stuIDNode = currentNode} />
                    </div>
                    <div className="loginPopConfirm" onClick={handleConfirmID}></div>
                    <div className="loginPopNoID" onClick={handleNoID}></div>
                </div>
                <ul>
                    <li className="button1" onClick={jumpToChooseGames} ></li>
                    {/* <Route path="/selection" component={Harvest} ></Route> */}
                    <li className="button2" onClick={getRule}></li>
                    <li className="stuIDBox">
                        <span className="stuID">
                            2020211524
                        </span>
                    </li>
                </ul>
                <div className="rulePop" ref={currentNode => rulePopNode = currentNode}>
                    <div className="rulePopClose" onClick={closeRulePop}></div>
                    <div className="rulePopOK" onClick={closeRulePop}></div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Home);