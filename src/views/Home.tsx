import { ReactElement, useState } from "react";
import { withRouter } from 'react-router-dom'
import '../../src/assets/styles/home.less'
import '../../src/assets/font/font.less'

import { API_URL } from "../config"

const Home = (props: any): ReactElement => {
    let [stuID, setStuID] = useState<any>(0);
    let stuIDNode: HTMLInputElement | null, coverNode: HTMLDivElement | null, loginPopNode: HTMLDivElement | null, rulePopNode: HTMLDivElement | null, stuIDShowNode: HTMLSpanElement | null, loginPopErrorNode: HTMLDivElement | null;

    const handleConfirmID = async () => {
        stuID = stuIDNode!.value;
        var regu = /^[1-9]\d*$/;
        var regu2 = /^[\da-zA-Z]{10}$/
        if (regu.test(stuID) && regu2.test(stuID)) {
            const response = await fetch(`${API_URL}/status?stu_number=${stuID}`)
            const data = await response.json()

            if (data.info === 'success') {
                stuIDShowNode!.innerHTML = stuID
                showHome()
            } else {
                loginPopErrorNode!.style.display = 'block'
                setTimeout(() => {
                    loginPopErrorNode!.style.display = 'none'
                }, 1000);
            }
        }
        else {
            loginPopErrorNode!.style.display = 'block'
            setTimeout(() => {
                loginPopErrorNode!.style.display = 'none'
            }, 1000);
            console.log('输入错误，请重新输入');
        }
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
                        <div className="loginPop-input-error" ref={currentNode => loginPopErrorNode = currentNode}>请输入正确的学号</div>
                    </div>
                    <div className="loginPopConfirm" onClick={handleConfirmID}></div>
                    <div className="loginPopNoID" onClick={handleNoID}></div>
                </div>
                <ul>
                    <li className="button1" onClick={jumpToChooseGames} ></li>
                    {/* <Route path="/selection" component={Harvest} ></Route> */}
                    <li className="button2" onClick={getRule}></li>
                    <li className="stuIDBox">
                        <span className="stuID" ref={currentNode => stuIDShowNode = currentNode}>
                            **********
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