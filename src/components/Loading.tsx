import styles from "../assets/styles/loading.module.less"
import rolls from "../assets/images/loading/rolls.png"
// import bgc from "../assets/images/loading/bgc.png"
import flag from "../assets/images/loading/flag.png"
import loadingContent from "../assets/images/loading/loading_content.png"
import loadingFrame from "../assets/images/loading/loading_frame.png"

import { ReactElement, useRef, useEffect, useState } from 'react'


const Loading = (): ReactElement => {
    const rollsRef: React.RefObject<HTMLImageElement> = useRef<HTMLImageElement>(null)
    const contentRef: React.RefObject<HTMLImageElement> = useRef<HTMLImageElement>(null)
    const bgcRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
    const height = document.documentElement.clientHeight
    const width = document.documentElement.clientWidth;
    const [percentage, setPercentage] = useState<number>(0)
    useEffect(() => {
        const rolls = rollsRef.current
        const content = contentRef.current
        bgcRef.current!.style.backgroundPositionY = `-${width * 800 / 375 - height}px`
        let timer = setTimeout(() => {
            setPercentage(percentage => percentage + 1)
            content!.style.clipPath = `polygon(0 0,${percentage}% 0,${percentage}% 100%,0 100%)`
            // content?.setAttribute("clip-path", `polygon(0 0,${percentage}% 0,${percentage}% 100%,0 100%)`)
            // rolls!.style.transform = `translateX(${3 + 
            //     }vw)`
            if (percentage > 16 && percentage < 95)
                rolls!.style.transform = `translateX(${(40 + 310 * percentage / 100 - 90) / 3.75}vw)`

        }, 2500 / 100)
        if (percentage === 100) {
            clearInterval(timer)
        }
    })
    return (
        <div ref={bgcRef} className={styles.loading}>
            <div className={styles.progress_clouds}></div>
            <div className={styles.progress_rolls}>
                <img ref={rollsRef} src={rolls} />
            </div>
            <div className={styles.progress_flag}>
                <img src={flag} />
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