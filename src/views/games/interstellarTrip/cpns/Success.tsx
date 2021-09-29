import styles from "../../../../assets/styles/interstellarTrip.module.less"

import successPage from "../../../../assets/images/interstellarTrip/success_page.png"
import successButton from "../../../../assets/images/interstellarTrip/success_button.png"

import { Link } from "react-router-dom";

import { ReactElement } from "react";

export const Success = (): ReactElement => {

    return (
        <div className={styles.success}>
            <img className={styles.success_page} src={successPage} />
            <Link to="selection">
                <img className={styles.success_button} src={successButton} />
            </Link>
        </div>
    )
}