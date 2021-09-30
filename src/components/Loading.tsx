import styles from "../assets/styles/loading.module.less"
import rolls from "../assets/images/loading/rolls.png"
// import bgc from "../assets/images/loading/bgc.png"
import flag from "../assets/images/loading/flag.png"
import loadingContent from "../assets/images/loading/loading_content.png"
import loadingFrame from "../assets/images/loading/loading_frame.png"
import clouds from "../assets/images/loading/clouds.png"

import { ReactElement, useRef, useEffect, useState } from 'react'


const Loading = (): ReactElement => {
    const rollsRef: React.RefObject<HTMLImageElement> = useRef<HTMLImageElement>(null)
    const contentRef: React.RefObject<HTMLImageElement> = useRef<HTMLImageElement>(null)
    const cloudsRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
    const bgcRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
    const flagRef: React.RefObject<HTMLImageElement> = useRef<HTMLImageElement>(null)
    const height = document.documentElement.clientHeight
    const width = document.documentElement.clientWidth;
    const [percentage, setPercentage] = useState<number>(0)
    useEffect(() => {
        const rolls = rollsRef.current
        const content = contentRef.current
        const cloudsBox = cloudsRef.current
        const flag = flagRef.current
        bgcRef.current!.style.backgroundPositionY = `-${width * 800 / 375 - height}px`
        let timer = setTimeout(() => {
            setPercentage(percentage => percentage + 1)
            content!.style.clipPath = `polygon(0 0,${percentage}% 0,${percentage}% 100%,0 100%)`
            flag!.style.transform = `translate(80vw,${65 - 11 * percentage / 100}vw)`
            if (percentage == 35 || percentage == 55 || percentage == 75) {
                const cloudsImage = document.createElement('img');
                cloudsImage.setAttribute('src', clouds)
                cloudsImage.setAttribute('class', styles.clouds)
                cloudsImage.setAttribute('transform', `translateX${(10 + 310 * percentage / 100 - 80) / 3.75}vw`)
                cloudsBox!.appendChild(cloudsImage)
            }
            if (percentage > 18 && percentage < 95)
                rolls!.style.transform = `translateX(${(40 + 310 * percentage / 100 - 100) / 3.75}vw)`
        }, 2500 / 100)


        if (percentage === 100) {
            clearTimeout(timer)
        }
        return () => {
            clearTimeout(timer)
        }
    })
    return (
        <div ref={bgcRef} className={styles.loading}>
            <div className={styles.progress_clouds}></div>
            <div ref={cloudsRef} className={styles.progress_rolls}>
                <img ref={rollsRef} className={styles.rolls} src={rolls} />
            </div>
            <div className={styles.progress_flag}>
                <img ref={flagRef} src={flag} />
            </div>
            <div className={styles.progress_bar}>
                <img className={styles.frame} src={loadingFrame} />
                <img ref={contentRef} className={styles.content} src={loadingContent} />
            </div>
            <div className={styles.progress_percentage} >
                {`${percentage}% `}
            </div>
        </div>
    )
}

export default Loading;