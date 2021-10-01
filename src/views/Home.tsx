import { ReactElement, useState } from "react";
import { withRouter } from 'react-router-dom'
import '../../src/assets/styles/home.less'
import '../../src/assets/styles/font.less'

import { Loading } from "../components"

import { API_URL } from "../config"

const Home = (props: any): ReactElement => {
    let [stuID, setStuID] = useState<any>(0);
    const [status, setStatus] = useState<"LOADING" | "BEGIN">("LOADING")
    let stuIDNode: HTMLTextAreaElement | null, coverNode: HTMLDivElement | null, loginPopNode: HTMLDivElement | null, rulePopNode: HTMLDivElement | null, stuIDShowNode: HTMLSpanElement | null, loginPopErrorNode: HTMLDivElement | null;
    setTimeout(() => {
        if (status === "LOADING") {
            setStatus("BEGIN")
        }
    }, 4000)
    const handleConfirmID = async () => {
        stuID = stuIDNode!.value;
        var regu = /^[1-9]\d*$/;
        var regu2 = /^[\da-zA-Z]{10}$/
        if (regu.test(stuID) && regu2.test(stuID)) {
            const response = await fetch(`${API_URL}/status?stu_number=${stuID}`)
            const data = await response.json()
            // console.log(data);
            if (data.info === 'success') {
                sessionStorage.setItem('stuID', stuID)
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
        rulePopNode!.style!.transform = 'translateY(-144.95vw)'
        coverNode!.style!.display = 'none';
    }

    return (
        <div>
            {(() => {
                if (status == "LOADING") {
                    return <Loading />
                } else if (status === "BEGIN") {
                    return (<div className="home">
                        <div className="cover" style={{ display: sessionStorage.getItem('stuID') ? 'none' : 'block' }} ref={currentNode => coverNode = currentNode}></div>
                        <div className="loginPop" style={{ display: sessionStorage.getItem('stuID') ? 'none' : 'block' }} ref={currentNode => loginPopNode = currentNode}>
                            <div className="loginPop-input-box" >
                                <textarea name="" id="" className="loginPop-input" ref={currentNode => stuIDNode = currentNode} />
                                <div className="loginPop-input-error" ref={currentNode => loginPopErrorNode = currentNode}>请输入正确的学号</div>
                            </div>
                            <div className="loginPopConfirm" onClick={handleConfirmID}></div>
                            <div className="loginPopNoID" onClick={handleNoID}></div>
                        </div>
                        <ul>
                            <li className="button1" onClick={jumpToChooseGames} ></li>
                            <li className="button2" onClick={getRule}></li>
                            <li className="stuIDBox">
                                <span className="stuID" ref={currentNode => stuIDShowNode = currentNode}>
                                    {sessionStorage.getItem('stuID') ? sessionStorage.getItem('stuID') : '**********'}
                                </span>
                            </li>
                        </ul>
                        <div className="rulePop" ref={currentNode => rulePopNode = currentNode}>
                            <div className="rulePopClose" onClick={closeRulePop}></div>
                            <div className="rulePopOK" onClick={closeRulePop}></div>
                        </div>
                    </div>)
                }
            })()
            }
        </div>
    )
}

export default withRouter(Home);