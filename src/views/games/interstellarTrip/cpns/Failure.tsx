import styles from "../../../../assets/styles/interstellarTrip.module.less"
import failurePage from "../../../../assets/images/interstellarTrip/failure_page.png"
import changeButton from "../../../../assets/images/interstellarTrip/choose.png"
import againButton from "../../../../assets/images/interstellarTrip/again.png"

import { ReactElement } from "react";

export const Failure = (): ReactElement => {
    const reload = () => {
        console.log("!")
        window.location.reload()
    }
    return (
        <div className={styles.failure}>
            <img className={styles.failed_page} src={failurePage} />
            <img className={styles.failed_change} src={changeButton} />
            <img className={styles.failed_again} src={againButton} onTouchStart={reload} />
        </div>
    )
}

